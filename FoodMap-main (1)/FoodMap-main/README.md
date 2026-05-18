# 🌱 FoodMap — Plataforma de Impacto Social

Plataforma colaborativa que combate o desperdício de alimentos e a insegurança alimentar em tempo real.

---

## 📁 Estrutura do Projeto

```
foodmap/
│
├── index.html                  ← Página inicial (Início / Personas)
│
├── pages/
│   ├── mapa.html               ← Mapa interativo de doações (Leaflet)
│   ├── como-funciona.html      ← Guia passo a passo
│   ├── institucional.html      ← Sobre / Impacto / Transparência
│   └── contato.html            ← Central de Atendimento / Formulário
│
├── components/
│   ├── navbar.js               ← NavBar (injetada em todas as páginas)
│   └── footer.js               ← Footer (injetado em todas as páginas)
│
├── js/
│   ├── home.js                 ← Dados e lógica da home
│   ├── mapa.js                 ← Lógica do mapa (Leaflet + pins)
│   ├── como-funciona.js        ← Dados dos passos
│   ├── institucional.js        ← Dados de impacto / time
│   └── contato.js              ← Formulário + FAQ
│
├── css/
│   ├── tokens.css              ← Design tokens (cores, tipografia, espaçamento)
│   ├── global.css              ← Reset, componentes base (btn, card, input, badge)
│   ├── navbar.css              ← Estilos da NavBar
│   ├── footer.css              ← Estilos do Footer
│   ├── home.css                ← Estilos da Home
│   ├── mapa.css                ← Estilos do Mapa
│   ├── como-funciona.css       ← Estilos do Como Funciona
│   ├── institucional.css       ← Estilos do Institucional
│   └── contato.css             ← Estilos do Contato
│
└── assets/
    └── images/                 ← Imagens e ícones
```

---

## 🎨 Design System

Definido em `css/tokens.css`. Todas as cores, tipografia e espaçamento usam variáveis CSS (`--color-primary`, `--space-lg`, etc.).

| Token           | Valor        |
|-----------------|--------------|
| `--color-primary` | `#006b30` (verde escuro) |
| `--font-serif`  | Noto Serif   |
| `--font-sans`   | Inter        |
| `--space-unit`  | 4px (base)   |
| `--radius-xl`   | 1rem         |

---

## 🗺️ Mapa

Usa **Leaflet** via CDN. Os dados de doações estão mockados em `js/mapa.js` (array `donations`).

Para conectar uma API real, substituir a função `MapPage.donations` por um `fetch()`.

---

## 📋 Próximos passos sugeridos

- [ ] Conectar formulário de contato a um backend (ex: Formspree, EmailJS)
- [ ] Integrar API de doações real no `mapa.js`
- [ ] Adicionar autenticação (login doador / receptor)
- [ ] Implementar busca por CEP via ViaCEP API
- [ ] Adicionar página de perfil do doador
- [ ] Criar painel de gestão de doações

---

## 🔗 Dependências externas (CDN)

| Lib      | Uso                          |
|----------|------------------------------|
| Leaflet  | Mapa interativo (mapa.html)  |
| Google Fonts | Inter + Noto Serif       |

Nenhuma outra dependência. HTML/CSS/JS puro.
