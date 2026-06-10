# **🍔 FoodMap - Plataforma de Impacto e Redistribuição Alimentar**

## **📖 Descrição do Projeto**

O **FoodMap** é uma plataforma colaborativa desenvolvida para mitigar dois problemas urbanos e sociais urgentes: o desperdício de alimentos (frequentemente descartados por restaurantes e mercados) e a insegurança alimentar.

A aplicação atua como uma ponte logística em tempo real, conectando estabelecimentos com excedente de produção (doadores) a ONGs, instituições e indivíduos em situação de vulnerabilidade (receptores). Através de uma interface geolocalizada e amigável, o sistema otimiza a triagem e o resgate rápido de alimentos perecíveis antes de seu vencimento.

## **🎯 Objetivo e Impacto (ESG)**

* **Combate ao Desperdício:** Redução drástica do volume de alimentos em boas condições que iriam para aterros sanitários.
* **Segurança Alimentar:** Aceleração do tempo de resposta entre a disponibilidade de uma doação e a chegada à mesa de quem precisa.
* **Alinhamento ONU:** Contribuição direta com a **ODS 2** (Fome Zero e Agricultura Sustentável) e **ODS 12** (Consumo e Produção Responsáveis).

## **🗂️ Estrutura do Site (Abas e Funcionalidades)**

O projeto foi estruturado em uma arquitetura modular focada na jornada do usuário, dividida em 5 seções principais:

1. **Início (`index.html`):** Landing page com a apresentação do problema (dados estatísticos) e direcionamento claro para doadores e receptores (Personas).
2. **Mapa de Doações (`mapa.html`):** Interface principal. Utiliza renderização espacial para mapear pontos de coleta ativos na região, permitindo filtragem e roteirização rápida.
3. **Como Funciona (`como-funciona.html`):** Fluxo de integração (Onboarding) simplificado, explicando o processo de cadastro, triagem e retirada.
4. **Institucional (`institucional.html`):** Dashboard de transparência exibindo o impacto gerado (toneladas salvas, refeições servidas) e a equipe por trás da plataforma.
5. **Contato e Suporte (`contato.html`):** Central de atendimento com formulário com validações robustas em JavaScript para captação de novos parceiros.

## **🛠️ Tecnologias Utilizadas**

O desenvolvimento priorizou um front-end leve, sem dependência de frameworks pesados (Vanilla Tech), garantindo acessibilidade em dispositivos de baixo processamento:

* **HTML5 Semântico:** Estruturação acessível e indexável.
* **CSS3 (Custom Properties & Tokens):** Design System unificado (Variáveis) baseado em contrastes de verde (`#006b30`), garantindo legibilidade e responsividade nativa.
* **JavaScript (Vanilla ES6):** Lógica assíncrona para consumo de APIs de mapas, injeção de componentes dinâmicos (Navbar/Footer) e validações complexas de formulário em client-side.
* **Leaflet.js:** Biblioteca via CDN utilizada para a plotagem do mapa interativo e renderização dos marcadores geolocalizados.

## **📂 Estrutura do Repositório**

Abaixo, a organização técnica baseada em modularização de componentes:

```text
foodmap/
├── index.html                       # Página Inicial (Contexto e Personas)
├── pages/
│   ├── mapa.html                    # Interface Geolocalizada de Doações
│   ├── como-funciona.html           # Guia passo a passo do fluxo
│   ├── institucional.html           # Painel de Impacto ESG e Equipe
│   └── contato.html                 # Central de Captação e Formulário Validado
├── components/
│   ├── navbar.js                    # Injeção dinâmica do Header responsivo
│   └── footer.js                    # Injeção dinâmica do Rodapé corporativo
├── css/
│   ├── tokens.css                   # Core Design System (Cores, Fontes e Espaçamentos)
│   ├── global.css                   # Reset, Tipografia base e UI Elements (Botões, Inputs)
│   ├── navbar.css                   # Estilização da navegação principal
│   ├── footer.css                   # Estilização do rodapé
│   ├── home.css                     # Layout e Hero Section da Home
│   ├── mapa.css                     # Estilização do contêiner do Leaflet
│   ├── como-funciona.css            # Layout de passos e cards de onboarding
│   ├── institucional.css            # Apresentação visual da equipe e métricas
│   └── contato.css                  # Grid do formulário e validações visuais
└── js/
    ├── home.js                      # Lógica de interatividade da página inicial
    ├── mapa.js                      # Inicialização do Leaflet e Mock de pontos de doação
    ├── como-funciona.js             # Lógica de renderização dos passos
    ├── institucional.js             # Lógica de renderização de impacto/time
    └── contato.js                   # Engine de Validação (Nome, E-mail, Textarea)
└── assets/
    └── images/                      # Repositório de assets visuais, vetores e logotipos
