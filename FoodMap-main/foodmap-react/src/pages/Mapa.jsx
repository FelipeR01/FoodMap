import { useState, useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '../css/mapa.css'
import { useDoacoes } from '../context/DoacoesContext.jsx'
import { restaurantes, ALIMENTOS, restaurantesPorAlimento } from '../data/restaurantes.js'
import CardsAlimentos from '../components/CardsAlimentos.jsx'
import { useAlimento } from '../context/AlimentoContext.jsx'
import { buscarAlimento } from '../data/alimentos.js'
import TabelaNutricional from '../components/TabelaNutricional.jsx'

/* O Vite precisa dos ícones do Leaflet importados explicitamente para o build. */
import iconePino from 'leaflet/dist/images/marker-icon.png'
import iconePino2x from 'leaflet/dist/images/marker-icon-2x.png'
import sombraPino from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconUrl: iconePino,
  iconRetinaUrl: iconePino2x,
  shadowUrl: sombraPino,
})

/* Monta o HTML do popup de um restaurante: nome, endereço e alimentos disponíveis */
function montarPopupRestaurante(restaurante) {
  const listaAlimentos = restaurante.alimentos
    .map(function (id) {
      return '<li>' + ALIMENTOS[id].nome + '</li>'
    })
    .join('')

  return (
    '<strong>' + restaurante.nome + '</strong><br>' +
    '<small>' + restaurante.endereco + '</small><br>' +
    '<span style="color:#006b30;">Alimentos disponíveis:</span>' +
    '<ul style="margin:4px 0 0 16px;padding:0;">' + listaAlimentos + '</ul>'
  )
}

