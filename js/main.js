// ---- Pétalos flotantes en canvas (efecto decorativo) ----
const canvas = document.getElementById('petals-canvas');
const ctx = canvas.getContext('2d');
let petals = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Petal {
  constructor() {
    this.reset(true);
  }
  reset(initial = false) {
    this.x = Math.random() * canvas.width;
    this.y = initial ? Math.random() * canvas.height : -20;
    this.size = 6 + Math.random() * 8;
    this.speedY = 0.4 + Math.random() * 0.8;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.03;
    this.opacity = 0.5 + Math.random() * 0.5;
    this.color = Math.random() > 0.5 ? '#fffdf6' : '#f4c752';
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5;
    this.rotation += this.rotationSpeed;
    if (this.y > canvas.height + 20) this.reset();
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const PETAL_COUNT = Math.min(40, Math.floor(window.innerWidth / 30));
for (let i = 0; i < PETAL_COUNT; i++) petals.push(new Petal());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

// ---- Mensaje editable: guardar en localStorage y compartir por URL ----
const STORAGE_KEY = 'margaritas-message';
const messageEl = document.getElementById('message-text');
const saveBtn = document.getElementById('save-btn');
const shareBtn = document.getElementById('share-btn');

function loadMessage() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('msg');
  if (fromUrl) {
    try {
      messageEl.textContent = decodeURIComponent(escape(atob(fromUrl)));
      return;
    } catch (e) {
      // ignore invalid encoding
    }
  }
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) messageEl.textContent = saved;
}

function showToast(text) {
  const toast = document.createElement('div');
  toast.textContent = text;
  toast.style.cssText = `
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: #7a5b2a; color: #fff; padding: 10px 20px; border-radius: 999px;
    font-family: 'Quicksand', sans-serif; font-size: 14px; z-index: 10;
    box-shadow: 0 8px 18px rgba(0,0,0,0.2); opacity: 0; transition: opacity 0.3s;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => (toast.style.opacity = '1'));
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

saveBtn.addEventListener('click', () => {
  localStorage.setItem(STORAGE_KEY, messageEl.textContent.trim());
  showToast('¡Mensaje guardado! 🌼');
});

shareBtn.addEventListener('click', async () => {
  const encoded = btoa(unescape(encodeURIComponent(messageEl.textContent.trim())));
  const url = `${window.location.origin}${window.location.pathname}?msg=${encoded}`;
  try {
    await navigator.clipboard.writeText(url);
    showToast('¡Enlace copiado! 📋');
  } catch (e) {
    prompt('Copia este enlace:', url);
  }
});

loadMessage();
