import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

/* =====================================================
   FOODMAP — Navbar

   Mesma estrutura do antigo components/navbar.js.
   O id "nav-bar" e a classe "open" foram mantidos porque
   o navbar.css usa "#nav-bar.open" para abrir o menu no
   celular. O link ativo continua usando a classe "active",
   que o NavLink já coloca sozinho conforme a rota atual.
   ===================================================== */

export default function Navbar() {
  // Controla se o menu do celular está aberto ou fechado
  const [aberto, setAberto] = useState(false)
  const [temaEscuro, setTemaEscuro] = useState(function () {
    return localStorage.getItem('foodmap-theme') === 'dark'
  })

  useEffect(function () {
    document.documentElement.dataset.theme = temaEscuro ? 'dark' : 'light'
    localStorage.setItem('foodmap-theme', temaEscuro ? 'dark' : 'light')
  }, [temaEscuro])

  // Fecha o menu ao clicar em qualquer link (igual ao site antigo)
  function fecharMenu() {
    setAberto(false)
  }

  return (
    <header id="nav-bar" className={aberto ? 'open' : ''}>
      <nav className="navbar">
        <Link to="/" className="navbar__logo" onClick={fecharMenu}>
          FOODMAP
        </Link>

        <ul className="navbar__nav">
          <li>
            <NavLink to="/" onClick={fecharMenu}>
              Início
            </NavLink>
          </li>
          <li>
            <NavLink to="/como-funciona" onClick={fecharMenu}>
              Como Funciona
            </NavLink>
          </li>
          <li>
            <NavLink to="/mapa" onClick={fecharMenu}>
              Mapa
            </NavLink>
          </li>
          <li>
            <NavLink to="/sobre" onClick={fecharMenu}>
              Sobre
            </NavLink>
          </li>
          <li>
            <NavLink to="/contato" onClick={fecharMenu}>
              Fale Conosco
            </NavLink>
          </li>
        </ul>

        <Link to="/cadastro-doador" className="navbar__cta" onClick={fecharMenu}>
          Quero Doar
        </Link>

        <button
          className="navbar__theme-toggle"
          type="button"
          aria-label={temaEscuro ? 'Ativar tema claro' : 'Ativar tema escuro'}
          title={temaEscuro ? 'Ativar tema claro' : 'Ativar tema escuro'}
          onClick={function () {
            setTemaEscuro(!temaEscuro)
          }}
        >
          {temaEscuro ? '☀' : '☾'}
        </button>

        <button
          className="navbar__toggle"
          aria-label="Abrir menu"
          aria-expanded={aberto}
          onClick={function () {
            setAberto(!aberto)
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>
    </header>
  )
}
