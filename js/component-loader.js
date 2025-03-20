/**
 * ComponentLoader - Sistema de carregamento de componentes HTML
 * Versão aprimorada com detecção de erros e retentativas
 */
const ComponentLoader = (function() {
    // Lista de componentes e seus contêineres
    const componentMap = {
        'header-container': 'header.html',
        'hero-container': 'hero-section.html',
        'about-container': 'about-section.html',
        'stats-container': 'stats-section.html',
        'skills-container': 'skills-section.html',
        'projects-container': 'projects-section.html',
        'testimonials-container': 'testimonials-section.html',
        'economy-container': 'economy-simulator-section.html',
        'contact-container': 'contact-section.html',
        'creative-modal-container': 'creative-modal.html',
        'footer-container': 'footer.html',
        'clippy-container': 'clippy-assistant.html'
    };

    // Controle de estado do carregamento
    let loadedComponents = 0;
    let totalComponents = Object.keys(componentMap).length;
    let componentsLoaded = false;
    
    /**
     * Inicializa o carregador de componentes
     */
    function init() {
        console.log('ComponentLoader: Iniciando carregamento de componentes...');
        loadAllComponentsInOrder();
    }
    
    /**
     * Carrega todos os componentes na ordem definida
     */
    async function loadAllComponentsInOrder() {
        console.log('ComponentLoader: Carregando componentes sequencialmente...');
        
        // Primeiro, vamos tentar carregar cada componente
        for (const [containerId, filename] of Object.entries(componentMap)) {
            await loadComponent(containerId, filename);
        }
        
        // Verifica se todos os componentes foram carregados
        if (loadedComponents < totalComponents) {
            console.warn(`ComponentLoader: Apenas ${loadedComponents}/${totalComponents} componentes foram carregados. Tentando novamente componentes com falha...`);
            
            // Segunda tentativa para componentes que falharam
            for (const [containerId, filename] of Object.entries(componentMap)) {
                const container = document.getElementById(containerId);
                if (container && (!container.innerHTML || container.innerHTML.trim() === '')) {
                    console.log(`ComponentLoader: Tentando carregar ${filename} novamente...`);
                    await loadComponent(containerId, filename);
                }
            }
        }
        
        console.log(`ComponentLoader: ${loadedComponents}/${totalComponents} componentes carregados com sucesso.`);
        componentsLoaded = true;
        
        // Dispara o evento de componentes carregados
        window.dispatchEvent(new CustomEvent('componentsLoaded'));
        
        // Inicializa os módulos
        console.log('ComponentLoader: Inicializando módulos...');
        setTimeout(() => {
            if (typeof initializeAllModules === 'function') {
                initializeAllModules();
            }
        }, 100);
    }
    
    /**
     * Carrega um componente específico
     */
    async function loadComponent(containerId, filename) {
        try {
            const container = document.getElementById(containerId);
            if (!container) {
                console.warn(`ComponentLoader: Contêiner não encontrado para ${filename}`);
                return;
            }
            
            const response = await fetch(`components/${filename}`);
            if (!response.ok) {
                throw new Error(`Falha ao carregar ${filename}: ${response.status} ${response.statusText}`);
            }
            
            const html = await response.text();
            container.innerHTML = html;
            
            loadedComponents++;
            console.log(`ComponentLoader: Componente ${filename} carregado com sucesso (${loadedComponents}/${totalComponents})`);
            
            // Dispara evento específico para este componente
            window.dispatchEvent(new CustomEvent('componentLoaded', {
                detail: { id: containerId, filename }
            }));
            
            return true;
        } catch (error) {
            console.error(`ComponentLoader: Erro ao carregar ${filename}`, error);
            return false;
        }
    }
    
    /**
     * Verifica se todos os componentes foram carregados
     */
    function areComponentsLoaded() {
        return componentsLoaded;
    }
    
    /**
     * Força a reinicialização de um componente específico
     */
    async function reloadComponent(containerId) {
        if (!componentMap[containerId]) {
            console.error(`ComponentLoader: Componente ${containerId} não existe no mapa de componentes`);
            return false;
        }
        
        console.log(`ComponentLoader: Recarregando componente ${containerId}...`);
        const result = await loadComponent(containerId, componentMap[containerId]);
        
        if (result && containerId === 'testimonials-container') {
            console.log('ComponentLoader: Reinicializando TestimonialSlider...');
            if (typeof TestimonialSlider !== 'undefined' && TestimonialSlider.forceInit) {
                setTimeout(() => {
                    TestimonialSlider.forceInit();
                }, 100);
            }
        }
        
        return result;
    }
    
    // API pública
    return {
        init,
        loadComponent,
        reloadComponent,
        areComponentsLoaded
    };
})();

// Inicialização automática quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    ComponentLoader.init();
    
    // Força uma segunda tentativa após o carregamento completo da página
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (!ComponentLoader.areComponentsLoaded()) {
                console.log('ComponentLoader: Forçando reinicialização após carregamento completo...');
                ComponentLoader.init();
            }
            
            // Força reinicialização dos depoimentos
            ComponentLoader.reloadComponent('testimonials-container');
        }, 500);
    });
});