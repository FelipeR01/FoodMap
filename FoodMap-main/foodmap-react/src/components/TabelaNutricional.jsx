import '../css/tabela-nutricional.css'

const nutrientes = [
  ['calorias', 'Valor energético', 'kcal'],
  ['proteina', 'Proteínas', 'g'],
  ['carboidrato', 'Carboidratos', 'g'],
  ['gordura', 'Gorduras totais', 'g'],
  ['fibras', 'Fibra Alimentar', 'g'],
]

const formatadorNumero = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 3,
})

function formatarValor(valor) {
  if (typeof valor === 'number' && Number.isFinite(valor)) {
    return formatadorNumero.format(valor)
  }

  if (typeof valor === 'string' && valor.trim() !== '') {
    const numero = Number(valor.trim().replace(',', '.'))
    return Number.isFinite(numero) ? formatadorNumero.format(numero) : valor
  }

  return valor ?? '—'
}

export default function TabelaNutricional({
  alimento,
  porcao,
  valores = {},
}) {
  const alimentoSelecionado = typeof alimento === 'string' && alimento.trim() !== ''

  return (
    <table
      className="tabela-nutricional"
      aria-label={alimentoSelecionado ? `Tabela nutricional de ${alimento}` : 'Tabela nutricional'}
    >
      <caption className="tabela-nutricional__titulo">
        <span className="tabela-nutricional__cabecalho">
          <span>{alimentoSelecionado ? alimento : 'Tabela nutricional'}</span>
          {alimentoSelecionado && porcao && (
            <span className="tabela-nutricional__porcao">{porcao}</span>
          )}
        </span>
      </caption>
      <thead>
        <tr>
          <th scope="col">Nutriente</th>
          <th scope="col">Quantidade</th>
        </tr>
      </thead>
      <tbody>
        {alimentoSelecionado ? (
          nutrientes.map(([chave, nome, unidade]) => (
            <tr key={chave}>
              <th scope="row">{nome} ({unidade})</th>
              <td>{formatarValor(valores[chave])}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="tabela-nutricional__vazio" colSpan="2">
              Selecione um alimento
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="2">Fonte: Tabela Taco (NEPA/Unicamp).</td>
        </tr>
      </tfoot>
    </table>
  )
}