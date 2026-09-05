import React from "react";
import { Link } from "react-router-dom";
import "../css/como-funciona.css";

export default function ComoFunciona() {
  return (
    <main>
      {/* Primeiro título */}
      <section className="first">
        <div className="container">
          <h1 className="first-title">Como o FoodMap Funciona</h1>
          <p>
            Conectamos doadores e receptores por geolocalização de forma
            simples, rápida e acessível para qualquer pessoa.
          </p>
          <img
            className="first-img"
            src="/assets/imagem-hover.png"
            alt="Ilustração de como funciona o FoodMap"
          />
        </div>
      </section>

      {/* Informações */}
      <section className="info">
        <article className="algoritmo">
          <h2 className="algoritmo-title">
            1. Algoritmo de Matching Inteligente
          </h2>
          <p className="algoritmo-descricao">
            Nosso motor de busca conecta quem quer ajudar com quem precisa
            de forma otimizada. O sistema analisa a proximidade geográfica e
            a compatibilidade entre a oferta e a demanda em tempo real.
          </p>
          <ul className="algoritmo-lista">
            <li>Mapeamento geoespacial em tempo real.</li>
            <li>Sugestão automática do melhor par doador-receptor.</li>
            <li>
              Filtro por tipo de alimento: perecível, não perecível,
              refeição pronta e hortifrúti.
            </li>
          </ul>
          <img
            className="algoritmo-img"
            src="/assets/mapa-digital.png"
            alt="Ilustração de mapa digital representando o algoritmo de matching"
          />
        </article>

        <article className="status">
          <h2 className="status-title">
            2. Status e Rastreabilidade da Doação
          </h2>
          <p className="status-descricao">
            Acompanhe todo o processo de doação com transparência total. O
            fluxo segue o ciclo vital do alimento desde a disponibilização
            até a chegada ao destino final, garantindo que o impacto seja
            concretizado.
          </p>
          <ul className="status-lista">
            <li>Ciclo rastreável: Disponível → Em Rota → Entregue.</li>
            <li>Atualização de status em tempo real para ambas as partes.</li>
            <li>
              Confirmação digital de recebimento e histórico completo de
              doações.
            </li>
          </ul>
          <img
            className="status-img"
            src="/assets/status-rastreabilidade.png"
            alt="Ilustração de celular mostrando o ciclo de status da doação"
          />
        </article>

        <article className="cadastro">
          <h2 className="cadastro-title">3. Cadastro de Doador e Receptor</h2>
          <p className="cadastro-descricao">
            Nossa plataforma é aberta e inclusiva. O cadastro é simples e
            rápido para que todos possam participar do combate ao
            desperdício, seja você uma pessoa física, uma empresa ou uma
            instituição social.
          </p>
          <ul className="cadastro-lista">
            <li>
              Cadastro de doador: tipo, quantidade, validade e horário
              disponível.
            </li>
            <li>
              Cadastro de receptor: endereço, perfil de atendimento e
              capacidade.
            </li>
            <li>
              Área dedicada para voluntários de transporte e apoio
              logístico.
            </li>
          </ul>
          <img
            className="cadastro-img"
            src="/assets/receptor-doador.png"
            alt="Ilustração de formulário de cadastro de doador e receptor"
          />
        </article>
      </section>

      {/* CTA Final */}
      <section className="jornada">
        <div className="jornada-conteiner">
          <h2 className="jornada-title">
            Pronto para fazer parte desta rede de impacto?
          </h2>
          <p className="jornada-descricao">
            Escolha como você quer começar sua jornada no FoodMap. Juntos
            podemos transformar excedentes em alimento na mesa de quem
            precisa.
          </p>
          <div className="hero__cta">
            <Link to="/cadastro-doador" className="btn btn-primary">
              Quero Cadastrar uma Doação
            </Link>
            <Link to="/mapa" className="btn btn-outline">
              Quero Encontrar Doações Perto de Mim
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}