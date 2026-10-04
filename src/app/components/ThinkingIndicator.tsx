import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThinkingIndicator() {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(1);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 6,
      padding: '6px 0',
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              color: 'var(--colorNeutralForeground2, #64748B)',
              lineHeight: 1.5
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#0284C7",
                display: "inline-block"
              }}
            />
            <span>Analizando tu consulta...</span>
          </motion.div>
        ) : (
          <motion.div
            key="checking"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              color: 'var(--colorNeutralForeground2, #64748B)',
              lineHeight: 1.5
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#0284C7",
                display: "inline-block"
              }}
            />
            <span>Revisando la información oficial...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
