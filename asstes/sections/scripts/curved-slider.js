/**
 * Curved Slider - Galería dinámica con deslizamiento horizontal
 * Optimizado para 60fps con requestAnimationFrame
 */
class CurvedSlider {
    constructor(containerId, items) {
        this.container = document.getElementById(containerId);
        this.items = items;
        this.currentIndex = 0;
        this.isDragging = false;
        this.startPos = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.animationID = 0;
        this.itemWidth = 0;
        
        this.init();
    }
    
    init() {
        // Crear estructura de la galería
        this.container.classList.add('curved-slider');
        this.container.innerHTML = '';
        
        // Crear el track para los slides
        this.track = document.createElement('div');
        this.track.classList.add('curved-slider-track');
        this.container.appendChild(this.track);
        
        // Crear los items
        this.items.forEach((item, index) => {
            const slideItem = document.createElement('div');
            slideItem.classList.add('curved-slider-item');
            
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.text;
            img.loading = 'lazy';
            slideItem.appendChild(img);
            
            const caption = document.createElement('div');
            caption.classList.add('curved-slider-caption');
            caption.textContent = item.text;
            slideItem.appendChild(caption);
            
            this.track.appendChild(slideItem);
        });
        
        // Crear navegación
        const nav = document.createElement('div');
        nav.classList.add('curved-slider-nav');
        
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '&larr;';
        prevBtn.addEventListener('click', () => this.slide('prev'));
        
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '&rarr;';
        nextBtn.addEventListener('click', () => this.slide('next'));
        
        nav.appendChild(prevBtn);
        nav.appendChild(nextBtn);
        this.container.appendChild(nav);
        
        // Calcular el ancho de los items después de que se hayan renderizado
        setTimeout(() => {
            const firstItem = this.track.querySelector('.curved-slider-item');
            if (firstItem) {
                this.itemWidth = firstItem.offsetWidth + parseInt(getComputedStyle(firstItem).marginLeft) * 2;
            }
        }, 100);
        
        // Eventos para desktop
        this.track.addEventListener('mousedown', this.touchStart.bind(this));
        this.track.addEventListener('mouseup', this.touchEnd.bind(this));
        this.track.addEventListener('mouseleave', this.touchEnd.bind(this));
        this.track.addEventListener('mousemove', this.touchMove.bind(this));
        
        // Eventos para móviles
        this.track.addEventListener('touchstart', this.touchStart.bind(this));
        this.track.addEventListener('touchend', this.touchEnd.bind(this));
        this.track.addEventListener('touchmove', this.touchMove.bind(this));
        
        // Prevenir el comportamiento por defecto del arrastre de imágenes
        this.track.querySelectorAll('img').forEach(img => {
            img.addEventListener('dragstart', e => e.preventDefault());
        });
        
        // Eliminamos todo el bloque de código que aplica el efecto 3D en hover
        // if (window.matchMedia('(min-width: 768px)').matches) {
        //     this.track.querySelectorAll('.curved-slider-item').forEach(item => {
        //         item.addEventListener('mousemove', e => {
        //             if (!this.isDragging) {
        //                 const rect = item.getBoundingClientRect();
        //                 const x = e.clientX - rect.left;
        //                 const y = e.clientY - rect.top;
        //                 
        //                 const centerX = rect.width / 2;
        //                 const centerY = rect.height / 2;
        //                 
        //                 const angleX = (y - centerY) / 20;
        //                 const angleY = (centerX - x) / 20;
        //                 
        //                 item.style.transform = `perspective(1000px) rotateX(${5 + angleX}deg) rotateY(${angleY}deg)`;
        //             }
        //         });
        //         
        //         item.addEventListener('mouseleave', () => {
        //             item.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(0deg)';
        //         });
        //     });
        // }
    }
    
    touchStart(event) {
        this.isDragging = true;
        this.startPos = this.getPositionX(event);
        this.animationID = requestAnimationFrame(this.animation.bind(this));
        this.track.style.cursor = 'grabbing';
    }
    
    touchMove(event) {
        if (this.isDragging) {
            const currentPosition = this.getPositionX(event);
            this.currentTranslate = this.prevTranslate + currentPosition - this.startPos;
        }
    }
    
    touchEnd() {
        this.isDragging = false;
        cancelAnimationFrame(this.animationID);
        
        const movedBy = this.currentTranslate - this.prevTranslate;
        
        // Si el movimiento fue significativo, avanzar o retroceder
        if (movedBy < -100 && this.currentIndex < this.items.length - 1) {
            this.currentIndex += 1;
        }
        
        if (movedBy > 100 && this.currentIndex > 0) {
            this.currentIndex -= 1;
        }
        
        this.setPositionByIndex();
        this.track.style.cursor = 'grab';
    }
    
    getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
    
    animation() {
        this.setSliderPosition();
        if (this.isDragging) requestAnimationFrame(this.animation.bind(this));
    }
    
    setSliderPosition() {
        // Aplicar transformación con will-change para optimizar rendimiento
        this.track.style.transform = `translateX(${this.currentTranslate}px)`;
    }
    
    setPositionByIndex() {
        // Calcular la posición central
        const containerWidth = this.container.offsetWidth;
        const totalItems = this.items.length;
        
        // Ajustar para centrar el elemento actual
        this.currentTranslate = -this.currentIndex * this.itemWidth + (containerWidth / 2 - this.itemWidth / 2);
        
        // Limitar el deslizamiento para que no se salga de los límites
        const minTranslate = containerWidth - totalItems * this.itemWidth;
        if (this.currentTranslate < minTranslate) this.currentTranslate = minTranslate;
        if (this.currentTranslate > 0) this.currentTranslate = 0;
        
        this.prevTranslate = this.currentTranslate;
        this.setSliderPosition();
    }
    
    slide(direction) {
        if (direction === 'prev' && this.currentIndex > 0) {
            this.currentIndex -= 1;
        } else if (direction === 'next' && this.currentIndex < this.items.length - 1) {
            this.currentIndex += 1;
        }
        
        this.setPositionByIndex();
    }
}

// Función para inicializar la galería
function initCurvedSlider(containerId, items) {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        new CurvedSlider(containerId, items);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            new CurvedSlider(containerId, items);
        });
    }
}