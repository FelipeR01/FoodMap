import { Routes, Route } from 'react-router-dom'
import { DoacoesProvider } from './context/DoacoesContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Inicio from './pages/Inicio.jsx'
import Mapa from './pages/Mapa.jsx'
import CadastroDoador from './pages/CadastroDoador.jsx'
import ComoFunciona from './pages/ComoFunciona.jsx'
import Sobre from './pages/Sobre.jsx'
import Contato from './pages/Contato.jsx'

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
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/cadastro-doador" element={<CadastroDoador />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </main>

      <Footer />
    </DoacoesProvider>
  )
}
