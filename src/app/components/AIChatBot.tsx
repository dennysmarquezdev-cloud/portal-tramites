import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BotRegular, DismissRegular, SendRegular, SparkleRegular, CopyRegular, CheckmarkRegular, ClipboardPasteRegular, DocumentCopyRegular, MicRegular, MicOffRegular } from '@fluentui/react-icons';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { playLotaSpeech, stopLotaSpeech } from '../utils/speech';

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
  isTyping?: boolean;
}

interface AIChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_CHIPS = ['Renovar DNI', 'Consultar RUC', 'pasaporte', 'Consulta Placa'];

export function AIChatBot({ isOpen, onClose }: AIChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: '¡Hola! Soy LOTA AI 🤖, tu asistente experta en trámites del Estado Peruano. ¿Qué gestión deseas realizar hoy? ¡Escríbeme tu duda y te guiaré al instante!',
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isVoiceTriggeredRef = useRef<boolean>(false);
  const lastSpokenMsgIdRef = useRef<string | null>(null);

  const {
    isListening,
    interimTranscript,
    audioLevel,
    cancelListening: cancelVoiceInput,
    toggleListening: toggleVoiceInput
  } = useSpeechRecognition({
    lang: "es-PE",
    silenceTimeoutMs: 1800,
    onInterim: (liveText) => {
      setInput(liveText);
    },
    onResult: (finalCleanedText) => {
      if (finalCleanedText && finalCleanedText.trim()) {
        setInput(finalCleanedText);
        isVoiceTriggeredRef.current = true;
        handleSend(finalCleanedText);
      }
    }
  });

  // Auto-reproducir respuesta por voz cuando provenga de dictado
  useEffect(() => {
    if (isVoiceTriggeredRef.current && !isLoading && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg && lastMsg.role === 'bot' && lastSpokenMsgIdRef.current !== lastMsg.id) {
        lastSpokenMsgIdRef.current = lastMsg.id;
        isVoiceTriggeredRef.current = false;
        playLotaSpeech(lastMsg.text);
      }
    }
  }, [messages, isLoading]);

  const handleCopyFullChat = () => {
    if (messages.length === 0) {
      toast.info("No hay mensajes en la conversación.");
      return;
    }

    const dateStr = new Date().toLocaleString("es-PE", { 
      day: "2-digit", 
      month: "2-digit", 
      year: "numeric", 
      hour: "2-digit", 
      minute: "2-digit", 
      hour12: true 
    });

    let formattedChat = `==================================================\n`;
    formattedChat += `CONVERSACIÓN CON LOTA AI (ahorratiempo.pe)\n`;
    formattedChat += `Fecha: ${dateStr}\n`;
    formattedChat += `==================================================\n\n`;

    messages.forEach((msg, idx) => {
      const sender = msg.role === 'user' ? '👤 TÚ' : '🤖 LOTA AI';
      formattedChat += `[${idx + 1}] ${sender}:\n${msg.text}\n\n`;
    });

    formattedChat += `==================================================\n`;
    formattedChat += `Fin de la conversación\n`;

    navigator.clipboard.writeText(formattedChat)
      .then(() => {
        setCopiedAll(true);
        toast.success("¡Chat completo copiado al portapapeles con éxito!");
        setTimeout(() => setCopiedAll(false), 2500);
      })
      .catch(() => {
        toast.error("No se pudo copiar el chat al portapapeles.");
      });
  };

  const handlePasteToInput = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText && clipboardText.trim().length > 0) {
        setInput(prev => prev ? `${prev} ${clipboardText.trim()}` : clipboardText.trim());
        toast.success("Texto pegado en la consulta");
      } else {
        toast.info("El portapapeles está vacío.");
      }
    } catch (e) {
      toast.info("Presiona Ctrl + V para pegar el texto.");
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    const usermsg: Message = { id: Date.now().toString(), role: 'user', text: text.trim() };
    setMessages(prev => [...prev, usermsg]);
    setInput('');
    setIsLoading(true);

    try {
      const apiUrl = (import.meta.env.VITE_API_URL as string) || 'https://ahorratiempo-scraPerúahorratiempo.workers.dev/api';
      
      const res = await fetch(`${apiUrl}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: messages.concat(usermsg).map(m => ({ role: m.role, content: m.text }))
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: data.response
        }]);
      } else {
        throw new Error('Error de API');
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: 'Lo siento, tuve un pequeño problema conectándome a mi base de datos. ¿Podrías intentar de nuevo? ��'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 "
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md h-[600px] max-h-[85vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden"
            style={{ background: "var(--colorNeutralBackground1)", border: '1px solid rgba(0,180,216,0.2)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0"
              style={{ background: 'linear-gradient(135deg, rgba(0,119,182,0.4) 0%, rgba(0,180,216,0.15) 100%)' }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#00b4d8] shadow-[0_0_15px_rgba(0,180,216,0.5)]">
                    <BotRegular fontSize={24} className="text-[var(--colorNeutralForeground1)]" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0b101e]" />
                </div>
                <div>
                  <h3 className="text-[var(--colorNeutralForeground1)] font-bold text-[15px] leading-tight">LOTA AI</h3>
                  <p className="text-[#00b4d8] text-[11px] font-medium flex items-center gap-1">
                    <SparkleRegular fontSize={10} /> IA - Responde en segundos
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button 
                    onClick={handleCopyFullChat}
                    title="Copiar chat completo"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    {copiedAll ? <CheckmarkRegular fontSize={14} className="text-emerald-400" /> : <DocumentCopyRegular fontSize={14} />}
                    <span>{copiedAll ? "Copiado" : "Copiar"}</span>
                  </button>
                )}
                <button 
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-[var(--colorNeutralForeground1)]/60 hover:text-[var(--colorNeutralForeground1)] transition-colors"
                >
                  <DismissRegular fontSize={18} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth relative">
              {/* Background Mascot */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: messages.length <= 2 ? 0.05 : 0 }} 
                className="fixed inset-0 pointer-events-none flex items-center justify-center -z-10"
              >
                <BotRegular fontSize={220} className="text-[#00b4d8]" />
              </motion.div>

              {messages.map((msg, index) => (
                <div key={msg.id} className="flex flex-col">
                  {msg.role === 'bot' ? (
                    <div className="flex flex-col w-full">
                      <div 
                        className="py-1 text-[14px] text-[#e2e8f0] prose prose-invert prose-p:leading-relaxed prose-ul:my-1 prose-li:my-0 max-w-none"
                      >
                        <ReactMarkdown 
                          components={{
                            p: ({node, ...props}) => <p className="mb-3 last:mb-0 leading-relaxed text-[var(--colorNeutralForeground1)]" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1 text-[#00C2FF]" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1 text-[#00C2FF]" {...props} />,
                            li: ({node, ...props}) => <li className="text-[#e2e8f0]" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-semibold text-[var(--colorNeutralForeground1)]" {...props} />,
                            a: ({node, ...props}) => <a className="text-[#0D6EFD] underline underline-offset-2 hover:text-[#00C2FF] transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end w-full mt-2 mb-2">
                      <div 
                        className="px-4 py-2.5 rounded-[20px] text-[14px] text-[var(--colorNeutralForeground1)] shadow-sm max-w-[85%] sm:max-w-[75%]"
                        style={{ background: '#2D5BFF' }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  )}

                  {/* Quick Chips for the first welcome message */}
                  {index === 0 && (
                    <div className="flex flex-wrap gap-2 mt-1 mb-4">
                      {QUICK_CHIPS.map(chip => (
                        <button
                          key={chip}
                          onClick={() => handleSend(chip)}
                          className="px-3 py-1.5 rounded-full text-[12px] font-medium border border-[#00b4d8]/40 text-[#00b4d8] hover:bg-[#00b4d8]/10 transition-colors"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex flex-col w-full mt-2">
                  <div className="py-2 text-[14px] text-[#e2e8f0] flex items-center gap-1.5">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-[#00b4d8]" animate={{ y: [0,-4,0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-[#00b4d8]" animate={{ y: [0,-4,0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-[#00b4d8]" animate={{ y: [0,-4,0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#0b101e] border-t border-white/10 shrink-0">
              <AnimatePresence mode="wait">
                {isListening ? (
                  /* ── Modo Voz ChatGPT en Modal ── */
                  <motion.div
                    key="voice-capsule-modal"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="p-3.5 rounded-2xl bg-[#142335] border border-[#00b4d8]/40 shadow-[0_4px_24px_rgba(0,180,216,0.15)] flex flex-col gap-3"
                  >
                    {/* Live Transcript / Escuchando */}
                    <div className="min-h-[38px] flex items-center">
                      {input.trim() ? (
                        <p className="text-sm font-medium text-white leading-relaxed line-clamp-2">
                          {input}
                          <span className="inline-block w-1.5 h-3.5 ml-1 bg-[#00b4d8] animate-pulse align-middle" />
                        </p>
                      ) : (
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white">Escuchando consulta...</span>
                          <span className="text-[11px] text-[#00b4d8]/80">Habla con naturalidad sobre cualquier trámite del Perú.</span>
                        </div>
                      )}
                    </div>

                    {/* Symmetrical Waveform */}
                    <div className="flex items-center justify-center gap-1 h-6">
                      {[0.25, 0.45, 0.7, 0.9, 1.0, 1.0, 0.9, 0.7, 0.45, 0.25].map((weight, idx) => {
                        const h = Math.max(4, Math.min(22, (audioLevel * 22 * weight) + (Math.sin(idx * 0.7 + Date.now() / 150) * 3 + 3)));
                        return (
                          <div
                            key={idx}
                            style={{ height: `${h}px` }}
                            className="w-1 rounded-full bg-gradient-to-t from-[#0077b6] to-[#00b4d8] transition-all duration-75"
                          />
                        );
                      })}
                    </div>

                    {/* Actions: Cancel / Status / Send */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          cancelVoiceInput();
                          setInput('');
                        }}
                        title="Cancelar"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
                      >
                        <DismissRegular fontSize={15} />
                      </button>

                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00b4d8]/10 border border-[#00b4d8]/20 text-[#00b4d8] text-[10px] font-bold tracking-wide uppercase">
                        <SparkleRegular fontSize={12} className="text-[#00b4d8]" />
                        LOTA Voice AI
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          toggleVoiceInput();
                        }}
                        title="Confirmar"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-[#00b4d8] hover:bg-[#0096c7] text-white shadow-md transition-colors"
                      >
                        <CheckmarkRegular fontSize={16} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ── Modo Texto Regular ── */
                  <motion.div
                    key="regular-text-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {input.length > 0 && (
                      <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
                        {['Comprar auto usado', 'Renovar DNI', 'Sacar pasaporte', 'Consultar multas'].map((chip) => (
                          <button
                            key={chip}
                            onClick={() => setInput(chip)}
                            className="px-3 py-1.5 text-xs font-medium bg-[#142335] text-[#00b4d8] border border-[#00b4d8]/30 rounded-full whitespace-nowrap hover:bg-[#00b4d8] hover:text-[var(--colorNeutralForeground1)] transition-colors"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="relative flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePasteToInput}
                        title="Pegar texto del portapapeles"
                        className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-[#142335] text-[#00b4d8] hover:bg-[#1a2e46] border border-white/5 transition-colors"
                      >
                        <ClipboardPasteRegular fontSize={18} />
                      </button>

                      {/* Botón de Micrófono (Modo ChatGPT) */}
                      <button
                        type="button"
                        onClick={toggleVoiceInput}
                        title="Dictar consulta por voz (Modo ChatGPT)"
                        className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-[#142335] text-[#00b4d8] hover:bg-[#1a2e46] border border-white/5 transition-colors"
                      >
                        <MicRegular fontSize={18} />
                      </button>

                      <div className="relative flex-1 flex items-center">
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Escribe tu consulta sobre trámites..."
                          className="w-full bg-[#142335] text-[var(--colorNeutralForeground1)] text-sm placeholder-white/40 rounded-xl pl-4 pr-12 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#00b4d8] border border-white/5"
                        />
                        <button
                          onClick={() => handleSend(input)}
                          disabled={!input.trim() || isLoading}
                          className="absolute right-2 w-9 h-9 flex items-center justify-center rounded-lg bg-[#00b4d8] text-[var(--colorNeutralForeground1)] hover:bg-[#0096c7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <SendRegular fontSize={16} className="ml-0.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
