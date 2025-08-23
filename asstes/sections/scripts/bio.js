// Datos de la biografía
const bioData = [
  {
    year: "1979",
    text: "Nació en Buenos Aires, Argentina en el año 1979. A sus dieciséis años, comienza a estudiar en la Escuela de Cerámica de Mar del Plata, y es allí donde inicia su carrera como ceramista y docente."
  },
  {
    year: "2003",
    text: "Ha desarrollado su tarea docente en escuelas e institutos terciarios donde ha dictado clases como docente del área artística. En el año 2003 inicia un trabajo de investigación en lo referente a pastas cerámicas, arcillas locales, construcción de hornos e investigación y diagnóstico de materiales."
  },
  {
    year: "2010",
    text: "En el año 2010 comienza a dictar talleres de cerámica en su ciudad y en diferentes puntos del país, especializándose en la construcción de hornos a leña y técnicas de cocción alternativas."
  },
  {
    year: "2015",
    text: "En el año 2015 comienza a participar en diferentes eventos y exposiciones de cerámica a nivel nacional e internacional, compartiendo sus conocimientos y experiencias con otros ceramistas."
  },
  {
    year: "2017",
    text: "En el año 2017 abre su propio taller en la ciudad de Mar del Plata (Huellas en el barro Cerámica) e inicia su trabajo de Investigación Artística dentro del marco de Clínica de Análisis de Obra, propia y de otros artistas de su ciudad, desde la contemporaneidad, el modelo actual, los referentes y las influencias creado y coordinado por los artistas Roveda/Fosatti."
  },
  {
    year: "2018",
    text: "En el año 2018 participó del 59 Salón Anual Internacional de Cerámica organizado por el C.A.A.C y ganó el 1er premio SIMCIC (Otras Disciplinas en Diálogo con la Cerámica)."
  },
  {
    year: "2019",
    text: "En Agosto del año 2019 viaja a España a realizar una residencia Artística en Airgentum Hoja de Ruta (Castil blanco de los Arroyos) exponiendo su trabajo final en la ciudad de Sevilla junto a otros artistas internacionales."
  },
  {
    year: "2020",
    text: "En el año 2020 inicia su formación en la Academia Glamart, donde sigue formándose y trabajando en su obra en el contexto del arte contemporáneo."
  },
  {
    year: "2022",
    text: "En el mes de Agosto del 2022 gana la Beca \"AVISTAJE\", donde desarrollará en el segundo semestre del año, su cuerpo de obra en la Clínica de Artistas Visuales en el teatro Auditorium de Mar del Plata."
  },
  {
    year: "2023",
    text: "En el año 2023 viaja a Berlín a exponer su obra en la Embajada de Argentina en Alemania, junto a la artista Mirijam Elburn, y dicta workshops de Cerámica en Madrid y Salamanca en lo referente a pastas, vasijas escultóricas, horno a leña y rakú."
  },
  {
    year: "Exposiciones",
    text: "Su obra ha sido expuesta en Centro Culturales, Museo Perlotti (CABA-Bs As), y Centro Cultural de la Embajada de Japón (CABA-Bs As), España, Berlín y diferentes ciudades de su país."
  },
  {
    year: "Actualidad",
    text: "Actualmente es la coordinadora de Estudio Pedraza donde sigue formándose y trabajando en su obra en el contexto del arte contemporáneo junto a Claudio Roveda y Gustavo Christiansen."
  }
];

function renderBioEntries() {
  const bioEntries = document.getElementById('bio-entries');
  if (!bioEntries) return;

  // Limpiar el contenedor
  bioEntries.innerHTML = '';

  // Renderizar todas las entradas biográficas
  bioData.forEach((item, index) => {
    const entry = document.createElement('div');
    entry.className = 'bio-entry';
    entry.setAttribute('data-year', item.year);
    
    const content = document.createElement('div');
    content.className = 'bio-content';
    
    const yearElement = document.createElement('h3');
    yearElement.className = 'bio-year';
    yearElement.textContent = item.year;
    
    const textElement = document.createElement('div');
    textElement.className = 'bio-text';
    textElement.textContent = item.text;
    
    content.appendChild(yearElement);
    content.appendChild(textElement);
    entry.appendChild(content);
    bioEntries.appendChild(entry);
  });

  // Iniciar las animaciones al hacer scroll
  checkVisibility();
}

// Función para verificar la visibilidad de los elementos y aplicar animaciones
function checkVisibility() {
  const bioEntries = document.querySelectorAll('.bio-entry');
  const windowHeight = window.innerHeight;
  
  bioEntries.forEach(entry => {
    const entryTop = entry.getBoundingClientRect().top;
    
    if (entryTop < windowHeight * 0.85) {
      entry.classList.add('visible');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderBioEntries();
  
  // Añadir evento de scroll para las animaciones
  window.addEventListener('scroll', checkVisibility);
});