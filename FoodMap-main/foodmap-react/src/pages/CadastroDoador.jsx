import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/cadastro.css'
import { useDoacoes } from '../context/DoacoesContext.jsx'

/* =====================================================
   FOODMAP — Cadastro de Doador (funcionalidade nova)

   O doador preenche os dados da doação e ela entra na
   mesma lista que o Mapa usa. Ou seja: assim que envia,
   a doação já aparece como pino no mapa e como card no
   painel logístico, sem recarregar a página.
   ===================================================== */

/* Cada tipo de alimento usa um ícone que já existe em assets/ */
const tiposDeAlimento = [
  { valor: 'Refeições Prontas', icone: 'restaurante.png' },
  { valor: 'Hortaliças e Verduras', icone: 'salada.png' },
  { valor: 'Pães e Frios', icone: 'pao.png' },
  { valor: 'Itens não perecíveis', icone: 'relacionamento-com-o-cliente.png' },
]

/* Como o cadastro é só front-end, cada região já vem com uma
   coordenada fixa para o pino cair no lugar certo do mapa */
const regioes = [
  { valor: 'Centro', lat: -23.5505, lng: -46.6333 },
  { valor: 'Zona Norte', lat: -23.5, lng: -46.63 },
  { valor: 'Zona Sul', lat: -23.65, lng: -46.7 },
  { valor: 'Zona Leste', lat: -23.54, lng: -46.5 },
  { valor: 'Zona Oeste', lat: -23.56, lng: -46.73 },
]

