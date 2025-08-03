// workshops.js

// Redefinir los items para usar las imágenes locales y agregar URLs de redirección
const workshopItems = [
  {
    text: "INVESTIGACION",
    image: "../../../asstes/images/invs.png",
    redirectUrl: "./investigacion.html"
  },
  {
    text: "HORNOS",
    image: "../../../asstes/images/hornos.png",
    redirectUrl: "./hornos.html"
  },
  {
    text: "PASTAS CERAMICAS",
    image: "../../../asstes/images/pastas.png",
    redirectUrl: "./pastas.html"
  }
];

function preloadWorkshopImages(urls, callback) {
  let loadedCount = 0;
  const totalImages = urls.length;
  
  if (totalImages === 0) {
    callback();
    return;
  }
  
  urls.forEach(url => {
    const img = new Image();
    img.onload = () => {
      loadedCount++;
      if (loadedCount === totalImages) callback();
    };
    img.onerror = () => {
      console.error("Error cargando imagen:", url);
      loadedCount++;
      if (loadedCount === totalImages) callback();
    };
    img.src = url;
  });
}

function createWorkshopCircularReveal(containerId, size = 'md') {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error("Contenedor no encontrado:", containerId);
    return;
  }

  const sizes = {
    sm: { radius: 160, fontSize: '14px', size: 300 },
    md: { radius: 160, fontSize: '18px', size: 400 },
    lg: { radius: 160, fontSize: '20px', size: 500 }
  };
  const config = sizes[size];

  let activeImage = null;

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", `0 0 ${config.size} ${config.size}`);
  svg.setAttribute("width", config.size);
  svg.setAttribute("height", config.size);
  svg.style.position = "absolute";
  svg.style.inset = 0;
  svg.style.margin = "auto";
  svg.style.pointerEvents = "none"; // Importante: permitir que los eventos pasen a través del SVG
  // Agregar clase para la animación de rotación
  svg.classList.add("rotating-plate");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("id", "curve");
  path.setAttribute("fill", "none");
  path.setAttribute(
    "d",
    `M ${config.size / 2},${config.size / 2} m -${config.radius},0 ` +
      `a ${config.radius},${config.radius} 0 1,1 ${config.radius * 2},0 ` +
      `a ${config.radius},${config.radius} 0 1,1 -${config.radius * 2},0`
  );
  svg.appendChild(path);

  const gradient = document.createElementNS(svgNS, "linearGradient");
  gradient.setAttribute("id", "textGradient");
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "100%");
  gradient.setAttribute("y2", "0%");
  const stop1 = document.createElementNS(svgNS, "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#666666");
  const stop2 = document.createElementNS(svgNS, "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "#444444");
  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  const defs = document.createElementNS(svgNS, "defs");
  defs.appendChild(gradient);
  svg.appendChild(defs);

  const totalGap = 20 * workshopItems.length;
  const segDeg = (360 - totalGap) / workshopItems.length;

  // Crear un contenedor para los textos que no rote
  const textContainer = document.createElementNS(svgNS, "g");
  textContainer.style.pointerEvents = "auto"; // Importante: permitir interacción con los textos

  workshopItems.forEach((item, i) => {
    const startDeg = i * (segDeg + 20);
    const startOffset = `${(startDeg / 360) * 100}%`;

    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("font-size", config.fontSize);
    text.setAttribute("font-weight", "bold");
    text.setAttribute("letter-spacing", "2px");
    text.setAttribute("font-family", "'Cormorant Garamond', serif");
    text.style.cursor = "pointer";
    text.style.pointerEvents = "auto"; // Importante: permitir interacción

    const textPath = document.createElementNS(svgNS, "textPath");
    textPath.setAttribute("href", "#curve");
    textPath.setAttribute("startOffset", startOffset);
    textPath.setAttribute("textLength", segDeg * 1.8);
    textPath.setAttribute("lengthAdjust", "spacingAndGlyphs");
    textPath.setAttribute("fill", "url(#textGradient)");
    textPath.textContent = item.text;
    textPath.style.pointerEvents = "auto"; // Importante: permitir interacción
    
    // Agregar un ID único para depuración
    textPath.setAttribute("id", `text-${i}`);

    // Función para mostrar la imagen
    const showImage = () => {
      console.log("Mostrando imagen:", item.image);
      if (activeImage !== item.image) {
        activeImage = item.image;
        imgEl.src = item.image;
        imgEl.style.opacity = 1;
      }
    };

    // Función para redireccionar
    const redirectToPage = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      console.log("Redireccionando a:", item.redirectUrl);
      window.location.href = item.redirectUrl;
    };

    // Eventos para desktop
    text.addEventListener("mouseenter", showImage);
    text.addEventListener("mouseleave", () => {
      imgEl.style.opacity = 0;
    });
    text.addEventListener("click", redirectToPage);

    // Eventos para móviles
    text.addEventListener("touchstart", showImage);
    text.addEventListener("touchend", redirectToPage);

    text.appendChild(textPath);
    textContainer.appendChild(text);
  });

  svg.appendChild(textContainer);

  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.style.width = config.size + "px";
  wrapper.style.height = config.size + "px";
  wrapper.style.borderRadius = "50%";
  wrapper.style.background = "#e6e6e6";
  wrapper.style.boxShadow = "16px 16px 32px #bebebe,-16px -16px 32px #ffffff";
  wrapper.appendChild(svg);

  // Crear la imagen que se mostrará al hacer hover
  const imgEl = document.createElement("img");
  imgEl.style.position = "absolute";
  imgEl.style.inset = 0;
  imgEl.style.margin = "auto";
  imgEl.style.width = "75%";
  imgEl.style.height = "75%";
  imgEl.style.borderRadius = "50%";
  imgEl.style.objectFit = "cover";
  imgEl.style.opacity = 0;
  imgEl.style.transition = "opacity 0.3s ease";
  imgEl.style.pointerEvents = "none"; // Asegura que los eventos pasen a través de la imagen
  imgEl.style.zIndex = 5;
  
  // Agregar un ID para depuración
  imgEl.setAttribute("id", "workshop-image");
  
  // Manejar errores de carga de imagen
  imgEl.onerror = () => {
    console.error("Error al cargar la imagen:", imgEl.src);
  };

  wrapper.appendChild(imgEl);

  // Crear el texto central
  const centerText = document.createElement("div");
  centerText.textContent = "WORKSHOPS";
  centerText.style.position = "absolute";
  centerText.style.inset = 0;
  centerText.style.margin = "auto";
  centerText.style.display = "flex";
  centerText.style.justifyContent = "center";
  centerText.style.alignItems = "center";
  centerText.style.textAlign = "center";
  centerText.style.color = "#444";
  centerText.style.fontWeight = "bold";
  centerText.style.fontFamily = "'Cormorant Garamond', serif";
  centerText.style.fontSize = config.fontSize;
  centerText.style.zIndex = 10;
  centerText.style.pointerEvents = "none"; // Asegura que los eventos pasen a través del texto central
  
  wrapper.appendChild(centerText);

  // Limpiar el contenedor y agregar el nuevo componente
  container.innerHTML = '';
  container.appendChild(wrapper);
  
  // Iniciar la animación de rotación
  startRotation(svg);
  
  // Agregar un evento de clic al contenedor para depuración
  wrapper.addEventListener("click", (e) => {
    console.log("Clic en el wrapper", e.target);
  });
}

// Función para iniciar la rotación lenta
function startRotation(element) {
  let rotation = 0;
  const speed = 0.05; // Velocidad de rotación (grados por frame)
  
  function animate() {
    rotation += speed;
    element.style.transform = `rotate(${rotation}deg)`;
    requestAnimationFrame(animate);
  }
  
  animate();
}

// Función para reiniciar el componente cuando se navega de vuelta a la página
function reinitializeComponent() {
  const container = document.getElementById("circular-reveal");
  if (container) {
    console.log("Reinicializando componente");
    preloadWorkshopImages(workshopItems.map(i => i.image), () => {
      createWorkshopCircularReveal("circular-reveal", "md");
    });
  }
}

// Inicializar el componente cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado, inicializando componente");
  reinitializeComponent();
});

// Reinicializar el componente cuando se vuelve a la página
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    console.log("Página mostrada desde caché, reinicializando");
    reinitializeComponent();
  }
});

// También podemos usar el evento visibilitychange para reinicializar cuando la página se vuelve visible
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    console.log("Página visible, reinicializando");
    reinitializeComponent();
  }
});