document.addEventListener('DOMContentLoaded', function() {
    const nameElement = document.getElementById('typed-name');
    const cursor = document.getElementById('cursor');
    const mainContent = document.getElementById('main-content');
    const nav = document.querySelector('nav');
    const profession = document.querySelector('.profession');
    const quoteContainer = document.querySelector('.quote-container');
    const footer = document.querySelector('footer');
    const fullName = 'Maria Laura Galeotti';
    let i = 0;
    
    // Función para escribir el nombre letra por letra
    function typeWriter() {
        if (i < fullName.length) {
            nameElement.textContent += fullName.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Cuando termina de escribir, muestra el resto del contenido secuencialmente
            setTimeout(() => {
                cursor.style.display = 'none';
                
                // Mostrar elementos secuencialmente
                setTimeout(() => {
                    profession.classList.add('visible');
                    
                    setTimeout(() => {
                        quoteContainer.classList.add('visible');
                        
                        setTimeout(() => {
                            nav.classList.add('visible');
                            footer.classList.add('visible');
                        }, 300);
                    }, 200);
                }, 100);
            }, 100);
        }
    }
    
    // Iniciar la animación después de un breve retraso
    setTimeout(typeWriter, 500);
});