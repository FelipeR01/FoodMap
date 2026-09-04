import { useState, useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '../css/mapa.css'
import { useDoacoes } from '../context/DoacoesContext.jsx'

/* Leaflet monta sozinho o caminho das imagens do pino, e esse caminho
   não existe depois do build do Vite — por isso o pino fica quebrado.
   O delete abaixo desliga esse cálculo automático, e aí o Leaflet passa
   a usar exatamente os arquivos importados aqui. */
import iconePino from 'leaflet/dist/images/marker-icon.png'
import iconePino2x from 'leaflet/dist/images/marker-icon-2x.png'
import sombraPino from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconUrl: iconePino,
  iconRetinaUrl: iconePino2x,
  shadowUrl: sombraPino,
})

/* =====================================================
   FOODMAP — Mapa de Doações

   Mesma página do antigo pages/mapa.html + js/mapa.js.
   A diferença é que os pinos do mapa e os cards do painel
   agora vêm da MESMA lista (o contexto de doações), então
   toda doação cadastrada aparece nos dois lugares.
   ===================================================== */

export default function Mapa() {
  const { doacoes } = useDoacoes()

  // Filtro escolhido nos botões: todos | doador | urgente
  const [filtro, setFiltro] = useState('todos')

  // Guarda qual card foi clicado, para destacá-lo na lista
  const [doacaoSelecionada, setDoacaoSelecionada] = useState(null)

  // Guardam o mapa e a camada de pinos entre as renderizações
  const mapaRef = useRef(null)
  const camadaPinosRef = useRef(null)

  // Guarda cada marcador pelo id da doação, para achar depois no clique do card
  const marcadoresRef = useRef({})

  // Aplica o filtro na lista (vale para os pinos e para os cards)
  const doacoesFiltradas = doacoes.filter(function (doacao) {
    return filtro === 'todos' || doacao.tipo === filtro
  })

  /* 1. CRIA O MAPA — roda uma vez só, quando a página abre */
  useEffect(function () {
    // Cria o mapa dentro da div #mapa, centrado em São Paulo
    const mapa = L.map('mapa').setView([-23.5614, -46.6559], 12)

    // Camada visual do mapa (as "ruas"). Vem do OpenStreetMap (gratuito).
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(mapa)

    // Camada separada só para os pinos, para poder limpar e redesenhar
    const camadaPinos = L.layerGroup().addTo(mapa)

    mapaRef.current = mapa
    camadaPinosRef.current = camadaPinos

    // Ao sair da página, destrói o mapa para não sobrar nada na memória
    return function () {
      mapa.remove()
      mapaRef.current = null
      camadaPinosRef.current = null
    }
  }, [])

  /* 2. DESENHA OS PINOS — roda de novo sempre que a lista
        de doações filtradas mudar (filtro clicado ou
        doação nova cadastrada) */
  useEffect(
    function () {
      const camadaPinos = camadaPinosRef.current
      if (!camadaPinos) return

      // Limpa os pinos antigos antes de desenhar os novos
      camadaPinos.clearLayers()
      marcadoresRef.current = {}

      doacoesFiltradas.forEach(function (doacao) {
        // Cria o marcador na posição [lat, lng]
        const marcador = L.marker([doacao.lat, doacao.lng])

        // Define o que aparece no popup quando clica no marcador
        const popupHtml =
          '<img class="popup-imagem" src="/assets/' +
          doacao.icone +
          '" alt="">' +
          '<strong>' +
          doacao.nome +
          '</strong><br>' +
          '<span style="color:#006b30;">' +
          doacao.origem +
          '</span><br>' +
          doacao.oferta +
          (doacao.tipo === 'urgente'
            ? '<br><strong style="color:#ba1a1a;">⚠ ALERTA CRÍTICO</strong>'
            : '')

        marcador.bindPopup(popupHtml)
        marcador.addTo(camadaPinos)

        // Guarda o marcador pelo id, para o clique no card conseguir achá-lo
        marcadoresRef.current[doacao.id] = marcador
      })
    },
    // Só redesenha quando a lista ou o filtro mudam de verdade.
    // Se dependesse da lista já filtrada, redesenharia a cada clique
    // e apagaria o marcador antes do popup abrir.
    [doacoes, filtro]
  )

  /* 3. CLIQUE NO CARD
        Move o mapa até a doação clicada e abre o popup dela. */
  function focarNoMapa(doacao) {
    const mapa = mapaRef.current
    const marcador = marcadoresRef.current[doacao.id]
    if (!mapa || !marcador) return

    // Marca o card como selecionado para destacá-lo na lista
    setDoacaoSelecionada(doacao.id)

    // Se a pessoa rolou a página e o mapa saiu da tela, traz ele de volta.
    // Com "nearest" a página só rola quando é realmente necessário.
    mapa.getContainer().scrollIntoView({ behavior: 'smooth', block: 'nearest' })

    // Desliza o mapa até o ponto, aproxima o zoom e abre o popup
    mapa.flyTo([doacao.lat, doacao.lng], 15)
    marcador.openPopup()
  }

  return (
    <>
      {/* titulo da pagina */}
      <section className="mapa-hero">
        <div className="container">
          <h1 className="mapa-hero-titulo">
            <img src="/assets/radar_23152.png" alt="Ícone do título" />
            Inteligência Logística e Distribuição
          </h1>
          <p className="mapa-hero-descricao">
            Nossa plataforma de geolocalização processa dados em tempo real para
            otimizar o fluxo de doações alimentares. Monitoramos áreas de
            vulnerabilidade crítica e conectamos excedentes com precisão,
            garantindo que os recursos cheguem onde são mais necessários,
            minimizando perdas logísticas e maximizando o impacto social.
          </p>
        </div>
      </section>

      {/* barra de filtros */}
      <section className="mapa-filtros">
        <div className="container filtros-bar">
          <div className="filtros-botoes">
            <button
              className={
                filtro === 'todos' ? 'filtro-btn filtro-btn-ativo' : 'filtro-btn'
              }
              onClick={function () {
                setFiltro('todos')
              }}
            >
              Todos
            </button>
            <button
              className={
                filtro === 'doador'
                  ? 'filtro-btn filtro-btn-ativo'
                  : 'filtro-btn'
              }
              onClick={function () {
                setFiltro('doador')
              }}
            >
              Doadores
            </button>
            <button
              className={
                filtro === 'urgente'
                  ? 'filtro-btn filtro-btn-ativo'
                  : 'filtro-btn'
              }
              onClick={function () {
                setFiltro('urgente')
              }}
            >
              Urgentes
            </button>
          </div>
        </div>
      </section>

      {/* mapa + painel */}
      <section className="mapa-conteudo">
        <div className="container mapa-grid">
          {/* lado esquerdo: o mapa Leaflet */}
          <div className="mapa-lado-esquerdo">
            <div id="mapa" className="mapa-iframe"></div>
          </div>

          {/* lado direito: painel logistico */}
          <aside className="painel">
            <div className="painel-cabecalho">
              <h2 className="painel-titulo">Painel Logístico</h2>
              <span className="painel-badge">
                {doacoesFiltradas.length} Registros
              </span>
            </div>
            <p className="painel-subtitulo">
              Análise de oportunidades e demandas na sua região metropolitana.
            </p>

            {/* card de instrucoes */}
            <div className="painel-instrucoes">
              <p className="instrucoes-titulo">Como utilizar os dados</p>
              <ul className="instrucoes-lista">
                <li>
                  Cruze informações de disponibilidade utilizando os filtros
                  superiores.
                </li>
                <li>
                  Verifique o <strong>Status de Validação</strong> nos perfis das
                  instituições para garantir a confiabilidade.
                </li>
                <li>
                  Priorize cards sinalizados como{' '}
                  <strong className="texto-urgente">Urgentes</strong> para
                  maximizar a eficácia do socorro imediato.
                </li>
              </ul>
            </div>

            {/* lista de doações */}
            <div className="painel-lista" id="painel-lista">
              {doacoesFiltradas.map(function (doacao) {
                // Monta as classes do card: urgente e/ou selecionado
                let classesDoCard = 'card-doacao'
                if (doacao.tipo === 'urgente') {
                  classesDoCard = classesDoCard + ' card-urgente'
                }
                if (doacaoSelecionada === doacao.id) {
                  classesDoCard = classesDoCard + ' card-doacao-ativo'
                }

                return (
                  <article
                    key={doacao.id}
                    className={classesDoCard}
                    data-tipo={doacao.tipo}
                    onClick={function () {
                      focarNoMapa(doacao)
                    }}
                  >
                    <div className="card-header">
                      <div className="card-info">
                        <div>
                          <h3 className="card-nome">
                            <img src={'/assets/' + doacao.icone} alt="" />{' '}
                            {doacao.nome}
                          </h3>
                          <p className="card-origem">{doacao.origem}</p>
                        </div>
                      </div>

                      {doacao.tipo === 'urgente' ? (
                        <span className="tag tag-vermelho">ALERTA CRITICO</span>
                      ) : (
                        <span className="card-update">{doacao.atualizado}</span>
                      )}
                    </div>

                    {/* Card urgente mostra o bloco de alerta */}
                    {doacao.alerta && (
                      <div className="card-alerta">
                        <p className="alerta-label">
                          ESPECIFICAÇÕES DA DEMANDA
                        </p>
                        <p className="alerta-texto">{doacao.alerta}</p>
                      </div>
                    )}

                    {/* Card de doador mostra as métricas de reputação */}
                    {doacao.historico && (
                      <div className="card-metricas">
                        <div className="card-metrica">
                          <p className="metrica-label">HISTÓRICO DE IMPACTO</p>
                          <p className="metrica-valor">{doacao.historico}</p>
                        </div>
                        <div className="card-metrica">
                          <p className="metrica-label">
                            ÍNDICE DE CONFIABILIDADE
                          </p>
                          <p className="metrica-valor metrica-verde">
                            {doacao.confiabilidade}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="card-rodape">
                      {doacao.volume && (
                        <span className="tag tag-verde">{doacao.volume}</span>
                      )}
                      {doacao.retirada && (
                        <span className="tag tag-cinza">{doacao.retirada}</span>
                      )}
                      <span className="card-distancia">{doacao.distancia}</span>
                    </div>
                  </article>
                )
              })}
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