export default function CadastroDoador() {
  const { adicionarDoacao } = useDoacoes()

  // Guarda o que foi digitado em cada campo do formulário
  const [origem, setOrigem] = useState('')
  const [tipoAlimento, setTipoAlimento] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [validade, setValidade] = useState('')
  const [horario, setHorario] = useState('')
  const [regiao, setRegiao] = useState('')

  // Guarda as mensagens de erro de cada campo
  const [erros, setErros] = useState({})

  // Controla o aviso de sucesso que aparece depois do envio
  const [enviado, setEnviado] = useState(false)

  /* VALIDAÇÃO
     Devolve um objeto com os campos que estão errados.
     Se o objeto vier vazio, está tudo certo. */
  function validar() {
    const novosErros = {}

    if (origem.trim() === '') {
      novosErros.origem = 'Informe o nome do doador ou estabelecimento.'
    }
    if (tipoAlimento === '') {
      novosErros.tipoAlimento = 'Selecione o tipo de alimento.'
    }
    if (quantidade.trim() === '') {
      novosErros.quantidade = 'Informe a quantidade disponível.'
    }
    if (validade === '') {
      novosErros.validade = 'Informe a data de validade.'
    }
    if (horario.trim() === '') {
      novosErros.horario = 'Informe o horário disponível para retirada.'
    }
    if (regiao === '') {
      novosErros.regiao = 'Selecione a região da retirada.'
    }

    return novosErros
  }

  /* ENVIO DO FORMULÁRIO */
  function enviarFormulario(evento) {
    evento.preventDefault()

    const novosErros = validar()
    setErros(novosErros)

    // Se achou algum erro, para por aqui e não cadastra
    if (Object.keys(novosErros).length > 0) {
      setEnviado(false)
      return
    }

    // Descobre o ícone do tipo escolhido e a coordenada da região
    const tipoEscolhido = tiposDeAlimento.find(function (item) {
      return item.valor === tipoAlimento
    })
    const regiaoEscolhida = regioes.find(function (item) {
      return item.valor === regiao
    })

    // Monta a doação no mesmo formato das que já existiam
    adicionarDoacao({
      tipo: 'doador',
      nome: tipoAlimento,
      origem: origem,
      oferta: quantidade + ' — retirada ' + horario,
      lat: regiaoEscolhida.lat,
      lng: regiaoEscolhida.lng,
      icone: tipoEscolhido.icone,
      atualizado: 'Cadastrado agora',
      volume: 'Volume: ' + quantidade,
      retirada: 'Retirada: ' + horario,
      distancia: 'Região: ' + regiao,
      validade: validade,
    })

    // Limpa o formulário e mostra o aviso de sucesso
    setOrigem('')
    setTipoAlimento('')
    setQuantidade('')
    setValidade('')
    setHorario('')
    setRegiao('')
    setEnviado(true)
  }

  return (
    <section className="cadastro-section">
      <div className="container cadastro-container">
        <div className="cadastro-texto">
          <h1 className="cadastro-titulo">Cadastrar Doação</h1>
          <p className="cadastro-descricao">
            Preencha os dados do alimento disponível. Assim que confirmar, a
            doação aparece no mapa e no painel logístico para quem estiver
            procurando na sua região.
          </p>
        </div>

        <form className="cadastro-form" onSubmit={enviarFormulario}>
          {/* ── Nome do doador ── */}
          <div className="form-group">
            <label htmlFor="origem">
              Doador ou Estabelecimento <span className="obrigatorio">*</span>
            </label>
            <input
              type="text"
              id="origem"
              placeholder="Ex: Restaurante Sabor Bom"
              value={origem}
              className={erros.origem ? 'campo-invalido' : ''}
              onChange={function (evento) {
                setOrigem(evento.target.value)
              }}
            />
            {erros.origem && (
              <span className="mensagem-erro">{erros.origem}</span>
            )}
          </div>

          {/* ── Tipo de alimento ── */}
          <div className="form-group">
            <label htmlFor="tipoAlimento">
              Tipo de Alimento <span className="obrigatorio">*</span>
            </label>
            <select
              id="tipoAlimento"
              value={tipoAlimento}
              className={erros.tipoAlimento ? 'campo-invalido' : ''}
              onChange={function (evento) {
                setTipoAlimento(evento.target.value)
              }}
            >
              <option value="">Selecione o tipo</option>
              {tiposDeAlimento.map(function (item) {
                return (
                  <option key={item.valor} value={item.valor}>
                    {item.valor}
                  </option>
                )
              })}
            </select>
            {erros.tipoAlimento && (
              <span className="mensagem-erro">{erros.tipoAlimento}</span>
            )}
          </div>

          {/* ── Quantidade e Validade ── */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantidade">
                Quantidade <span className="obrigatorio">*</span>
              </label>
              <input
                type="text"
                id="quantidade"
                placeholder="Ex: 15 marmitas, 30kg"
                value={quantidade}
                className={erros.quantidade ? 'campo-invalido' : ''}
                onChange={function (evento) {
                  setQuantidade(evento.target.value)
                }}
              />
              {erros.quantidade && (
                <span className="mensagem-erro">{erros.quantidade}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="validade">
                Validade <span className="obrigatorio">*</span>
              </label>
              <input
                type="date"
                id="validade"
                value={validade}
                className={erros.validade ? 'campo-invalido' : ''}
                onChange={function (evento) {
                  setValidade(evento.target.value)
                }}
              />
              {erros.validade && (
                <span className="mensagem-erro">{erros.validade}</span>
              )}
            </div>
          </div>

          {/* ── Horário e Região ── */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="horario">
                Horário para Retirada <span className="obrigatorio">*</span>
              </label>
              <input
                type="text"
                id="horario"
                placeholder="Ex: das 18h às 20h"
                value={horario}
                className={erros.horario ? 'campo-invalido' : ''}
                onChange={function (evento) {
                  setHorario(evento.target.value)
                }}
              />
              {erros.horario && (
                <span className="mensagem-erro">{erros.horario}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="regiao">
                Região <span className="obrigatorio">*</span>
              </label>
              <select
                id="regiao"
                value={regiao}
                className={erros.regiao ? 'campo-invalido' : ''}
                onChange={function (evento) {
                  setRegiao(evento.target.value)
                }}
              >
                <option value="">Selecione a região</option>
                {regioes.map(function (item) {
                  return (
                    <option key={item.valor} value={item.valor}>
                      {item.valor}
                    </option>
                  )
                })}
              </select>
              {erros.regiao && (
                <span className="mensagem-erro">{erros.regiao}</span>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary cadastro-botao">
            Cadastrar Doação
          </button>

          {/* Aviso que aparece só depois de cadastrar com sucesso */}
          {enviado && (
            <div className="cadastro-sucesso">
              <p className="sucesso-titulo">Doação cadastrada!</p>
              <p className="sucesso-texto">
                Ela já está no mapa e no painel logístico.
              </p>
              <Link to="/mapa" className="btn btn-outline">
                Ver no Mapa
              </Link>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
