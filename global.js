document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SISTEMA DE BUSCA GLOBAL
    // ==========================================
    const searchInputs = document.querySelectorAll('.input-group input');
    const searchBtns = document.querySelectorAll('.cta-btn');

    function realizarBusca(termo) {
        if (termo) {
            // Pega o caminho atual da URL em minúsculo para evitar erros no GitHub
            const caminhoAtual = window.location.pathname.toLowerCase();
            
            // Verifica se a pessoa está nas subpastas
            const estamosNaSubpasta = caminhoAtual.includes('/cartas/') || caminhoAtual.includes('/edition/');
            
            // Se estiver na subpasta, usa o ../ para voltar para a raiz
            const prefixo = estamosNaSubpasta ? '../' : '';
            
            // Redireciona para a tela de busca levando a palavra
            window.location.href = `${prefixo}busca.html?q=${encodeURIComponent(termo)}`;
        }
    }

    // Clique no botão de pesquisar
    searchBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Usa o index para achar o input correspondente àquele botão
            if (searchInputs[index]) {
                const termo = searchInputs[index].value.trim();
                realizarBusca(termo);
            }
        });
    });

    // Apertar o Enter no teclado
    searchInputs.forEach((input) => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                realizarBusca(input.value.trim());
            }
        });
    });

    // ==========================================
    // 2. EFEITO DO MENU (CABEÇALHO DE VIDRO)
    // ==========================================
    const header = document.querySelector('.top-header');
    
    // Só adiciona o efeito se o cabeçalho existir na página
    if (header) {
        window.addEventListener('scroll', () => {
            // Se a tela desceu mais de 20 pixels, ativa o fundo borrado
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                // Se voltou pro topo, fica transparente de novo
                header.classList.remove('scrolled');
            }
        });
    }


    

});