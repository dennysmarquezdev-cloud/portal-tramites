/**
 * Haptic Feedback Engine for Mobile Touch Devices (Apple / Android Web Haptics)
 * Provides tactile sensory response with zero latency.
 */
export const haptic = {
  selection: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(3); // Ultra-light 3ms tick for tabs & list scrub
      } catch (_) {}
    }
  },
  light: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(6); // Micro 6ms tap
      } catch (_) {}
    }
  },
  medium: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(12); // Medium 12ms tap
      } catch (_) {}
    }
  },
  dragSnap: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([4, 20, 8]); // Tactile snap when bottom sheet anchors
      } catch (_) {}
    }
  },
  sheetDismiss: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15); // Solid dismiss release
      } catch (_) {}
    }
  },
  success: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([8, 40, 14]); // Double rhythmic confirmation
      } catch (_) {}
    }
  },
  error: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([15, 60, 20]); // Warning vibration
      } catch (_) {}
    }
  }
};
