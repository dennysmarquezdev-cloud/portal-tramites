import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BotRegular, DismissRegular, SendRegular, OpenRegular, MicRegular, MicOffRegular, CheckmarkRegular } from '@fluentui/react-icons';
import { Page, ChatMsg } from "../types";
import { matchAI } from "../App";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { playLotaSpeech, stopLotaSpeech } from "../utils/speech";

export function AIAssistant({ 
  open, 
  onToggle, 
  onNavigate,
  user,
  onOpenPaywall
}: { 
  open: boolean; 
  onToggle: () => void; 
  onNavigate: (p: Page) => void;
  user?: any;
  onOpenPaywall?: () => void;
}) {
  const emailLower = (user?.email || "").toLowerCase();
  const isPlus = user?.isPremium === true || emailLower === "plaeis260@gmail.com";

  const [messages, setMessages] = useState<ChatMsg[]>([
    { role:"bot", text:"¡Hola! ¿En qué trámite te ayudo hoy? Puedo guiarte paso a paso con los requisitos oficiales.", chips:["Renovar DNI","Consultar RUC","Pasaporte","Clave SOL"], time:"ahora" }
  ]);
  const [input, setInput] = useState("");
  const msgsRef = useRef<HTMLDivElement>(null);
  const isVoiceTriggeredRef = useRef<boolean>(false);
  const lastSpokenIndexRef = useRef<number>(-1);

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
        send(finalCleanedText);
      }
    }
  });

  useEffect(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight; }, [messages]);

  // Auto-reproducir respuesta por voz cuando provenga de dictado
  useEffect(() => {
    if (isVoiceTriggeredRef.current && messages.length > 0) {
      const lastIdx = messages.length - 1;
      const lastMsg = messages[lastIdx];
      if (lastMsg && lastMsg.role === 'bot' && lastSpokenIndexRef.current !== lastIdx) {
        lastSpokenIndexRef.current = lastIdx;
        isVoiceTriggeredRef.current = false;
        playLotaSpeech(lastMsg.text);
      }
    }
  }, [messages]);

  const send = useCallback((text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role:"user", text, time:"ahora" }]);
    setInput("");
    setTimeout(() => {
      const flow = matchAI(text);
      if (flow) {
        setMessages(prev => [...prev, { role:"bot", text:`Aquí está la guía paso a paso (${flow.time}):`, steps:flow.steps, chips:flow.chips, time:"ahora" }]);
      } else {
        setMessages(prev => [...prev, { role:"bot", text:"No encontré una guía exacta para eso, pero puedo ayudarte con:", chips:["Renovar DNI","Consultar RUC","Pasaporte","ESSALUD","AFP","SUNARP","Declarar impuestos"], time:"ahora" }]);
      }
    }, 500);
  }, [onNavigate]);

  return (
    <>
      {/* Floating button with Emil Kowalski Spring Physics */}
      <motion.button 
        onClick={onToggle}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        style={{ 
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
          border: "1.5px solid rgba(255, 255, 255, 0.4)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 150,
          boxShadow: "0 8px 24px rgba(2, 132, 199, 0.45), 0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <BotRegular fontSize={24} color="#FFFFFF" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: 16, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 16, scale: 0.95 }} 
            transition={{ type: "spring", duration: 0.4, bounce: 0.12 }}
            style={{ 
              position: "fixed",
              bottom: 86,
              right: 24,
              width: "min(350px, calc(100vw - 32px))",
              height: 490,
              zIndex: 149,
              display: "flex",
              flexDirection: "column",
              fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              borderRadius: 20,
              overflow: "hidden",
              background: "var(--colorNeutralBackground1)",
              border: "1px solid var(--colorNeutralStroke1)",
              boxShadow: "0 24px 64px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            {/* Header */}
            <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--colorNeutralStroke1)", display: "flex", alignItems: "center", gap: 10, background: "var(--colorNeutralBackground2)" }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <BotRegular fontSize={18} color="#FFFFFF" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "var(--colorNeutralForeground1)", fontSize: 13.5, fontWeight: 700 }}>LOTA AI</div>
                <div style={{ color: "#0284C7", fontSize: 11, fontWeight: 600 }}>Asistente Oficial ahorratiempo</div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => { 
                  onToggle(); 
                  if (!isPlus) {
                    onOpenPaywall?.();
                  } else {
                    onNavigate("frutilota");
                  }
                }} 
                title="Abrir a pantalla completa"
                style={{ background: "transparent", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--colorNeutralForeground2)", display: "flex" }}
              >
                <OpenRegular fontSize={15} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={onToggle} 
                title="Cerrar"
                style={{ background: "transparent", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--colorNeutralForeground2)", display: "flex" }}
              >
                <DismissRegular fontSize={16} />
              </motion.button>
            </div>

            {/* Messages */}
            <div ref={msgsRef} style={{ flex: 1, overflowY: "auto", padding: "14px 14px", display: "flex", flexDirection: "column", gap: 12 }}>
              {messages.map((m, idx) => (
                <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start", gap: 4 }}>
                  <div 
                    style={{ 
                      maxWidth: "86%",
                      padding: "10px 14px",
                      borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: m.role === "user" ? "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)" : "var(--colorNeutralBackground2)",
                      color: m.role === "user" ? "#FFFFFF" : "var(--colorNeutralForeground1)",
                      fontSize: 13,
                      lineHeight: 1.45,
                      border: m.role === "bot" ? "1px solid var(--colorNeutralStroke2)" : "none",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    }}
                  >
                    {m.text}
                    {m.steps && (
                      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                        {m.steps.map((s, i) => (
                          <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                            <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(2, 132, 199, 0.15)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#0284C7", fontSize: 10, fontWeight: 700 }}>{i + 1}</span>
                            <span style={{ fontSize: 12, lineHeight: 1.4, color: "var(--colorNeutralForeground2)" }}>{s}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {m.chips && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, maxWidth: "100%", marginTop: 2 }}>
                      {m.chips.map((chip, i) => (
                        <motion.button 
                          key={i} 
                          onClick={() => send(chip)} 
                          whileHover={{ y: -1, scale: 1.02 }}
                          whileTap={{ scale: 0.96 }}
                          style={{ 
                            padding: "5px 11px",
                            borderRadius: 12,
                            background: "var(--colorNeutralBackground2)",
                            border: "1px solid var(--colorNeutralStroke2)",
                            color: "#0284C7",
                            fontSize: 11.5,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "'Plus Jakarta Sans', sans-serif"
                          }}
                        >
                          {chip}
                        </motion.button>
                      ))}
                    </div>
                  )}
                  {m.time && <span style={{ color: "var(--colorNeutralForeground3)", fontSize: 10, marginTop: 1 }}>{m.time}</span>}
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: "10px 12px", borderTop: "1px solid var(--colorNeutralStroke1)", background: "var(--colorNeutralBackground2)" }}>
              <AnimatePresence mode="wait">
                {isListening ? (
                  /* ── Modo Voz ChatGPT en AIAssistant ── */
                  <motion.div
                    key="voice-capsule-assistant"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 14,
                      background: "var(--colorNeutralBackground1)",
                      border: "1.5px solid #0284C7",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      boxShadow: "0 4px 16px rgba(2, 132, 199, 0.15)"
                    }}
                  >
                    {/* Live Transcript */}
                    <div style={{ minHeight: 32, display: "flex", alignItems: "center" }}>
                      {input.trim() ? (
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 550, color: "var(--colorNeutralForeground1)", lineHeight: 1.4, wordBreak: "break-word" }}>
                          {input}
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            style={{ display: "inline-block", width: 2, height: 13, marginLeft: 3, background: "#0284C7", verticalAlign: "middle" }}
                          />
                        </p>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--colorNeutralForeground1)" }}>Escuchando consulta...</span>
                          <span style={{ fontSize: 10.5, color: "var(--colorNeutralForeground3)" }}>Habla sobre cualquier trámite del Perú</span>
                        </div>
                      )}
                    </div>

                    {/* Symmetrical Waveform */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, height: 20 }}>
                      {[0.25, 0.45, 0.7, 0.9, 1.0, 1.0, 0.9, 0.7, 0.45, 0.25].map((weight, idx) => {
                        const h = Math.max(4, Math.min(18, (audioLevel * 18 * weight) + (Math.sin(idx * 0.7 + Date.now() / 150) * 3 + 3)));
                        return (
                          <motion.div
                            key={idx}
                            animate={{ height: h }}
                            transition={{ duration: 0.08 }}
                            style={{
                              width: 3,
                              borderRadius: 3,
                              background: "linear-gradient(180deg, #0284C7 0%, #38BDF8 100%)"
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* Actions: Cancel / Status / Send */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 6, borderTop: "1px solid var(--colorNeutralStroke2)" }}>
                      <button
                        type="button"
                        onClick={() => {
                          cancelVoiceInput();
                          setInput("");
                        }}
                        title="Cancelar"
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          border: "1px solid var(--colorNeutralStroke1)",
                          background: "transparent",
                          color: "var(--colorNeutralForeground3)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <DismissRegular fontSize={14} />
                      </button>

                      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 12, background: "rgba(2, 132, 199, 0.1)", border: "1px solid rgba(2, 132, 199, 0.2)", color: "#0284C7", fontSize: 9.5, fontWeight: 750, textTransform: "uppercase" }}>
                        LOTA Voice
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          toggleVoiceInput();
                        }}
                        title="Confirmar"
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          border: "none",
                          background: "#0284C7",
                          color: "#FFF",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <CheckmarkRegular fontSize={14} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ── Modo Texto Regular ── */
                  <motion.div
                    key="regular-assistant-input"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: "flex", gap: 8, alignItems: "center" }}
                  >
                    <motion.button 
                      type="button"
                      onClick={toggleVoiceInput}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.92 }}
                      title="Dictar consulta por voz (Modo ChatGPT)"
                      style={{ 
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: "var(--colorNeutralBackground1)",
                        border: "1px solid var(--colorNeutralStroke1)",
                        color: "var(--colorNeutralForeground2)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      <MicRegular fontSize={16} />
                    </motion.button>
                    <input 
                      value={input} 
                      onChange={e => setInput(e.target.value)} 
                      onKeyDown={e => { if(e.key === "Enter") send(input); }} 
                      placeholder="Escribe tu consulta sobre trámites..." 
                      style={{ 
                        flex: 1,
                        padding: "9px 12px",
                        borderRadius: 10,
                        background: "var(--colorNeutralBackground1)",
                        border: "1px solid var(--colorNeutralStroke1)",
                        color: "var(--colorNeutralForeground1)",
                        fontSize: 13,
                        outline: "none",
                        fontFamily: "'Plus Jakarta Sans', sans-serif"
                      }} 
                    />
                    <motion.button 
                      onClick={() => send(input)} 
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.92 }}
                      style={{ 
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      <SendRegular fontSize={15} color="#FFFFFF" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
