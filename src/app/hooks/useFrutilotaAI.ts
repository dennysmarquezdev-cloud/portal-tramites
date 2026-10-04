import { useState, useCallback, useEffect, useRef } from 'react';
import { T } from '../App';

export type Message = { 
  id: string; 
  role: 'user' | 'assistant' | 'system'; 
  content: string; 
  isTyping?: boolean; 
  isError?: boolean;
  rawPrompt?: string;
  officialLinks?: any[]; 
};

// LRU Cache implementation that caches response + officialLinks
interface CacheEntry {
  content: string;
  officialLinks: any[];
}

class LRUCache {
  private cache: Map<string, CacheEntry>;
  private max: number;
  constructor(max = 20) {
    this.cache = new Map();
    this.max = max;
  }
  get(key: string): CacheEntry | null {
    if (!this.cache.has(key)) return null;
    const val = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, val); // move to top
    return val;
  }
  set(key: string, val: CacheEntry) {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.max) this.cache.delete(this.cache.keys().next().value!);
    this.cache.set(key, val);
  }
  clear() {
    this.cache.clear();
  }
}

const memoryCache = new LRUCache(30);

export function useFrutilotaAI(systemContext: string = "", selectedEntity: string = "") {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      localStorage.removeItem('frutilota_chat_history');
      const saved = JSON.parse(localStorage.getItem('lota_chat_history') || '[]');
      return saved;
    } catch { return []; }
  });
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastEntityRef = useRef(selectedEntity);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('lota_chat_history', JSON.stringify(messages.filter(m => !m.isTyping && m.role !== 'system')));
    } else {
      localStorage.removeItem('lota_chat_history');
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    memoryCache.clear();
    try {
      localStorage.removeItem('lota_chat_history');
      localStorage.removeItem('frutilota_chat_history');
    } catch {}
    setIsThinking(false);
    setMessages([]);
    setInput("");
  }, []);

  // Reiniciar contexto y memoria caché al cambiar de entidad
  useEffect(() => {
    if (lastEntityRef.current && lastEntityRef.current.toUpperCase() !== selectedEntity.toUpperCase()) {
      lastEntityRef.current = selectedEntity;
      clearChat();
    } else {
      lastEntityRef.current = selectedEntity;
    }
  }, [selectedEntity, clearChat]);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    setIsThinking(false);
    setMessages(prev => prev.map(m => m.isTyping ? { ...m, isTyping: false } : m));
  }, []);

  const handleSend = useCallback(async (queryOverride?: string) => {
    const q = (queryOverride !== undefined ? queryOverride : input).trim();
    if (!q || isThinking) return;
    
    // Limpiar siempre el input inmediatamente para que no se quede pegado
    setInput("");

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
    const currentAbortSignal = abortControllerRef.current.signal;

    debounceRef.current = setTimeout(async () => {
      const newMsgId = Date.now().toString();
      const userMsg: Message = { id: `u-${newMsgId}`, role: 'user', content: q, rawPrompt: q };
      
      setMessages(prev => [...prev.filter(m => !m.isError), userMsg]);
      setIsThinking(true);
      
      const thinkingId = `t-${newMsgId}`;
      setMessages(prev => [...prev, { id: thinkingId, role: 'assistant', content: '', isTyping: true, rawPrompt: q, officialLinks: [] }]);

      const cacheKey = q.toLowerCase();
      const cached = memoryCache.get(cacheKey);
      
      if (cached) {
        setMessages(prev => prev.map(m => m.id === thinkingId ? { 
          id: `a-${newMsgId}`, 
          role: 'assistant', 
          content: cached.content, 
          isTyping: false,
          rawPrompt: q,
          officialLinks: cached.officialLinks || []
        } : m));
        setIsThinking(false);
        return;
      }

      const executeFetchWithRetry = async (retriesLeft = 1): Promise<Response> => {
        try {
          const apiUrl = import.meta.env.VITE_CF_WORKER_URL || "https://ahorratiempo-scraper.ahorratiempo.workers.dev";
          
          // Historial limpio para Cloudflare Worker (ANI - Limited Memory)
          const contextHistory = messages
            .filter(m => !m.isTyping && !m.isError && m.role !== 'system')
            .slice(-6)
            .map(m => ({ role: m.role, content: m.content }));
          
          const payloadMessages = [...contextHistory, { role: "user", content: q }];
          
          const response = await fetch(`${apiUrl}/api/ai/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: payloadMessages, selectedEntity }),
            signal: currentAbortSignal
          });

          if (!response.ok) {
             const errText = await response.text();
             if (retriesLeft > 0 && (response.status >= 500 || response.status === 429)) {
               console.warn(`[Frutilota] Reintentando consulta en 1.5s debido a status ${response.status}...`);
               await new Promise(res => setTimeout(res, 1500));
               return executeFetchWithRetry(retriesLeft - 1);
             }
             throw new Error(errText);
          }

          return response;
        } catch (err: any) {
          if (currentAbortSignal.aborted) throw err;
          if (retriesLeft > 0) {
            console.warn("[Frutilota] Reintentando tras micro-falla de red...", err);
            await new Promise(res => setTimeout(res, 1500));
            return executeFetchWithRetry(retriesLeft - 1);
          }
          throw err;
        }
      };

      try {
        const response = await executeFetchWithRetry(1);

        // Leer información de debug enviada por el Worker (si existe)
        const debugHeader = response.headers.get("X-Frutilota-Debug");
        if (debugHeader) {
           try {
             const debugInfo = JSON.parse(atob(debugHeader));
             console.groupCollapsed("%c🧠 Pensamiento LOTA AI", "color: #0284C7; font-weight: bold; background: #e0f2fe; padding: 2px 4px; border-radius: 4px;");
             console.log("🔍 Query Optimizado:", debugInfo.optimizedQuery);
             console.log("📊 Resultados D1 Encontrados:", debugInfo.d1ResultsCount);
             console.groupEnd();
           } catch(e) {}
        }

        // Modo SSE Streaming
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("text/event-stream")) {
           const reader = response.body?.getReader();
           const decoder = new TextDecoder("utf-8");
           if (!reader) throw new Error("No stream reader available");

           let buffer = "";
           let accumulatedResponse = "";
           let receivedLinks: any[] = [];

           while (true) {
             if (currentAbortSignal.aborted) {
               reader.cancel();
               break;
             }
             const { done, value } = await reader.read();
             if (done) break;
             
             buffer += decoder.decode(value, { stream: true });
             const lines = buffer.split("\n");
             buffer = lines.pop() || ""; 
             
             for (const line of lines) {
               if (line.startsWith("data: ") && line !== "data: [DONE]") {
                 try {
                   const data = JSON.parse(line.substring(6));
                    const chunkText = data.response ?? data.choices?.[0]?.delta?.content ?? "";
                    if (chunkText) {
                      accumulatedResponse += chunkText;
                    }
                    if (data.officialLinks && Array.isArray(data.officialLinks)) {
                      receivedLinks = data.officialLinks;
                    }
                    setMessages(prev => prev.map(m => m.id === thinkingId ? { 
                      id: thinkingId, 
                      role: 'assistant', 
                      content: accumulatedResponse, 
                      isTyping: true, 
                      rawPrompt: q,
                      officialLinks: receivedLinks 
                    } : m));
                 } catch (e) {
                   console.warn("Error parsing SSE JSON:", line, e);
                 }
               }
             }
           }
           
           if (!currentAbortSignal.aborted) {
             memoryCache.set(cacheKey, { content: accumulatedResponse, officialLinks: receivedLinks });
           }
           setMessages(prev => prev.map(m => m.id === thinkingId ? { 
             id: `a-${newMsgId}`, 
             role: 'assistant', 
             content: accumulatedResponse, 
             isTyping: false, 
             rawPrompt: q,
             officialLinks: receivedLinks 
           } : m));
           
        } else {
           // Fallback a JSON normal si el worker no hizo stream
           const data = await response.json();
           const finalResponse = data.response ?? data.choices?.[0]?.message?.content ?? "No pude obtener una respuesta de mis servidores.";
           const links = data.officialLinks || [];
           if (!currentAbortSignal.aborted) {
             memoryCache.set(cacheKey, { content: finalResponse, officialLinks: links });
           }
           setMessages(prev => prev.map(m => m.id === thinkingId ? { 
             id: `a-${newMsgId}`, 
             role: 'assistant', 
             content: finalResponse, 
             isTyping: false, 
             rawPrompt: q,
             officialLinks: links 
           } : m));
        }

      } catch (e: any) {
        if (e.name === "AbortError" || currentAbortSignal.aborted) {
          console.log("[Frutilota] Generación detenida por el usuario.");
          return;
        }
        console.error("AI Error:", e);
        setMessages(prev => prev.map(m => m.id === thinkingId ? { 
          id: `a-${newMsgId}`, 
          role: 'assistant', 
          content: "Hubo un problema al procesar tu consulta con los servidores del Estado peruano.", 
          isTyping: false,
          isError: true,
          rawPrompt: q
        } : m));
      } finally {
        setIsThinking(false);
      }
    }, 0);
  }, [input, isThinking, messages, selectedEntity]);

  return {
    messages,
    input,
    setInput,
    isThinking,
    handleSend,
    stopGeneration,
    clearChat
  };
}
