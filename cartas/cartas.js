// Instancia o SDK em inglês ('en') para garantir o maior banco de dados
const tcgdex = new TCGdex('en');

async function carregarCartasFamosas() {
    const grid = document.getElementById('grid-cartas');
    
    // 1. Gera 20 "esqueletos" cinzas para dar feedback visual enquanto carrega (5 colunas x 4 linhas)
    grid.innerHTML = Array(20).fill('<div class="skeleton-card"></div>').join('');

    // 2. Lista blindada com 20 IDs garantidos pela API do TCGdex
    const cartasValiosasIDs = [
        'base1-4',     // Charizard (Base Set)
        'base1-2',     // Blastoise (Base Set)
        'base1-15',    // Venusaur (Base Set)
        'base1-10',    // Mewtwo (Base Set)
        'base1-6',     // Gyarados (Base Set)
        
        'swsh7-215',   // Umbreon VMAX (Evolving Skies - Alt Art)
        'swsh7-218',   // Rayquaza VMAX (Evolving Skies - Alt Art)
        'swsh11-186',  // Giratina V (Lost Origin - Alt Art)
        'swsh12-186',  // Lugia V (Silver Tempest - Alt Art)
        'swsh8-271',   // Gengar VMAX (Fusion Strike - Alt Art)
        
        'swsh10-172',  // Machamp V (Astral Radiance - Alt Art)
        'swsh9-166',   // Arceus V (Brilliant Stars - Alt Art)
        'swsh6-201',   // Blaziken VMAX (Chilling Reign - Alt Art)
        'swsh4-188',   // Pikachu VMAX (Vivid Voltage - Secret)
        'swsh3-20',    // Charizard VMAX (Darkness Ablaze)
        
        'sm9-170',     // Latias & Latios-GX (Team Up - Alt Art)
        'sm3-150',     // Charizard GX (Burning Shadows - Secret)
        'neo1-9',      // Lugia (Neo Genesis)
        'neo1-1',      // Ampharos (Neo Genesis)
        'neo1-17'      // Typhlosion (Neo Genesis)
    ];

    try {
        // 3. Pede para a API buscar todas as 20 cartas ao mesmo tempo
        const promessas = cartasValiosasIDs.map(id => tcgdex.card.get(id));
        const resultados = await Promise.allSettled(promessas);
        
        // Limpa os retângulos cinzas
        grid.innerHTML = ''; 

        // 4. Cria as imagens dinamicamente
        resultados.forEach(resultado => {
            if (resultado.status === 'fulfilled' && resultado.value && resultado.value.image) {
                const carta = resultado.value;
                const img = document.createElement('img');
                
                img.src = `${carta.image}/high.webp`; 
                img.alt = carta.name;
                img.title = carta.name; 
                img.className = 'tcg-card';
                
                grid.appendChild(img);
            }
        });

    } catch (erro) {
        console.error("Erro no carregamento principal:", erro);
        grid.innerHTML = '<p style="color: white; grid-column: span 5; text-align: center;">Erro ao carregar o cofre de cartas valiosas.</p>';
    }
}

// Inicia a função
carregarCartasFamosas();