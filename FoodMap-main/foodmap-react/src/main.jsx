import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

/* Os CSS globais do projeto entram aqui uma vez só,
   na mesma ordem em que os <link> apareciam nos HTMLs antigos */
import './css/tokens.css'
import './css/global.css'
import './css/navbar.css'
import './css/footer.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
