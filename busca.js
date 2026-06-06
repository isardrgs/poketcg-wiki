// busca.js
const tcgdex = new TCGdex('pt');

async function buscarCartas() {
    // Pega a palavra que veio na URL (Ex: busca.html?q=Pikachu)
    const params = new URLSearchParams(window.location.search);
    const termo = params.get('q');
    
    const titulo = document.getElementById('titulo-busca');
    const grid = document.getElementById('grid-busca');

    if (!termo) {
        titulo.innerHTML = "Digite o nome de um Pokémon na barra de pesquisa!";
        return;
    }

    titulo.innerHTML = `Pesquisando por: "${termo}"...`;
    // Coloca os esqueletos enquanto carrega
    grid.innerHTML = Array(15).fill('<div class="skeleton-card"></div>').join('');

    try {
        // Baixa o índice de cartas (é um processo muito rápido da API)
        const todasCartas = await tcgdex.fetchCards();
        
        // Filtro nativo: transforma tudo em minúsculo para a busca ser à prova de erros
        const resultados = todasCartas.filter(carta => 
            carta.name.toLowerCase().includes(termo.toLowerCase()) && carta.image !== undefined
        );

        grid.innerHTML = ''; // Limpa os esqueletos

        if (resultados.length === 0) {
            titulo.innerHTML = `Nenhum resultado encontrado para "${termo}".`;
            grid.innerHTML = '<p style="color: white; grid-column: span 5; text-align: center;">Tente pesquisar com outro nome.</p>';
            return;
        }

        titulo.innerHTML = `${resultados.length} resultados encontrados para "${termo}"`;

        // Cria as imagens na tela (Exibindo um limite inicial de 50 para não travar o navegador)
        const limiteResultados = resultados.slice(0, 50);
        
        limiteResultados.forEach(carta => {
            const img = document.createElement('img');
            img.src = `${carta.image}/high.webp`;
            img.title = carta.name;
            img.className = 'tcg-card';
            img.loading = 'lazy';
            
            grid.appendChild(img);
        });

    } catch (erro) {
        titulo.innerHTML = "Erro ao conectar com o banco de dados.";
        grid.innerHTML = '';
        console.error("Erro na busca:", erro);
    }
}

buscarCartas();