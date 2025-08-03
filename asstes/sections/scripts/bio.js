// Datos de la biografía
const timelineData = [
  {
    title: "1979",
    content: `
      <p class="bio-text">
        Nació en Buenos Aires, Argentina en el año 1979. A sus dieciséis años, comienza a estudiar en la Escuela de Cerámica de Mar del Plata, y es allí donde inicia su carrera como ceramista y docente.
      </p>

    `
  },
  {
    title: "2003",
    content: `
      <p class="bio-text">
        Ha desarrollado su tarea docente en escuelas e institutos terciarios donde ha dictado clases como docente del área artística. En el año 2003 inicia un trabajo de investigación en lo referente a pastas cerámicas, arcillas locales, construcción de hornos e investigación y diagnóstico de materiales.
      </p>

    `
  },
  {
    title: "2010",
    content: `
      <p class="bio-text">
        En el año 2010 comienza a dictar talleres de cerámica en su ciudad y en diferentes puntos del país, especializándose en la construcción de hornos a leña y técnicas de cocción alternativas.
      </p>
    `
  },
  {
    title: "2015",
    content: `
      <p class="bio-text">
        En el año 2015 comienza a participar en diferentes eventos y exposiciones de cerámica a nivel nacional e internacional, compartiendo sus conocimientos y experiencias con otros ceramistas.
      </p>

    `
  },
  {
    title: "2017",
    content: `
      <p class="bio-text">
        En el año 2017 abre su propio taller en la ciudad de Mar del Plata (Huellaseneelbarro Cerámica) e inicia su trabajo de Investigación Artística dentro del marco de Clínica de Análisis de Obra, propia y de otros artistas de su ciudad, desde la contemporaneidad, el modelo actual, los referentes y las influencias creado y coordinado por los artistas Roveda/Fosatti.
      </p>

    `
  },
  {
    title: "2018",
    content: `
      <p class="bio-text">
        En el año 2018 participó del 59 Salón Anual Internacional de Cerámica organizado por el C.A.A.C y ganó el 1er premio SIMCIC (Otras Disciplinas en Diálogo con la Cerámica).
      </p>

    `
  },
  {
    title: "2019",
    content: `
      <p class="bio-text">
        En Agosto del año 2019 viaja a España a realizar una residencia Artística en Airgentum Hoja de Ruta (Castilblanco de los Arroyos) exponiendo su trabajo final en la ciudad de Sevilla junto a otros artistas internacionales.
      </p>

    `
  },
    {
    title: "2020",
    content: `
      <p class="bio-text">
        En el año 2020 inicia su formación en la Academia Glamart, donde sigue formándose y trabajando en su obra en el contexto del arte contemporáneo.
      </p>

    `
  },
  {
    title: "2022",
    content: `
      <p class="bio-text">
        En el mes de Agosto del 2022 gana la Beca "AVISTAJE", donde desarrollará en el segundo semestre del año, su cuerpo de obra en la Clínica de Artistas Visuales en el teatro Auditorium de Mar del Plata.
      </p>

    `
  },
  {
    title: "2023",
    content: `
      <p class="bio-text">
        En el año 2023 viaja a Berlín a exponer su obra en la Embajada de Argentina en Alemania, junto a la artista Mirijam Elburn, y dicta workshops de Cerámica en Madrid y Salamanca en lo referente a pastas, vasijas escultóricas, horno a leña y rakú.
      </p>

    `
  },
  {
    title: "Exposiciones",
    content: `
      <p class="bio-text">
        Su obra ha sido expuesta en Centro Culturales, Museo Perlotti (CABA-Bs As), y Centro Cultural de la Embajada de Japón (CABA-Bs As), España, Berlín y diferentes ciudades de su país.
      </p>

    `
  },
    {
    title: "Actualidad",
    content: `
      <p class="bio-text">
        Actualmente es la coordinadora de Estudio Pedraza donde sigue formándose y trabajando en su obra en el contexto del arte contemporáneo junto a Claudio Roveda y Gustavo Christiansen.
      </p>

    `
  }
];

// Función para crear efecto de tipeo
function typeText(element, text, speed = 10) {
  let index = 0;
  element.innerHTML = '';
  
  function type() {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

function renderTimeline(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="timeline-header">
      <p class="timeline-subtitle">
        Trayectoria artística y profesional
      </p>
    </div>
    <div class="relative timeline-wrapper"></div>
  `;

  const wrapper = container.querySelector('.timeline-wrapper');
  data.forEach(item => {
    const entry = document.createElement('div');
    entry.className = 'timeline-entry fade-hidden';
    entry.innerHTML = `
      <div class="timeline-year">
        <div class="timeline-dot">
          <div class="timeline-dot-inner"></div>
        </div>
        <h3 class="timeline-title">${item.title}</h3>
      </div>
      <div class="timeline-content">
        <div class="bio-text-container">${item.content}</div>
      </div>
    `;
    wrapper.appendChild(entry);
  });

  // Configurar el observador de intersección para las animaciones
  setupScrollAnimations();
}

function setupScrollAnimations() {
  const timelineEntries = document.querySelectorAll('.timeline-entry');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Añadir clase para el fade-in
        entry.target.classList.add('fade-visible');
        
        // Aplicar efecto de tipeo al texto biográfico
        const bioTextElement = entry.target.querySelector('.bio-text');
        if (bioTextElement) {
          const originalText = bioTextElement.innerHTML;
          // Guardar el texto original como atributo si aún no se ha hecho
          if (!bioTextElement.getAttribute('data-original-text')) {
            bioTextElement.setAttribute('data-original-text', originalText);
            // Iniciar efecto de tipeo
            typeText(bioTextElement, originalText);
          }
        }
        
        // Dejar de observar este elemento una vez animado
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,  // Activar cuando al menos 10% del elemento es visible
    rootMargin: '0px 0px -100px 0px'  // Margen negativo para activar un poco antes
  });
  
  // Observar todos los elementos de la línea de tiempo
  timelineEntries.forEach(entry => {
    observer.observe(entry);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTimeline(timelineData, 'timeline');
});