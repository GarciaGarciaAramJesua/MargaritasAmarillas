// ---- Campanitas de viento generadas con la Web Audio API (sin archivos de audio) ----
let audioCtx = null;
let chimesRunning = false;
let nextChimeTimeout = null;

// Escala pentatónica mayor: suena agradable y "de campanita" en cualquier combinación
const PENTATONIC_FREQS = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51];

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playChime(frequency, volume = 0.18) {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(frequency, now);

  // Un segundo oscilador ligeramente desafinado da el brillo metálico de campana
  const osc2 = ctx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(frequency * 2.01, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

  const gain2 = ctx.createGain();
  gain2.gain.setValueAtTime(0, now);
  gain2.gain.linearRampToValueAtTime(volume * 0.3, now + 0.02);
  gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 4000;

  osc.connect(gain).connect(filter);
  osc2.connect(gain2).connect(filter);
  filter.connect(ctx.destination);

  osc.start(now);
  osc2.start(now);
  osc.stop(now + 2.3);
  osc2.stop(now + 1.5);
}

function scheduleNextChime() {
  const delay = 900 + Math.random() * 2200;
  nextChimeTimeout = setTimeout(() => {
    const freq = PENTATONIC_FREQS[Math.floor(Math.random() * PENTATONIC_FREQS.length)];
    playChime(freq);
    if (chimesRunning) scheduleNextChime();
  }, delay);
}

function startChimes() {
  chimesRunning = true;
  getAudioContext().resume();
  playChime(PENTATONIC_FREQS[Math.floor(Math.random() * PENTATONIC_FREQS.length)]);
  scheduleNextChime();
}

function stopChimes() {
  chimesRunning = false;
  clearTimeout(nextChimeTimeout);
}

const chimeToggle = document.getElementById('chime-toggle');
if (chimeToggle) {
  chimeToggle.addEventListener('click', () => {
    if (chimesRunning) {
      stopChimes();
      chimeToggle.textContent = '🔕 Activar sonido';
      chimeToggle.setAttribute('aria-pressed', 'false');
    } else {
      startChimes();
      chimeToggle.textContent = '🔔 Silenciar';
      chimeToggle.setAttribute('aria-pressed', 'true');
    }
  });
}

// Tocar una margarita también suena como una campanita
document.querySelectorAll('#bouquet .flower').forEach((flower) => {
  flower.style.cursor = 'pointer';
  flower.addEventListener('click', () => {
    const freq = PENTATONIC_FREQS[Math.floor(Math.random() * PENTATONIC_FREQS.length)];
    playChime(freq, 0.22);
  });
});
