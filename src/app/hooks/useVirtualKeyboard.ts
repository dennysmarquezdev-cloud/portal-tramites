import { useState, useEffect } from 'react';

/**
 * Virtual Keyboard Awareness Hook (Apple iOS / Android Mobile)
 * Tracks visual viewport resizing and calculates exact on-screen keyboard height in real time.
 */
export function useVirtualKeyboard() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) {
      return;
    }

    const viewport = window.visualViewport;

    const handleResize = () => {
      // If the visual viewport height is significantly less than window.innerHeight, keyboard is active
      const diff = window.innerHeight - viewport.height;
      if (diff > 80) {
        setKeyboardHeight(diff);
        setIsKeyboardOpen(true);
      } else {
        setKeyboardHeight(0);
        setIsKeyboardOpen(false);
      }
    };

    viewport.addEventListener('resize', handleResize);
    viewport.addEventListener('scroll', handleResize);

    return () => {
      viewport.removeEventListener('resize', handleResize);
      viewport.removeEventListener('scroll', handleResize);
    };
  }, []);

  return { keyboardHeight, isKeyboardOpen };
}
