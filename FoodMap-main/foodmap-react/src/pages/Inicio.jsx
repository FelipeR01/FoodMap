import { Link } from 'react-router-dom'
import '../css/home.css'

/* =====================================================
   FOODMAP — Início

   Mesmo conteúdo do antigo index.html, dividido nas
   mesmas 4 seções: Hero, Contexto, Soluções e Impacto.
   ===================================================== */

/* Link do vídeo pitch exigido na entrega.
   Trocar pelo link do YouTube quando o vídeo estiver no ar. */
const LINK_VIDEO = ''

export default function Inicio() {
  return (
    <>
      {/* ==========================================
          1. SEÇÃO HERO (Fundo verde clarinho)
          ========================================== */}
      <section className="hero bg-surface-bright">
        <div className="container hero__container">
          <div className="secao">
            <div className="hero__content">
              <span className="badge">
                <img
                  className="badge-gif"
                  src="/assets/estralas.gif"
                  alt="Ilustração de estrelas"
                />
                Tecnologia para Impacto Social • ODS 2 — Fome Zero
              </span>

              <h1 className="display-lg hero__title">
                Conectando quem tem com quem precisa, em tempo real.
              </h1>

              <p className="body-lg hero__description">
                O FoodMap é uma plataforma colaborativa que combate <br /> o
                desperdício de alimentos e a insegurança alimentar em <br />{' '}
                tempo real, conectando doadores a quem mais precisa.
              </p>

              <div className="hero__buttons">
                <Link to="/cadastro-doador" className="btn btn-primary">
                  Seja um Doador Parceiro
                </Link>
                <Link to="/mapa" className="btn btn-outline">
                  Explorar Nossa Solução Logística
                </Link>
              </div>

              {/* Link do vídeo do projeto (aparece só depois de preenchido) */}
              {LINK_VIDEO !== '' && (
                <p className="body-md">
                  <a href={LINK_VIDEO} target="_blank" rel="noopener noreferrer">
                    Assista ao vídeo do projeto
                  </a>
                </p>
              )}
            </div>

            <div className="hero__image-wrapper">
              <img
                src="/assets/Celular-FoodMap.png"
                alt="Celular aberto no mapa do FoodMap"
                className="hero__image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. O CONTEXTO BRASILEIRO E NÚMEROS
          ========================================== */}
      <section className="contexto">
        {/* Textos (Fundo Branco) */}
        <div className="container contexto__header">
          <div className="contexto-section">
            <span className="section-tag">O Contexto Brasileiro</span>
            <h2 className="headline-lg">
              Um paradoxo inadmissível: Fome em meio à<br />
              abundância
            </h2>
            <p className="contexto-descricao">
              O Brasil é um dos maiores produtores de alimentos do mundo,
              contudo, enfrentamos uma crise crônica de insegurança alimentar. O
              FoodMap nasce da urgência em corrigir uma falha sistêmica: a
              desconexão logística entre onde sobra alimento próprio para
              consumo e onde ele é vitalmente necessário.
            </p>
          </div>
        </div>

        {/* Faixa Verde com os Números (Largura Total da Tela) */}
        <div className="faixa-estatisticas bg-primary-fixed">
          <div className="container estatisticas__grid">
            <div className="estatisticas">
              <article className="estatistica-item">
                <h3 className="display-md">55M Pessoas</h3>
                <p className="label-md">em insegurança alimentar grave</p>
              </article>

              <article className="estatistica-item">
                <h3 className="display-md">40% de Perda</h3>
                <p className="label-md">na cadeia de abastecimento nacional</p>
              </article>

              <article className="estatistica-item">
                <h3 className="display-md">0 Plataformas nacionais</h3>
                <p className="label-md">
                  de matching doador-receptor em tempo real
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. ARQUITETURA DE SOLUÇÃO (Como Funciona)
          ========================================== */}
      <section className="solucoes">
        <div className="container">
          <div className="solucoes__header text-center">
            <h2 className="headline-lg">Nossa Arquitetura de Solução</h2>
            <p className="arquitetura-descricao">
              Um fluxo de trabalho otimizado e seguro, projetado para atender
              aos rigorosos padrões da indústria alimentícia e das organizações
              do terceiro setor.
            </p>
          </div>

          <div className="solucoes__grid">
            <div className="card-passo">
              <span className="card-passo__numero">#01</span>
              <img
                src="/assets/Mapa-icon.png"
                alt="Ícone de mapa"
                className="card-passo__icon"
              />
              <h3 className="headline-sm">Mapa Interativo</h3>
              <p className="body-md">
                Doadores e receptores visualizam em tempo real um <br /> mapa
                com pins de pontos de doação disponíveis próximos. Regiões com
                maior vulnerabilidade alimentar são destacadas por cor e
                severidade.
              </p>
            </div>

            <div className="card-passo">
              <span className="card-passo__numero">#02</span>
              <img
                src="/assets/radar-transparente-icon.png"
                alt="Ícone de matching"
                className="card-passo__icon"
              />
              <h3 className="headline-sm">Matching por Proximidade</h3>
              <p className="body-md">
                O sistema calcula automaticamente os doadores mais próximos de
                cada receptor, considerando tipo de alimento, quantidade
                disponível, janela de horário e localização. O melhor par é
                sugerido automaticamente.
              </p>
            </div>

            <div className="card-passo">
              <span className="card-passo__numero">#03</span>
              <img
                src="/assets/notificacao-icon.png"
                alt="Ícone de status"
                className="card-passo__icon"
              />
              <h3 className="headline-sm">Status da Doação</h3>
              <p className="body-md">
                Cada doação percorre um ciclo rastreável: Disponível → Em Rota →
                Entregue. O receptor recebe confirmação do recebimento e o
                doador tem visibilidade completa do destino do alimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. IMPACTO REAL (Fundo Verde Claro)
          ========================================== */}
      <section className="impacto bg-primary-fixed">
        <div className="container">
          <div className="impacto__header text-center">
            <h2 className="titulo-impacto headline-lg">
              Impacto Real na Ponta da Cadeia
            </h2>
            <p className="descricao-impacto">
              A tecnologia apenas facilita; são as pessoas e organizações
              parceiras que transformam
              <br />a realidade diária.
            </p>
          </div>

          <div className="impacto__grid">
            <article className="card-depoimento">
              <div className="card-depoimento__perfil">
                <img
                  src="/assets/maria.png"
                  alt="Foto de Dona Maria da Silva"
                  className="perfil__avatar"
                />
                <div className="titulo-card-pessoas">
                  <h3 className="titulo-depoimento">Dona Maria da Silva</h3>
                  <p className="label-md text-muted">
                    Mãe solo, 3 filhos — Receptora
                  </p>
                </div>
              </div>
              <p className="body-md depoimento__texto">
                "Antes do FoodMap, eu não sabia onde nem quando aparecia alguma
                doação perto de casa. Agora acesso o mapa pelo celular e vejo os
                pontos disponíveis pertinho. Recebi um alerta ontem e busquei
                alimentos frescos para os meus três filhos. Nunca pensei que um
                aplicativo pudesse fazer tanta diferença assim."
              </p>
              <div className="card-depoimento__tags">
                <span className="badge badge--small">Receptora</span>
                <span className="badge badge--small">Fortaleza, CE</span>
              </div>
            </article>

            <article className="card-depoimento">
              <div className="card-depoimento__perfil">
                <img
                  src="/assets/carlos.png"
                  alt="Foto de Carlos Eduardo"
                  className="perfil__avatar"
                />
                <div className="titulo-card-pessoas">
                  <h3 className="titulo-depoimento">Carlos Eduardo</h3>
                  <p className="label-md text-muted">
                    Dono de Restaurante — Doador
                  </p>
                </div>
              </div>
              <p className="body-md depoimento__texto">
                "Pode não parecer, mas fechar o caixa no final do expediente é
                tão duro quanto o que fazer com a comida que sobrou. Encontrar
                quem precisava era complicado demais. Com o FoodMap, cadastro o
                que sobrou, informo o horário e o sistema avisa quem está perto.
                Simples assim. Parei de desperdiçar e ainda ajudo quem precisa."
              </p>
              <div className="card-depoimento__tags">
                <span className="badge badge--small">Doador</span>
                <span className="badge badge--small">Restaurante</span>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
