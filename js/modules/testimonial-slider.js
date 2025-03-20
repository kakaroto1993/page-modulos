/**
 * Módulo TestimonialSlider - Controla o slider de depoimentos
 * Versão corrigida com inicialização garantida
 */
const TestimonialSlider = (function () {
    // Variáveis do módulo
    let initialized = false;
    let slides = [];
    let dots = [];
    let prevBtn;
    let nextBtn;
    let currentSlide = 0;
    let slideInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    /**
     * Inicializa o módulo
     */
    function init() {
        // Verifica se o módulo já foi inicializado
        if (initialized) return;
        
        console.log("Inicializando TestimonialSlider...");
        
        // Aguarda um momento para garantir que o DOM esteja completamente carregado
        setTimeout(() => {
            // Verifica se os elementos existem
            if (document.querySelector('.testimonial-slider')) {
                console.log("Elementos de depoimentos encontrados, configurando slider...");
                setupSlider();
                setupTiltEffect();
                initialized = true;
            } else {
                console.log("Elementos de depoimentos não encontrados, tentando novamente...");
                // Tenta novamente em 500ms
                setTimeout(init, 500);
            }
        }, 100);
    }

    /**
     * Configura o slider de depoimentos
     */
    function setupSlider() {
        slides = document.querySelectorAll('.testimonial-item');
        dots = document.querySelectorAll('.dot');
        prevBtn = document.querySelector('.testimonial-prev');
        nextBtn = document.querySelector('.testimonial-next');
        
        console.log(`Slider configurado com ${slides.length} slides e ${dots.length} dots`);

        if (slides.length === 0) {
            console.warn("Nenhum slide encontrado!");
            return;
        }

        // Mostra o primeiro slide inicialmente
        showSlide(0);

        // Set up click handlers for next/prev buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide((currentSlide - 1 + slides.length) % slides.length);
                resetInterval();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showSlide((currentSlide + 1) % slides.length);
                resetInterval();
            });
        }

        // Set up click handlers for dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
                resetInterval();
            });
        });

        // Setup swipe functionality for mobile
        const testimonialContainer = document.querySelector('.testimonial-container');
        if (testimonialContainer) {
            testimonialContainer.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            testimonialContainer.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
        }

        // Start automatic sliding
        startInterval();
    }

    /**
     * Mostra um slide específico pelo índice
     */
    function showSlide(index) {
        // Validação básica
        if (!slides || slides.length === 0) return;
        if (index < 0 || index >= slides.length) return;
        
        console.log(`Mostrando slide ${index}`);
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = 0;
            slide.style.transform = 'translateY(20px) scale(0.95)';
        });
        
        // Deactivate all dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected slide with animation
        setTimeout(() => {
            slides[index].classList.add('active');
            slides[index].style.opacity = 1;
            slides[index].style.transform = 'translateY(0) scale(1)';
            
            if (dots.length > index) {
                dots[index].classList.add('active');
            }
            
            currentSlide = index;
        }, 50);
    }

    /**
     * Processa gestos de deslizamento (swipe)
     */
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, go to next slide
            showSlide((currentSlide + 1) % slides.length);
            resetInterval();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, go to previous slide
            showSlide((currentSlide - 1 + slides.length) % slides.length);
            resetInterval();
        }
    }

    /**
     * Inicia o intervalo para rotação automática dos slides
     */
    function startInterval() {
        slideInterval = setInterval(() => {
            showSlide((currentSlide + 1) % slides.length);
        }, 5000);
    }

    /**
     * Reinicia o intervalo de rotação automática
     */
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    /**
     * Configura o efeito tilt para os cartões de depoimentos
     */
    function setupTiltEffect() {
        const tiltCards = document.querySelectorAll('.tilt-card');
        
        console.log(`Configurando efeito tilt para ${tiltCards.length} cartões`);
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', handleTilt);
            card.addEventListener('mouseleave', resetTilt);
        });
    }
    
    /**
     * Manipula o efeito tilt baseado na posição do mouse
     */
    function handleTilt(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Calculate rotation based on mouse position relative to card center
        const rotateY = ((mouseX - centerX) / (cardRect.width / 2)) * 5;
        const rotateX = -((mouseY - centerY) / (cardRect.height / 2)) * 5;
        
        // Apply the rotation
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Add a slight glow effect on hover
        const intensity = Math.sqrt(Math.pow(rotateX, 2) + Math.pow(rotateY, 2)) / 5;
        card.style.boxShadow = `0 10px 30px rgba(0, 0, 0, 0.1), 
                                ${rotateY / 2}px ${rotateX / 2}px 15px rgba(var(--primary-color-rgb), 0.2)`;
    }
    
    /**
     * Restaura a posição original do cartão
     */
    function resetTilt() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.1)';
    }

    /**
     * Força a reinicialização do módulo
     */
    function forceInit() {
        initialized = false;
        init();
    }

    // API pública do módulo
    return {
        init,
        forceInit
    };
})();

// Auto-inicialização após carregamento completo
document.addEventListener('DOMContentLoaded', function() {
    // Primeiro tenta inicializar normalmente
    TestimonialSlider.init();
    
    // Tenta novamente após todos os componentes estarem carregados
    window.addEventListener('load', function() {
        setTimeout(() => {
            TestimonialSlider.forceInit();
        }, 1000);
    });
});