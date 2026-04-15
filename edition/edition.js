const tcgdex = new TCGdex('pt');

const telaListaEdicoes = document.getElementById('grid-editions');
const telaCartasEdicao = document.getElementById('grid-cartas-edicao');

if (telaListaEdicoes) {
    carregarTodasEdicoes();
} else if (telaCartasEdicao) {
    carregarCartasDaEdicao();
}

// ==========================================
// FUNÇÃO 1: PARA A TELA "edition.html"
// ==========================================
async function carregarTodasEdicoes() {
    telaListaEdicoes.innerHTML = Array(20).fill('<div class="skeleton-edition"></div>').join('');

    try {
        const edicoes = await tcgdex.fetchSets();
        const todasEdicoes = edicoes.filter(e => e.logo !== undefined).reverse();
        
        telaListaEdicoes.innerHTML = ''; 

        todasEdicoes.forEach(edicao => {
            const cardLink = document.createElement('a');
            cardLink.href = `edition-cards.html?set=${edicao.id}`;
            cardLink.className = 'edition-card';
            
            // Salva posição ao clicar
            cardLink.addEventListener('click', () => {
                sessionStorage.setItem('scrollSalvo', window.scrollY);
            });

            cardLink.innerHTML = `
                <img src="${edicao.logo}.webp" alt="Logo ${edicao.name}" class="edition-logo" loading="lazy">
                <span class="edition-name">${edicao.name}</span>
            `;
            
            telaListaEdicoes.appendChild(cardLink);
        });

        // Restaura posição ao voltar
        setTimeout(() => {
            const scrollAntigo = sessionStorage.getItem('scrollSalvo');
            if (scrollAntigo) {
                window.scrollTo({ top: parseInt(scrollAntigo), behavior: 'instant' });
                sessionStorage.removeItem('scrollSalvo'); 
            }
        }, 100);

    } catch (erro) {
        telaListaEdicoes.innerHTML = '<p style="color: white; grid-column: span 4; text-align: center;">Erro ao carregar as edições.</p>';
    }
}

// ==========================================
// FUNÇÃO 2: PARA A TELA "edition-cards.html"
// ==========================================
async function carregarCartasDaEdicao() {
    const params = new URLSearchParams(window.location.search);
    const setId = params.get('set');
    const headerInfo = document.getElementById('set-header');
    
    telaCartasEdicao.innerHTML = Array(15).fill('<div class="skeleton-card"></div>').join('');

    try {
        const detalhesDaEdicao = await tcgdex.set.get(setId);
        
        // Botão alinhado à esquerda, e a div central (logo + texto) centralizada perfeitamente
        headerInfo.innerHTML = `
            <a href="edition.html" class="btn-voltar" style="text-decoration: none; display: inline-flex; gap: 8px; align-items: center; color: #d3c7d6; border: 1px solid #d3c7d6; padding: 8px 16px; border-radius: 20px; transition: 0.2s;">
                <i class="fa-solid fa-arrow-left"></i> Voltar para Edições
            </a>
            
            <div style="text-align: center; margin-top: 10px;">
                <img src="${detalhesDaEdicao.logo}.webp" alt="Logo da edição" style="max-height: 140px; margin-bottom: 15px;">
                <h1 style="font-size: 28px; color: white;">${detalhesDaEdicao.name}</h1>
                <p style="color: #d3c7d6; margin-top: 5px;">${detalhesDaEdicao.cardCount.total} cartas na coleção</p>
            </div>
        `;

        telaCartasEdicao.innerHTML = '';
        const cartas = detalhesDaEdicao.cards.filter(c => c.image !== undefined);

        cartas.forEach(carta => {
            const img = document.createElement('img');
            img.src = `${carta.image}/high.webp`; 
            img.title = carta.name;
            img.className = 'tcg-card';
            img.loading = "lazy"; 
            telaCartasEdicao.appendChild(img);
        });

    } catch (erro) {
        telaCartasEdicao.innerHTML = '<p style="color: white; grid-column: span 5; text-align: center;">Erro ao carregar cartas desta edição.</p>';
    }
}