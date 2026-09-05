import '../css/sobre.css'

export default function Sobre() {
  return (
    <div className="sobre-page">
      <section className="sobre-hero">
        <div className="image-hero">
          <img src="/assets/imagem-hover.png" alt="Homem com notificações chegando em seu celular" />
        </div>

        <div className="ods">
          <h1 className="display-lg">ODS 2</h1>
          <p className="ods-paragrafo">FOME ZERO E AGRICULTURA SUSTENTÁVEL</p>
        </div>

        <div className="nosso-manifesto">
          <h2 className="title-manifesto">Nosso Manifesto: Tecnologia a serviço de quem precisa</h2>
          <p className="paragrafo-manifesto">Acreditamos que o acesso à alimentação é um direito humano fundamental, não um privilégio. Em um mundo onde a abundância convive diariamente com a escassez, a ineficiência logística não pode ser uma desculpa para a fome.</p>
          <p className="paragrafo-manifesto">Nossa missão é erradicar a insegurança alimentar conectando, em tempo real, os excedentes de alimentos de toda a cadeia produtiva às organizações que atendem quem mais precisa, de forma rápida, rastreável e inteligente.</p>
        </div>

        <div className="compromisso-agenda">
          <p><strong>Compromisso Agenda 2030 (ONU):</strong> O FoodMap foi estruturado para ser uma ferramenta direta de execução do Objetivo de Desenvolvimento Sustentável 2. Atuamos ativamente na meta 2.1, garantindo o acesso a alimentos seguros e nutritivos durante todo o ano, e na meta 12.3, operando na redução sistemática do desperdício global de alimentos nas fases de varejo e consumo.</p>
        </div>
      </section>

      <section className="desafio">
        <div className="texto-desafio">
          <h2>O Tamanho do Desafio</h2>
          <p className="descricao-desafio">Métricas que guiam nossa atuação estratégica e avaliação de impacto socioambiental.</p>
        </div>
        <div className="sobre-cards">
          <article className="sobre-card"><img className="card-imagem" src="/assets/grupo.png" alt="Ícone de um grupo de pessoas" /><h3 className="card-titulo">55M+</h3><p className="card-descricao">pessoas em situação de insegurança alimentar grave no Brasil.</p></article>
          <article className="sobre-card"><img className="card-imagem" src="/assets/Lixo.png" alt="Ícone de uma lixeira" /><h3 className="card-titulo">40%</h3><p className="card-descricao">de todos os alimentos produzidos são desperdiçados no país.</p></article>
          <article className="sobre-card"><img className="card-imagem" src="/assets/globo.png" alt="Ícone de um globo terrestre" /><h3 className="card-titulo">0</h3><p className="card-descricao">plataformas centralizadas para gestão eficiente de doações locais até nossa fundação.</p></article>
          <article className="sobre-card"><img className="card-imagem" src="/assets/Moedas.png" alt="Ícone de moedas" /><h3 className="card-titulo">R$61B</h3><p className="card-descricao">valor estimado do desperdício anual de alimentos no Brasil.</p></article>
        </div>
        <div className="dado"><p>Dados de insegurança alimentar via IBGE (PNAD Contínua - Módulo Segurança Alimentar). Índices de desperdício e impacto financeiro baseados no PNUMA e FAO.</p></div>
      </section>

      <section className="transparencia">
        <div className="transparencia-textos">
          <h2 className="transparencia-heading">Transparência e Governança</h2>
          <p className="transparencia-intro">A confiança é o pilar da nossa rede. Mantemos padrões rigorosos de governança corporativa, segurança da informação e auditoria para garantir que cada doação chegue ao seu destino final com total conformidade.</p>
        </div>
        <div className="transparencia-cards">
          <article className="transparencia-card"><img className="transparencia-image" src="/assets/doacao-de-alimentos.png" alt="Ícone representando conexão direta" /><h3>Conexão Direta</h3><p>Facilitamos a ponte entre quem quer doar e quem precisa. O processo é simples, direto e você acompanha o status da sua doação pelo próprio aplicativo.</p></article>
          <article className="transparencia-card"><img className="transparencia-image" src="/assets/escudo-seguro.png" alt="Ícone representando privacidade e cuidado" /><h3>Privacidade e Cuidado</h3><p>Levamos a sério as suas informações. Coletamos apenas os dados essenciais para o funcionamento da plataforma e nos comprometemos a não compartilhar suas informações pessoais com terceiros.</p></article>
          <article className="transparencia-card"><img className="transparencia-image" src="/assets/protecao-ambiental.png" alt="Ícone representando impacto social" /><h3>Foco no Impacto Social</h3><p>Nosso maior objetivo é reduzir o desperdício de alimentos e combater a fome. Crescemos com base no feedback da comunidade e na transparência das nossas ações.</p></article>
        </div>
      </section>

      <section className="frase">
        <blockquote className="frase-destaque">&quot;Alimentos existem. Pessoas precisam. O FoodMap une os dois.&quot;</blockquote>
      </section>
    </div>
  )
}
