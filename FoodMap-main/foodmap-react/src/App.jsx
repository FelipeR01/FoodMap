import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { DoacoesProvider } from './context/DoacoesContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Inicio from './pages/Inicio.jsx'
import Mapa from './pages/Mapa.jsx'
import CadastroDoador from './pages/CadastroDoador.jsx'
import ComoFunciona from './pages/ComoFunciona.jsx'
import Sobre from './pages/Sobre.jsx'
import Contato from './pages/Contato.jsx'

function RouteTransition() {
  const location = useLocation()
  const [localizacaoExibida, setLocalizacaoExibida] = useState(location)
  const [visivel, setVisivel] = useState(false)

  useEffect(function () {
    if (location.key === localizacaoExibida.key) {
      return undefined
    }

    setVisivel(true)
    const timer = window.setTimeout(function () {
      setLocalizacaoExibida(location)
      setVisivel(false)
    }, 650)

    return function () {
      window.clearTimeout(timer)
    }
  }, [location, localizacaoExibida.key])

  return (
    <>
      <div className={`route-transition ${visivel ? 'route-transition--visible' : ''}`} aria-hidden="true">
        <div className="foodmap-transition-logo">
          <span className="foodmap-transition-mark"><span /></span>
          <span className="foodmap-transition-name">FOODMAP</span>
          <span className="foodmap-transition-tagline">conectando quem tem com quem precisa</span>
        </div>
      </div>

      <Routes location={localizacaoExibida} key={localizacaoExibida.pathname}>
        <Route path="/" element={<Inicio />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/cadastro-doador" element={<CadastroDoador />} />
        <Route path="/como-funciona" element={<ComoFunciona />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </>
  )
}

/* =====================================================
   FOODMAP — App

   A Navbar e o Footer ficam fora das rotas porque
   aparecem em todas as páginas (no site antigo eles eram
   injetados por navbar.js/footer.js em cada HTML).
   ===================================================== */

export default function App() {
  return (
    <DoacoesProvider>
      <Navbar />

      <main>
        <RouteTransition />
      </main>

      <Footer />
    </DoacoesProvider>
  )
}
