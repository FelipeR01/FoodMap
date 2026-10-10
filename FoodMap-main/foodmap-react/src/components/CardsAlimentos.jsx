import { alimentos, contarRestaurantes } from '../data/alimentos.js'
import { useAlimento } from '../context/AlimentoContext.jsx'
import '../css/cards-alimentos.css'

export default function CardsAlimentos() {
  const { alimentoSelecionado, selecionarAlimento } = useAlimento()

  return (
    <div className="cards-alimentos">
      <p className="cards-alimentos__titulo">Alimentos em destaque</p>

      {alimentos.map(function (alimento) {
        const ativo = alimentoSelecionado === alimento.id
        const quantidade = contarRestaurantes(alimento.id)

        return (
          <button
            key={alimento.id}
            type="button"
            className={ativo ? 'card-alimento card-alimento--ativo' : 'card-alimento'}
            aria-pressed={ativo}
            onClick={function () {
              selecionarAlimento(alimento.id)
            }}
          >
            <span className="card-alimento__icone" aria-hidden="true">
              {alimento.icone}
            </span>
            <span className="card-alimento__nome">{alimento.nome}</span>
            <span className="card-alimento__descricao">{alimento.descricao}</span>
            <span className="card-alimento__locais">
              {quantidade} {quantidade === 1 ? 'restaurante' : 'restaurantes'}
            </span>
          </button>
        )
      })}
    </div>
  )
}
