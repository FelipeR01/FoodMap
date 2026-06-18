/* =====================================================
   FOODMAP — Mapa de Doações
   Responsável por:
   - Inicializar o mapa Leaflet
   - Desenhar marcadores clicáveis a partir dos dados
   - Filtrar marcadores E cards ao mesmo tempo (Todos / Doadores / Urgentes)
   ===================================================== */

/* ─────────────────────────────────────────────────────
   1. OS DADOS
   Cada objeto é um ponto no mapa. No futuro, isso virá de
   um cadastro real; por enquanto são dados de demonstração.
   ───────────────────────────────────────────────────── */
const pontos = [
  {
    id: 1,
    tipo: "doador",              // doador | urgente
    nome: "Refeições Prontas",
    origem: "Restaurante Sabor Bom",
    oferta: "15 marmitas para consumo imediato",
    lat: -23.5614,              // latitude (posição no mapa)
    lng: -46.6559,             // longitude
  },
  {
    id: 2,
    tipo: "urgente",
    nome: "Itens de Cesta Básica",
    origem: "Abrigo Esperança",
    oferta: "Necessita: Arroz (50kg), Feijão (20kg) e Óleo (15L)",
    lat: -23.5895,
    lng: -46.6333,
  },
  {
    id: 3,
    tipo: "doador",
    nome: "Hortaliças e Verduras",
    origem: "Hortifrúti Central",
    oferta: "30kg de hortaliças — retirada hoje",
    lat: -23.5320,
    lng: -46.6410,
  },
  {
    id: 4,
    tipo: "doador",
    nome: "Pães e Frios",
    origem: "Padaria União",
    oferta: "8kg de pães — consumo imediato",
    lat: -23.5700,
    lng: -46.6900,
  },
];

/* ─────────────────────────────────────────────────────
   Aguarda a página carregar antes de mexer no mapa
   ───────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {

  /* 2. INICIALIZA O MAPA Cria o mapa dentro da div #mapa, centrado em São Paulo*/
  const mapa = L.map("mapa").setView([-23.5614, -46.6559], 12);

  // Camada visual do mapa (as "ruas"). Vem do OpenStreetMap (gratuito).
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(mapa);

  /*3. CRIA OS MARCADORES A PARTIR DOS DADOS
     Para cada ponto, cria um marcador clicável no mapa.
     Guardamos o marcador junto do seu tipo, para filtrar depois.
     --------------------------------------------------- */
  const marcadores = []; // vai guardar { tipo, marker }

  pontos.forEach(function (ponto) {
    // Cria o marcador na posição [lat, lng]
    const marker = L.marker([ponto.lat, ponto.lng]);

    // Define o que aparece no popup quando clica no marcador
    const popupHtml =
      "<strong>" + ponto.nome + "</strong><br>" +
      '<span style="color:#006b30;">' + ponto.origem + "</span><br>" +
      ponto.oferta +
      (ponto.tipo === "urgente"
        ? '<br><strong style="color:#ba1a1a;">⚠ ALERTA CRÍTICO</strong>'
        : "");
    marker.bindPopup(popupHtml);

    // Coloca o marcador no mapa
    marker.addTo(mapa);

    // Guarda o marcador junto do seu tipo (usaremos no filtro)
    marcadores.push({ tipo: ponto.tipo, marker: marker });
  });

  /* ---------------------------------------------------
     4. O FILTRO
     Pega todos os botões de filtro e os cards do painel.
     Ao clicar num botão, mostra/esconde marcadores e cards
     que combinam com o filtro escolhido.
     --------------------------------------------------- */
  const botoes = document.querySelectorAll(".filtro-btn");
  const cards = document.querySelectorAll(".card-doacao");

  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {

      // Lê o filtro escolhido do atributo data-filtro do botão
      const filtro = botao.getAttribute("data-filtro"); // todos | doador | urgente

      // ── Atualiza o visual do botão ativo ──
      botoes.forEach(function (b) {
        b.classList.remove("filtro-btn-ativo");
      });
      botao.classList.add("filtro-btn-ativo");

      // ── Filtra os MARCADORES do mapa ──
      marcadores.forEach(function (item) {
        const combina = filtro === "todos" || item.tipo === filtro;
        if (combina) {
          item.marker.addTo(mapa);       // mostra
        } else {
          mapa.removeLayer(item.marker); // esconde
        }
      });

      // ── Filtra os CARDS do painel ──
      cards.forEach(function (card) {
        const tipoCard = card.getAttribute("data-tipo");
        const combina = filtro === "todos" || tipoCard === filtro;
        card.style.display = combina ? "" : "none";
      });
    });
  });
});
