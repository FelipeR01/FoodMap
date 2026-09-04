import { Link } from 'react-router-dom'

/* =====================================================
   FOODMAP — Footer

   Mesmo HTML que estava repetido no rodapé de todas as
   páginas, agora em um componente só.
   ===================================================== */

export default function Footer() {
  return (
    <footer className="footer bg-inverse">
      <span className="footer-title">FOODMAP</span>

      <ul className="footer-nav">
        <li>
          <Link to="/">Início</Link>
        </li>
        <li>
          <Link to="/mapa">Mapa de Doações</Link>
        </li>
        <li>
          <Link to="/como-funciona">Como Funciona</Link>
        </li>
        <li>
          <Link to="/sobre">Sobre Nós</Link>
        </li>
        <li>
          <Link to="/contato">Contato</Link>
        </li>
      </ul>

      <p className="footer-direitos">
        © 2026 FoodMap. Todos os direitos reservados.
      </p>
    </footer>
  )
}
