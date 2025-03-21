<!-- Seção de Depoimentos - Versão Simplificada -->
<section id="testimonials" class="testimonials section">
    <div class="container">
        <h2 class="section-title">Depoimentos</h2>
        <p class="section-subtitle">O que meus clientes estão dizendo</p>
        
        <!-- Slider simplificado com layout alternativo -->
        <div class="testimonial-slider" id="testimonial-slider">
            <div class="testimonial-container">
                <div class="testimonial-item active">
                    <div class="testimonial-content">
                        <div class="testimonial-rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="testimonial-text">
                            <i class="fas fa-quote-left"></i>
                            <p>"O Daniel foi extremamente profissional durante todo o projeto de nossa casa. Sua atenção aos detalhes e conhecimento técnico nos deu muita segurança. Recomendo sem hesitação para qualquer projeto de engenharia civil."</p>
                        </div>
                        <div class="testimonial-author">
                            <div class="author-img">
                                <img src="images/testimonials/client1.jpg" alt="Ricardo Santos" onerror="this.src='https://via.placeholder.com/50'">
                            </div>
                            <div class="author-info">
                                <h4>Ricardo Santos</h4>
                                <p>Projeto Residencial</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Controles do slider -->
            <div class="testimonial-controls">
                <button class="testimonial-prev" aria-label="Depoimento anterior" onclick="TestimonialSliderSimple.prev()">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <div class="testimonial-dots">
                    <span class="dot active" data-index="0" onclick="TestimonialSliderSimple.goTo(0)"></span>
                    <span class="dot" data-index="1" onclick="TestimonialSliderSimple.goTo(1)"></span>
                    <span class="dot" data-index="2" onclick="TestimonialSliderSimple.goTo(2)"></span>
                </div>
                <button class="testimonial-next" aria-label="Próximo depoimento" onclick="TestimonialSliderSimple.next()">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Script inline para garantir inicialização -->
    <script>
    // Módulo simplificado embutido para garantir funcionamento
    const TestimonialSliderSimple = (function() {
        let currentIndex = 0;
        const testimonials = [
            {
                rating: 5,
                text: "O Daniel foi extremamente profissional durante todo o projeto de nossa casa. Sua atenção aos detalhes e conhecimento técnico nos deu muita segurança. Recomendo sem hesitação para qualquer projeto de engenharia civil.",
                author: "Ricardo Santos",
                project: "Projeto Residencial",
                image: "images/testimonials/client1.jpg"
            },
            {
                rating: 5,
                text: "Contratamos o Daniel para um projeto comercial complexo e ele superou todas as nossas expectativas. Sua capacidade de resolver problemas e sugerir soluções inovadoras foi fundamental para o sucesso do nosso empreendimento.",
                author: "Ana Oliveira",
                project: "Projeto Comercial",
                image: "images/testimonials/client2.jpg"
            },
            {
                rating: 4.5,
                text: "O que mais me impressionou no trabalho do Daniel foi seu comprometimento com prazos e orçamentos. Em um mercado onde atrasos são comuns, ele entregou nosso projeto pontualmente e dentro do valor acordado. Um verdadeiro profissional.",
                author: "Marcos Vinicius",
                project: "Reforma Estrutural",
                image: "images/testimonials/client3.jpg"
            }
        ];

        function init() {
            updateTestimonial();
            startAutoRotation();
        }

        function updateTestimonial() {
            const testimonial = testimonials[currentIndex];
            const container = document.querySelector('.testimonial-container');
            if (!container) return;
            
            // Criar estrelas baseado na avaliação
            let stars = '';
            const fullStars = Math.floor(testimonial.rating);
            const hasHalfStar = testimonial.rating % 1 !== 0;
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="fas fa-star"></i>';    
            }
            
            if (hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            }
            
            // Atualizar o HTML
            container.innerHTML = `
                <div class="testimonial-item active">
                    <div class="testimonial-content">
                        <div class="testimonial-rating">
                            ${stars}
                        </div>
                        <div class="testimonial-text">
                            <i class="fas fa-quote-left"></i>
                            <p>"${testimonial.text}"</p>
                        </div>
                        <div class="testimonial-author">
                            <div class="author-img">
                                <img src="${testimonial.image}" alt="${testimonial.author}" onerror="this.src='https://via.placeholder.com/50'">
                            </div>
                            <div class="author-info">
                                <h4>${testimonial.author}</h4>
                                <p>${testimonial.project}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Atualizar os dots
            document.querySelectorAll('.dot').forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function next() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateTestimonial();
            resetAutoRotation();
        }

        function prev() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateTestimonial();
            resetAutoRotation();
        }

        function goTo(index) {
            if (index >= 0 && index < testimonials.length) {
                currentIndex = index;
                updateTestimonial();
                resetAutoRotation();
            }
        }

        let autoRotationTimer;
        
        function startAutoRotation() {
            autoRotationTimer = setInterval(next, 6000);
        }
        
        function resetAutoRotation() {
            clearInterval(autoRotationTimer);
            startAutoRotation();
        }

        // Inicializar quando o script carregar
        setTimeout(init, 500);

        return {
            next,
            prev,
            goTo
        };
    })();
    </script>
</section>