export default function Mapa() {
  const { doacoes } = useDoacoes()

  /* Alimento escolhido nos cards. Apelidado porque ja existe um alimentoSelecionado
     aqui embaixo, que e o filtro de categoria das doacoes. */
  const { alimentoSelecionado: alimentoDoCard } = useAlimento()

  /* Ficha completa do alimento escolhido no card (nome, icone, grupo e nutricao).
     Fica null quando nenhum card esta selecionado. */
  const alimentoDaTabela = buscarAlimento(alimentoDoCard)

  const [filtro, setFiltro] = useState('todos')

  const [alimentoSelecionado, setAlimentoSelecionado] = useState(null)

  const [doacaoSelecionada, setDoacaoSelecionada] = useState(null)

  const mapaRef = useRef(null)
  const camadaPinosRef = useRef(null)

  const marcadoresRef = useRef({})

  const circulosRestaurantesRef = useRef({})

  const doacoesFiltradas = doacoes.filter(function (doacao) {
    const correspondeAoTipo = filtro === 'todos' || doacao.tipo === filtro
    const correspondeAoAlimento =
      alimentoSelecionado === null || doacao.nome === alimentoSelecionado

    return correspondeAoTipo && correspondeAoAlimento
  })

  const alimentosDisponiveis = Array.from(
    new Set(doacoes.map(function (doacao) {
      return doacao.nome
    }))
  ).sort(function (a, b) {
    return a.localeCompare(b, 'pt-BR')
  })

  useEffect(function () {
    const mapa = L.map('mapa').setView([-23.5614, -46.6559], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(mapa)

    const camadaPinos = L.layerGroup().addTo(mapa)

    /* Camada separada dos restaurantes (círculos verdes) */
    const camadaRestaurantes = L.layerGroup().addTo(mapa)
    restaurantes.forEach(function (restaurante) {
      const circulo = L.circleMarker([restaurante.latitude, restaurante.longitude], {
        radius: 9,
        color: '#006b30',
        fillColor: '#2e7d32',
        fillOpacity: 0.9,
      })
        .bindPopup(montarPopupRestaurante(restaurante))
        .addTo(camadaRestaurantes)

      circulosRestaurantesRef.current[restaurante.id] = circulo
    })

    mapaRef.current = mapa
    camadaPinosRef.current = camadaPinos

    return function () {
      mapa.remove()
      mapaRef.current = null
      camadaPinosRef.current = null
      circulosRestaurantesRef.current = {}
    }
  }, [])

  useEffect(
    function () {
      const camadaPinos = camadaPinosRef.current
      if (!camadaPinos) return

      camadaPinos.clearLayers()
      marcadoresRef.current = {}

      doacoesFiltradas.forEach(function (doacao) {
        const marcador = L.marker([doacao.lat, doacao.lng])

        const popupHtml =
          '<img class="popup-imagem" src="/assets/' +
          doacao.icone +
          '" alt="">' +
          '<strong>' +
          doacao.nome +
          '</strong><br>' +
          '<span style="color:#006b30;">' +
          doacao.origem +
          '</span><br><small>Endereço demonstrativo: ' +
          (doacao.endereco || 'Endereço não informado') +
          '</small><br>' +
          doacao.oferta +
          (doacao.tipo === 'urgente'
            ? '<br><strong style="color:#ba1a1a;">⚠ ALERTA CRÍTICO</strong>'
            : '')

        marcador.bindPopup(popupHtml)
        marcador.addTo(camadaPinos)

        marcadoresRef.current[doacao.id] = marcador
      })

      if (doacoesFiltradas.length > 0) {
        const limites = L.latLngBounds(
          doacoesFiltradas.map(function (doacao) {
            return [doacao.lat, doacao.lng]
          })
        )
        mapaRef.current.fitBounds(limites, {
          padding: [32, 32],
          maxZoom: 14,
        })
      }

      const marcadorSelecionado = marcadoresRef.current[doacaoSelecionada]
      if (marcadorSelecionado) marcadorSelecionado.openPopup()
    },
    // O redesenho remove o popup; reabre o do card selecionado após montar os pins.
    [doacoes, filtro, alimentoSelecionado, doacaoSelecionada]
  )

  /* Clicar num card de alimento leva o mapa ate os restaurantes que oferecem
     esse alimento, destacando os circulos deles e apagando os demais. */
  useEffect(
    function () {
      const mapa = mapaRef.current
      if (!mapa) return

      const comOAlimento = alimentoDoCard ? restaurantesPorAlimento(alimentoDoCard) : []
      const idsComOAlimento = comOAlimento.map(function (restaurante) {
        return restaurante.id
      })

      restaurantes.forEach(function (restaurante) {
        const circulo = circulosRestaurantesRef.current[restaurante.id]
        if (!circulo) return

        const destacado = idsComOAlimento.includes(restaurante.id)
        const apagado = alimentoDoCard !== null && !destacado

        circulo.setRadius(destacado ? 14 : 9)
        circulo.setStyle({
          color: destacado ? '#ba6b00' : '#006b30',
          fillColor: destacado ? '#ff9800' : '#2e7d32',
          opacity: apagado ? 0.25 : 1,
          fillOpacity: apagado ? 0.15 : 0.9,
        })
      })

      if (comOAlimento.length === 0) return

      const limites = L.latLngBounds(
        comOAlimento.map(function (restaurante) {
          return [restaurante.latitude, restaurante.longitude]
        })
      )
      mapa.flyToBounds(limites, { padding: [70, 70], maxZoom: 15 })

      /* Com um unico restaurante, ja abre o balao com o endereco. */
      if (comOAlimento.length === 1) {
        circulosRestaurantesRef.current[comOAlimento[0].id].openPopup()
      }

      mapa.getContainer().scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    },
    [alimentoDoCard]
  )

  function focarNoMapa(doacao) {
    const mapa = mapaRef.current
    const marcador = marcadoresRef.current[doacao.id]
    if (!mapa || !marcador) return

    setDoacaoSelecionada(doacao.id)
    setAlimentoSelecionado(doacao.nome)

    mapa.getContainer().scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  return (
    <>
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

      <section className="mapa-filtros">
        <div className="container filtros-bar">
          <label className="filtro-alimento">
            <span>Tipo de alimento</span>
            <select
              className="filtros-select"
              value={alimentoSelecionado || ''}
              onChange={function (evento) {
                setAlimentoSelecionado(evento.target.value || null)
                setDoacaoSelecionada(null)
              }}
            >
              <option value="">Todos os alimentos</option>
              {alimentosDisponiveis.map(function (alimento) {
                return (
                  <option key={alimento} value={alimento}>
                    {alimento}
                  </option>
                )
              })}
            </select>
          </label>
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

      <section className="mapa-conteudo">
        <div className="container mapa-grid">
          <div className="mapa-lado-esquerdo">
            <div id="mapa" className="mapa-iframe"></div>

            <TabelaNutricional
              alimento={alimentoDaTabela?.nome}
              porcao={alimentoDaTabela?.nutricao.porcao}
              valores={alimentoDaTabela?.nutricao}
            />
          </div>

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

            <CardsAlimentos />

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

            <div className="painel-lista" id="painel-lista">
              {doacoesFiltradas.map(function (doacao) {
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
                          <p className="card-endereco">
                            Endereço demonstrativo: {doacao.endereco || 'não informado'}
                          </p>
                        </div>
                      </div>

                      {doacao.tipo === 'urgente' ? (
                        <span className="tag tag-vermelho">ALERTA CRITICO</span>
                      ) : (
                        <span className="card-update">{doacao.atualizado}</span>
                      )}
                    </div>

                    {doacao.alerta && (
                      <div className="card-alerta">
                        <p className="alerta-label">
                          ESPECIFICAÇÕES DA DEMANDA
                        </p>
                        <p className="alerta-texto">{doacao.alerta}</p>
                      </div>
                    )}

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