document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Splash Screen apenas se existir na tela (Index)
    if(document.querySelector(".intro-overlay")) {
        // Verifica se o GSAP foi carregado
        if (typeof gsap !== 'undefined') {
            document.body.style.overflow = 'hidden';
            const tl = gsap.timeline();
            tl.to(".intro-logo", { opacity: 0, scale: 0.85, duration: 1.2, delay: 0.6, ease: "power2.inOut" })
              .to(".intro-overlay", { yPercent: -100, duration: 1.2, ease: "power3.inOut" }, "-=0.2")
              .from(".hero-bottle", { opacity: 0, y: 50, duration: 1 }, "-=0.5")
              .from(".hero-content", { opacity: 0, y: 30, duration: 1, onComplete: () => document.body.style.overflow = 'auto' }, "-=0.8");
        } else {
            document.querySelector(".intro-overlay").style.display = 'none';
        }
    }

    // 2. Gráfico Radar (Sommelier)
    const ctx = document.getElementById('flavorRadarChart');
    if (ctx && typeof Chart !== 'undefined') {
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Corpo', 'Taninos', 'Álcool', 'Acidez', 'Doçura'],
                datasets: [{
                    data: [8, 7, 6, 4, 1], 
                    backgroundColor: 'rgba(227, 210, 171, 0.3)', borderColor: '#c9b993', pointBackgroundColor: '#2b0b10'
                }]
            },
            options: { scales: { r: { ticks: { display: false } } }, plugins: { legend: { display: false } } }
        });
    }

    // 3. Abas do Perfil
    document.querySelectorAll('.profile-tab-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.profile-tab-link').forEach(l => l.classList.remove('active', 'bg-dark', 'text-white'));
            document.querySelectorAll('.profile-tab-content').forEach(c => c.classList.add('d-none'));
            link.classList.add('active', 'bg-dark', 'text-white');
            document.getElementById(link.getAttribute('data-target')).classList.remove('d-none');
        });
    });

    // --- BOTÃO DE BUSCA EXPANSÍVEL ---
    const searchToggleBtn = document.getElementById('searchToggleBtn');
    const expandableSearch = document.querySelector('.expandable-search');
    const searchInput = document.getElementById('searchInput');

    if (searchToggleBtn && expandableSearch) {
        searchToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Adiciona ou remove a classe que expande a barra
            expandableSearch.classList.toggle('active');
            
            // Foca no campo de texto automaticamente se foi aberto
            if (expandableSearch.classList.contains('active')) {
                searchInput.focus();
            }
        });
    }

});

