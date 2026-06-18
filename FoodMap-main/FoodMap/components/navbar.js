/* =====================================================
   FOODMAP — Navbar (injeção dinâmica)
   ===================================================== */

(function () {
  // ── 1. Detecta se estamos em /pages/ ou na raiz ──
  // quando estamos dentro de /pages/, subimos um nivel com ../
  // quando estamos na raiz, ficamos em ./
  // os links das paginas SEMPRE apontam para pages/ pois todos os htmls estao la
  const isPages = window.location.pathname.includes('/pages/');
  const root    = isPages ? '../' : './';
  const pages   = 'pages/'; // todos os htmls ficam em /pages/, independente de onde estamos

  // ── 2. HTML do navbar ──
  const html = `
    <nav class="navbar">
      <a href="${root}index.html" class="navbar__logo">FOODMAP</a>

      <ul class="navbar__nav">
        <li><a href="${root}index.html"                   data-page="index">Início</a></li>
        <li><a href="${root}${pages}como-funciona.html"   data-page="como-funciona">Como Funciona</a></li>
        <li><a href="${root}${pages}mapa.html"            data-page="mapa">Mapa</a></li>
        <li><a href="${root}${pages}Sobre.html"       data-page="sobre">Sobre</a></li> 
        <li><a href="${root}${pages}contato.html"         data-page="contato">Fale Conosco</a></li>
      </ul>

      <a href="${root}${pages}mapa.html" class="navbar__cta">Quero Doar</a>

      <button class="navbar__toggle" aria-label="Abrir menu" aria-expanded="false">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6"  x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </nav>
  `;

  // ── 3. Injeta no DOM ──
  const navBar = document.getElementById('nav-bar');
  if (navBar) navBar.innerHTML = html;

  // ── 4. Marca link ativo pela URL atual ──
  const path = window.location.pathname;

  const map = {
    'index'        : /index\.html|\/$/,
    'como-funciona': /como-funciona/,
    'mapa'         : /mapa/,
    'sobre'        : /sobre/,
    'contato'      : /contato/,
  };

  document.querySelectorAll('.navbar__nav a').forEach(link => {
    const page  = link.dataset.page;
    const regex = map[page];
    if (regex && regex.test(path)) {
      link.classList.add('active');
    }
  });

  // ── 5. Hamburguer (mobile) ──
  const toggle = document.querySelector('.navbar__toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = navBar.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Fecha ao clicar em qualquer link do menu
    document.querySelectorAll('.navbar__nav a').forEach(link => {
      link.addEventListener('click', () => {
        navBar.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
      });
    });
  }
})();
