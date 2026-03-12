// 1. Banco de Dados dos Produtos (Template Dinâmico)
const vinhosData = {
    "sip-happens": {
        nome: "Dona Isabella Chadonnay",
        preco: 142.00,
        tag: "BRANCO",
        classeTag: "branco",
        pais: "Chile",
        regiao: "Vale de Casablanca",
        imagem: "../img/Gemini_Generated_Image_qdhdkwqdhdkwqdhd (1).png",
        descricao: "Um vinho branco orgânico refrescante, com notas cítricas de maçã verde e um frescor inigualável para dias ensolarados.",
        producao: "Produzido com uvas Chardonnay cultivadas sem agrotóxicos em solos calcários. Fermentação em inox para preservar a pureza da fruta.",
        grafico: [4, 2, 5, 8, 3] // Corpo, Taninos, Álcool, Acidez, Doçura
    },
    "valle-andino": {
        nome: "Valle Andino Reserva",
        preco: 185.00,
        tag: "TINTO",
        classeTag: "tinto",
        pais: "Argentina",
        regiao: "Mendoza (Uco)",
        imagem: "../img/Gemini_Generated_Image_qxx5exqxx5exqxx5 (1).png",
        descricao: "Um Cabernet Sauvignon robusto e encorpado, maturado em barricas de carvalho francês com taninos sedosos.",
        producao: "Vinhas de altitude que garantem maturação lenta. Estagiou 12 meses em madeira para complexidade de tabaco e cacau.",
        grafico: [8, 7, 6, 4, 1]
    },
    "sapphire-sunset": {
        nome: "Encanto Provençal",
        preco: 160.00,
        tag: "ROSÉ",
        classeTag: "rose",
        pais: "França",
        regiao: "Provence",
        imagem: "../img/Gemini_Generated_Image_42b1mg42b1mg42b1 (1).png",
        descricao: "Leve e vibrante, este rosé traz a essência das frutas silvestres e flores brancas em cada gole.",
        producao: "Elaborado pelo método de sangria com uvas Syrah colhidas manualmente à noite para manter a acidez vibrante.",
        grafico: [3, 1, 5, 6, 4]
    }
};

document.addEventListener("DOMContentLoaded", function() {
    
    // 2. Splash Screen (Animação de entrada)
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

    // 3. Carregamento Dinâmico da Página de Produto
    if (window.location.pathname.includes('produto.html')) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const produto = vinhosData[id];

        if (produto) {
            // Preenche textos e imagens básicas
            if(document.getElementById('product-name')) document.getElementById('product-name').innerText = produto.nome;
            if(document.getElementById('product-price')) document.getElementById('product-price').innerText = `R$ ${produto.preco.toFixed(2)}`;
            if(document.getElementById('product-desc')) document.getElementById('product-desc').innerText = produto.descricao;
            if(document.getElementById('product-prod')) document.getElementById('product-prod').innerText = produto.producao;
            if(document.getElementById('product-img')) document.getElementById('product-img').src = produto.imagem;
            
            // Novos Campos: País e Região
            if(document.getElementById('product-country')) document.getElementById('product-country').innerText = produto.pais;
            if(document.getElementById('product-region')) document.getElementById('product-region').innerText = produto.regiao;
            if(document.getElementById('product-origin')) {
                document.getElementById('product-origin').innerText = `${produto.tag} • ${produto.pais} (${produto.regiao})`;
            }

            // Ajusta a Tag Visual
            const tagEl = document.getElementById('product-tag');
            if (tagEl) {
                tagEl.innerText = produto.tag;
                tagEl.className = `tag ${produto.classeTag} mb-3 d-inline-block`;
            }

            // Configura o botão de compra
            const buyBtn = document.getElementById('add-to-cart-btn');
            if (buyBtn) {
                buyBtn.onclick = () => adicionarAoCarrinho(produto.nome, produto.preco);
            }

            // 4. Inicializa o Gráfico Radar
            const ctx = document.getElementById('flavorRadarChart');
            if (ctx && typeof Chart !== 'undefined') {
                new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: ['Corpo', 'Taninos', 'Álcool', 'Acidez', 'Doçura'],
                        datasets: [{
                            data: produto.grafico, 
                            backgroundColor: 'rgba(201, 185, 147, 0.2)', 
                            borderColor: '#c9b993', 
                            pointBackgroundColor: '#2b0b10',
                            borderWidth: 2
                        }]
                    },
                    options: { 
                        scales: { 
                            r: { 
                                min: 0,
                                max: 10,
                                ticks: { display: false }, 
                                grid: { color: 'rgba(0,0,0,0.05)' },
                                pointLabels: { font: { size: 11, family: 'Inter' } }
                            } 
                        }, 
                        plugins: { legend: { display: false } },
                        maintainAspectRatio: false
                    }
                });
            }
        }
    }

    // 5. Sistema de Abas (Página de Perfil)
    const profileTabs = document.querySelectorAll('.profile-tab-link');
    profileTabs.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            profileTabs.forEach(l => l.classList.remove('active', 'bg-dark', 'text-white'));
            document.querySelectorAll('.profile-tab-content').forEach(c => c.classList.add('d-none'));
            link.classList.add('active', 'bg-dark', 'text-white');
            const targetContent = document.getElementById(targetId);
            if(targetContent) targetContent.classList.remove('d-none');
        });
    });

    // 6. Busca Expansível (Header)
    const searchToggleBtn = document.getElementById('searchToggleBtn');
    const expandableSearch = document.querySelector('.expandable-search');
    const searchInput = document.getElementById('searchInput');

    if (searchToggleBtn && expandableSearch) {
        searchToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            expandableSearch.classList.toggle('active');
            if (expandableSearch.classList.contains('active') && searchInput) {
                searchInput.focus();
            }
        });
    }

    // 7. Lógica de Filtros na Vitrine (Index)
    const filtrosBotao = document.querySelectorAll('.filter-btn');
    const cardsVinho = document.querySelectorAll('.product-card');

    filtrosBotao.forEach(botao => {
        botao.addEventListener('click', (e) => {
            e.preventDefault();
            const categoria = botao.getAttribute('data-filter');

            cardsVinho.forEach(card => {
                const tag = card.querySelector('.tag');
                if (categoria === 'all' || tag.classList.contains(categoria)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            const vitrineSection = document.getElementById('vitrine');
            if(vitrineSection) vitrineSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// --- SISTEMA DE CARRINHO (Global) ---
let carrinho = [];
let total = 0;

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    total += preco;
    atualizarInterfaceCarrinho();
    
    const cartEl = document.getElementById('cartOffcanvas');
    if (cartEl) {
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(cartEl);
        bsOffcanvas.show();
    }
}

function atualizarInterfaceCarrinho() {
    const totalEl = document.getElementById('cartTotal');
    const badgeEl = document.querySelector('.cart-btn');
    const cartBody = document.querySelector('.offcanvas-body-items'); 
    
    if (totalEl) totalEl.innerText = `Total: R$ ${total.toFixed(2)}`;
    if (badgeEl) {
        badgeEl.innerHTML = `<i class="bi bi-cart2"></i> R$ ${total.toFixed(2)} (${carrinho.length})`;
    }
    
    if (cartBody) {
        if (carrinho.length === 0) {
            cartBody.innerHTML = '<p class="text-muted text-center py-4">Seu carrinho está vazio.</p>';
        } else {
            cartBody.innerHTML = carrinho.map((item) => `
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