# 🃏 PokéTCG Wiki

Uma aplicação web interativa, moderna e totalmente responsiva dedicada ao universo de Pokémon Trading Card Game (TCG). O projeto une lógica de programação, consumo de APIs e um design premium focado na experiência do usuário (UI/UX).

Clique nesse link para acessar o site: https://isardrgs.github.io/poketcg-wiki/
---

## 📖 O que você encontra por aqui?

O site foi criado para ser um guia rápido e divertido para fãs de Pokémon. Nele, os usuários podem:
- **Pesquisar Cartas:** Buscar qualquer carta ou Pokémon rapidamente usando a barra de pesquisa conectada ao banco de dados oficial.
- **Explorar Cartas Famosas:** Navegar por uma seção dedicada às cartas mais icônicas, raras e marcantes da franquia.
- **Jogar o PokéQuiz:** Testar os conhecimentos sobre o universo Pokémon em um jogo de perguntas e respostas divertido e dinâmico.

---

## 🚀 Funcionalidades Principais

- **🔍 Busca Global Inteligente:** Sistema de pesquisa integrado em todas as páginas utilizando o SDK da TCGdex. Permite buscar tanto pelo nome do Pokémon quanto pelo nome específico da carta, com tratamento de erros de caixa (case-insensitive) e carregamento otimizado.
- **✨ Cabeçalho Dinâmico (Glassmorphism):** Menu fixo (`position: sticky`) que inicia totalmente transparente e ganha um fundo escuro com desfoque elegante (`backdrop-filter: blur`) de forma suave assim que o usuário rola a página.
- **📱 Responsividade Mobile Premium:** Layout completamente adaptado para celulares. A grade de exibição de cartas e edições se ajusta automaticamente de 5 colunas no desktop para **2 colunas no mobile**. Configuração de viewport travada para impedir zoom-out acidental, mantendo a consistência do design.
- **🎮 PokéQuiz Interativo:** Um jogo de perguntas e respostas integrado nativamente.
  - **Embaralhamento Inteligente:** Utiliza o algoritmo clássico *Fisher-Yates* para misturar tanto as perguntas quanto as alternativas a cada nova rodada.
  - **Fator Replay:** Sorteia um subconjunto de 5 perguntas de um banco maior a cada partida.
  - **Alta Performance:** Transições rápidas e dinâmicas (600ms) entre as perguntas após a validação visual da resposta (verde para correto, vermelho para incorreto).
- **⌨️ Animação Retro Pixel:** Tela inicial estilizada com efeito de digitação *typewriter* multilinhas dinâmico usando CSS Keyframes puro sincronizado com a fonte temática `Press Start 2P`.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as melhores práticas de desenvolvimento front-end nativo, sem frameworks pesados, garantindo leveza e velocidade:

- **HTML5:** Estruturação semântica de todas as páginas.
- **CSS3 Avançado:**
  - **CSS Grid & Flexbox:** Para o alinhamento preciso das cartas em grids adaptáveis de 5 e 2 colunas.
  - **Media Queries:** Para garantir uma experiência impecável em qualquer tamanho de tela (Mobile First).
  - **Animações Customizadas:** Controle de quadros e larguras baseadas na unidade `ch` para o efeito de digitação.
- **JavaScript (ES6+):**
  - Manipulação assíncrona do DOM.
  - Consumo de API via `Async/Await`.
  - Implementação de algoritmos de ordenação e aleatoriedade (Fisher-Yates Shuffle).
  - Delegação de eventos para otimização de performance.
- **TCGdex SDK:** API oficial utilizada para buscar o catálogo completo de cartas Pokémon em português.
- **Font Awesome:** Ícones vetoriais modernos para a barra de pesquisa e navegação.
- **Google Fonts:** Utilização das fontes `Space Grotesk` (moderna/leitura) e `Press Start 2P` (estilo pixel art retro).

---

## 📦 Estrutura do Projeto

A arquitetura de arquivos foi planejada para manter uma separação clara de responsabilidades:

```text
├── 📁 cartas/          # Página e estilos da seção de cartas famosas
├── 📁 edition/         # Páginas, listagens e estilos das edições/coleções
├── 📁 images/          # Assets estáticos (Logo SVG, ícones)
├── 📁 quiz/            # Estrutura isolada do jogo PokéQuiz (HTML, CSS, JS)
├── 📄 busca.html       # Tela de resultados da pesquisa global
├── 📄 busca.js         # Lógica de integração e filtros com a TCGdex API
├── 📄 global.js        # O "cérebro" do site (escuta o scroll do header e o input de busca)
├── 📄 index.html       # Página de entrada (Hero Section com animação pixel)
└── 📄 style.css        # Estilos globais, reset e variáveis de cores do projeto
