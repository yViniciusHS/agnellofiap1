document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Splash Screen (Animação de entrada)
    const introOverlay = document.querySelector(".intro-overlay");
    if(introOverlay) {
        if (typeof gsap !== 'undefined') {
            document.body.style.overflow = 'hidden';
            const tl = gsap.timeline();
            tl.to(".intro-logo", { opacity: 0, scale: 0.85, duration: 1.2, delay: 0.6, ease: "power2.inOut" })
              .to(".intro-overlay", { yPercent: -100, duration: 1.2, ease: "power3.inOut" }, "-=0.2")
              .from(".hero-content", { 
                  opacity: 0, 
                  y: 30, 
                  duration: 1, 
                  onComplete: () => document.body.style.overflow = 'auto' 
              }, "-=0.8");
        } else {
            introOverlay.style.display = 'none';
        }
    }

    // 2. Gráfico Radar do Sommelier (Página de Produto)
    const ctx = document.getElementById('flavorRadarChart');
    if (ctx && typeof Chart !== 'undefined') {
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Corpo', 'Taninos', 'Álcool', 'Acidez', 'Doçura'],
                datasets: [{
                    data: [8, 7, 6, 4, 1], 
                    backgroundColor: 'rgba(227, 210, 171, 0.3)', 
                    borderColor: '#c9b993', 
                    pointBackgroundColor: '#2b0b10'
                }]
            },
            options: { 
                scales: { r: { ticks: { display: false }, grid: { color: 'rgba(0,0,0,0.05)' } } }, 
                plugins: { legend: { display: false } } 
            }
        });
    }

    // 3. Sistema de Abas (Página de Perfil)
    const profileTabs = document.querySelectorAll('.profile-tab-link');
    profileTabs.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            
            // Remove ativo de todos
            profileTabs.forEach(l => l.classList.remove('active', 'bg-dark', 'text-white'));
            document.querySelectorAll('.profile-tab-content').forEach(c => c.classList.add('d-none'));
            
            // Adiciona ativo ao clicado
            link.classList.add('active', 'bg-dark', 'text-white');
            const targetContent = document.getElementById(targetId);
            if(targetContent) targetContent.classList.remove('d-none');
        });
    });

    // 4. Busca Expansível (Header)
    const searchToggleBtn = document.getElementById('searchToggleBtn');
    const expandableSearch = document.querySelector('.expandable-search');
    const searchInput = document.getElementById('searchInput');

    if (searchToggleBtn && expandableSearch) {
        searchToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            expandableSearch.classList.toggle('active');
            if (expandableSearch.classList.contains('active')) {
                searchInput.focus();
            }
        });
    }
});

// --- SISTEMA DE CARRINHO (Global) ---
let carrinho = [];
let total = 0;

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    total += preco;
    
    atualizarInterfaceCarrinho();
    
    // Abre o menu lateral do carrinho automaticamente (Bootstrap Offcanvas)
    const cartEl = document.getElementById('cartOffcanvas');
    if (cartEl) {
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(cartEl);
        bsOffcanvas.show();
    }
}

function atualizarInterfaceCarrinho() {
    const totalEl = document.getElementById('cartTotal');
    const badgeEl = document.querySelector('.cart-btn');
    const cartBody = document.querySelector('.offcanvas-body-items'); // Certifique-se de ter essa div no HTML
    
    // Atualiza o valor total no rodapé do carrinho
    if (totalEl) totalEl.innerText = `Total: R$ ${total.toFixed(2)}`;
    
    // Atualiza o botão do header (Preço e quantidade)
    if (badgeEl) {
        badgeEl.innerHTML = `<i class="bi bi-cart2"></i> R$ ${total.toFixed(2)} (${carrinho.length})`;
    }
    
    // Lista os itens dentro do carrinho
    if (cartBody) {
        if (carrinho.length === 0) {
            cartBody.innerHTML = '<p class="text-muted text-center py-4">Seu carrinho está vazio.</p>';
        } else {
            cartBody.innerHTML = carrinho.map((item, index) => `
                <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2 animate__animated animate__fadeIn">
                    <div>
                        <span class="d-block fw-bold small text-dark">${item.nome}</span>
                        <span class="text-muted" style="font-size: 0.75rem;">1 unidade</span>
                    </div>
                    <span class="fw-bold small">R$ ${item.preco.toFixed(2)}</span>
                </div>
            `).join('');
        }
    }
}