/**
 * UI Sound Engine (Web Audio API + HTML5 Audio)
 * Proporciona retroalimentación acústica elegante, sutil e instantánea (0ms latencia)
 * inspirada en interfaces premium (estilo Apple / iOS):
 * - Sonido de campana mecánica suave al pasar el cursor (hover)
 * - Sonido sutil de confirmación al hacer clic
 * - Shimmer etéreo de campanas de cristal puras para la pantalla de carga (3.4s)
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private lastPlayTime = 0;
  private minIntervalMs = 45; // Evita saturación acústica al mover el cursor rápidamente
  private soundEnabled = true;
  private activeLoadingNodes: { stop: () => void }[] = [];
  private loadingAudioEl: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ahorra_sound_enabled');
        if (saved !== null) {
          this.soundEnabled = saved === 'true';
        }
      } catch (_) {}

      // AudioContext se inicializa de forma pasiva ante cualquier interacción
      const unlockAudio = () => {
        this.getAudioContext();
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('pointermove', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
      };
      window.addEventListener('pointerdown', unlockAudio, { once: true, passive: true });
      window.addEventListener('pointermove', unlockAudio, { once: true, passive: true });
      window.addEventListener('keydown', unlockAudio, { once: true, passive: true });
      window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Sonido elegante de "teclita" / mechanical keycap al posar el cursor
   * Tono cálido, ataque acústico suave y decaimiento rápido aterciopelado (~50ms)
   */
  public playHoverKey(gainMultiplier = 1.0) {
    if (!this.soundEnabled) return;

    const now = performance.now();
    if (now - this.lastPlayTime < this.minIntervalMs) {
      return;
    }
    this.lastPlayTime = now;

    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const masterGain = ctx.createGain();
      const baseGain = 0.09 * gainMultiplier;
      masterGain.gain.setValueAtTime(baseGain, t);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.055);
      masterGain.connect(ctx.destination);

      // 1. Transitorio de ataque (textura mecánica de tecla suave)
      const bufferSize = Math.floor(ctx.sampleRate * 0.008);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, t);
      filter.Q.setValueAtTime(2.5, t);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.28, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.008);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(masterGain);

      // 2. Tono cuerpo principal (caída de tono acústico 680Hz -> 430Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(680, t);
      osc1.frequency.exponentialRampToValueAtTime(430, t + 0.045);

      const osc1Gain = ctx.createGain();
      osc1Gain.gain.setValueAtTime(0.65, t);
      osc1Gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

      osc1.connect(osc1Gain);
      osc1Gain.connect(masterGain);

      // 3. Resonancia grave sutil ("thock" aterciopelado a 190Hz)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(190, t);
      osc2.frequency.exponentialRampToValueAtTime(140, t + 0.035);

      const osc2Gain = ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.35, t);
      osc2Gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

      osc2.connect(osc2Gain);
      osc2Gain.connect(masterGain);

      // Disparar fuentes
      noise.start(t);
      noise.stop(t + 0.01);
      osc1.start(t);
      osc1.stop(t + 0.055);
      osc2.start(t);
      osc2.stop(t + 0.04);
    } catch (_) {}
  }

  /**
   * Sonido de confirmación al hacer clic en una entidad
   */
  public playClick(gainMultiplier = 1.0) {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.12 * gainMultiplier, t);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
      masterGain.connect(ctx.destination);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, t);
      osc.frequency.exponentialRampToValueAtTime(780, t + 0.06);

      osc.connect(masterGain);
      osc.start(t);
      osc.stop(t + 0.08);
    } catch (_) {}
  }

  /**
   * Detiene el sonido de carga
   */
  public stopLoadingSound() {
    this.activeLoadingNodes.forEach(node => {
      try { node.stop(); } catch (_) {}
    });
    this.activeLoadingNodes = [];
    if (this.loadingAudioEl) {
      try {
        this.loadingAudioEl.pause();
        this.loadingAudioEl.currentTime = 0;
      } catch (_) {}
    }
  }

  public stopLoadingVocal() {
    this.stopLoadingSound();
  }

  /**
   * Shimmer de Campanas de Cristal Puras (Estilo Apple / Bienvenida Cristalina)
   * Tonos puros senoidales con armónicos cristalinos físicos (sin voces ni sintetizadores agresivos)
   * Dura exactamente 3.4 segundos sincronizado con el trazado del logo y la barra de progreso.
   */
  public playLoadingChime(gainMultiplier = 1.0) {
    if (!this.soundEnabled) return;

    this.stopLoadingSound();

    // Intentar reproducción simultánea vía HTML5 Audio precargado
    try {
      if (!this.loadingAudioEl) {
        this.loadingAudioEl = new Audio('/sounds/loading-sound.wav');
      }
      this.loadingAudioEl.currentTime = 0;
      this.loadingAudioEl.volume = Math.min(1.0, 0.40 * gainMultiplier);
      const playPromise = this.loadingAudioEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } catch (_) {}

    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const duration = 3.4;
      const masterGain = ctx.createGain();
      const masterVol = 0.28 * gainMultiplier;

      // Master gain envolvente
      masterGain.gain.setValueAtTime(masterVol, now);
      masterGain.gain.setValueAtTime(masterVol, now + 2.8);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      masterGain.connect(ctx.destination);

      const activeStoppers: (() => void)[] = [];

      // 1. Colchón cálido y sobrio de fondo (senos puros de baja intensidad)
      const subVoices = [
        { freq: 130.81, gain: 0.16 }, // C3
        { freq: 196.00, gain: 0.12 }, // G3
        { freq: 329.63, gain: 0.09 }, // E4
        { freq: 392.00, gain: 0.08 }, // G4
      ];

      subVoices.forEach((sv) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(sv.freq, now);

        g.gain.setValueAtTime(0.0001, now);
        g.gain.linearRampToValueAtTime(sv.gain, now + 0.08);
        g.gain.setValueAtTime(sv.gain, now + 2.7);
        g.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(g);
        g.connect(masterGain);
        osc.start(now);
        osc.stop(now + duration);

        activeStoppers.push(() => {
          try { osc.stop(); } catch (_) {}
        });
      });

      // 2. Secuencia ascendente de campanas de cristal (tonos armónicos puros)
      const chimes = [
        { t: 0.00, f0: 523.25, vol: 0.38 }, // C5 (Instantáneo al inicio)
        { t: 0.45, f0: 659.25, vol: 0.36 }, // E5
        { t: 0.95, f0: 783.99, vol: 0.38 }, // G5
        { t: 1.55, f0: 1046.50, vol: 0.42 }, // C6
        { t: 2.20, f0: 1318.51, vol: 0.45 }  // E6 (Brillo final de resolución al 100%)
      ];

      chimes.forEach((ch) => {
        const hitTime = now + ch.t;
        const partials = [
          { mult: 1.00, gain: 1.00, decay: 2.4 }, // Fundamental pura
          { mult: 2.00, gain: 0.28, decay: 1.8 }, // Octava
          { mult: 2.76, gain: 0.18, decay: 1.3 }, // Shimmer de cristal
          { mult: 4.00, gain: 0.08, decay: 0.8 }, // Brillo superior
        ];

        partials.forEach((p) => {
          const osc = ctx.createOscillator();
          const pGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(ch.f0 * p.mult, hitTime);

          const partialVol = ch.vol * p.gain * 0.35;
          pGain.gain.setValueAtTime(0.0001, hitTime);
          pGain.gain.linearRampToValueAtTime(partialVol, hitTime + 0.003);
          pGain.gain.exponentialRampToValueAtTime(0.0001, hitTime + p.decay);

          osc.connect(pGain);
          pGain.connect(masterGain);

          osc.start(hitTime);
          osc.stop(hitTime + p.decay + 0.05);

          activeStoppers.push(() => {
            try { osc.stop(); } catch (_) {}
          });
        });
      });

      this.activeLoadingNodes.push({
        stop: () => {
          activeStoppers.forEach(fn => fn());
          try {
            masterGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
          } catch (_) {}
        }
      });
    } catch (_) {}
  }

  /**
   * Aliases de conveniencia
   */
  public playLoadingAmbience(gainMultiplier = 1.0) {
    this.playLoadingChime(gainMultiplier);
  }

  public playLoadingVocal(gainMultiplier = 1.0) {
    this.playLoadingChime(gainMultiplier);
  }

  public setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ahorra_sound_enabled', String(enabled));
      } catch (_) {}
    }
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }
}

export const sound = new SoundEngine();
