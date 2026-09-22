# 🌼 Ramo de Margaritas

Página web estática y ligera que muestra un ramo de margaritas amarillas animado en SVG, con un mensaje personalizable, ideal para regalar un detalle digital. Sin frameworks ni dependencias: solo HTML, CSS y JavaScript puro, optimizado para renderizado fluido (SVG + Canvas).

## ✨ Características

- Ramo de margaritas dibujado en SVG con animaciones de "floreo", balanceo de tallos/hojas y transiciones suaves.
- Fondo con pétalos flotantes animados en `<canvas>` para un efecto visual delicado.
- Paleta de tonos cálidos (amarillos, cremas y marrones) inspirada en un diseño tipo "bouquet".
- Área de texto editable directamente en la página (clic y escribe).
- El mensaje se guarda en el navegador (`localStorage`) y puede compartirse mediante un enlace único.
- 100% responsive (funciona en móvil, tablet y escritorio).

## 📂 Estructura del proyecto

```
margaritas/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── .github/workflows/deploy.yml   # Despliegue automático a GitHub Pages
```

## 🚀 Cómo publicarlo en GitHub Pages (acceso público)

1. **Crea un repositorio nuevo en GitHub** (por ejemplo `margaritas`), público, sin archivos iniciales.
2. En esta carpeta local, inicializa git y súbelo:
   ```bash
   git init
   git add .
   git commit -m "Ramo de margaritas: sitio inicial"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/margaritas.git
   git push -u origin main
   ```
3. En GitHub, ve a **Settings → Pages** y en "Build and deployment" selecciona **GitHub Actions** como origen (el workflow incluido en `.github/workflows/deploy.yml` se encargará del resto).
4. Cada `push` a `main` desplegará automáticamente el sitio. La URL pública aparecerá en **Settings → Pages** (algo como `https://<tu-usuario>.github.io/margaritas/`).

## 🖥️ Probarlo en local

Abre `index.html` directamente en el navegador, o usa un servidor simple:

```bash
npx serve .
```

## 🎨 Personalizar

- Cambia el mensaje haciendo clic en el texto de la página y luego en "Guardar mensaje".
- Usa "Copiar enlace" para compartir la página con tu mensaje ya incluido.
- Los colores y tipografías se controlan desde [css/style.css](css/style.css) (variables `--bg-yellow`, `--accent`, `--brown`, etc.).
