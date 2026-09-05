import { createContext, useContext, useState } from 'react'

/* =====================================================
   FOODMAP — Contexto de Doações

   Guarda a lista de doações num lugar só, para que
   a página do Mapa e a página de Cadastro de Doador
   enxerguem os MESMOS dados.

   Antes, no site em HTML puro, os dados estavam
   duplicados: os pinos do mapa vinham do array "pontos"
   do mapa.js e os cards do painel estavam escritos à mão
   no HTML. Aqui os dois passam a vir desta mesma lista.
   ===================================================== */

const DoacoesContext = createContext()

/* Lista inicial — são as mesmas 4 doações que já existiam
   no array "pontos" do mapa.js, agora com os campos que
   os cards do painel também precisam */
const doacoesIniciais = [
  {
    id: 1,
    tipo: 'doador', // doador | urgente
    nome: 'Refeições Prontas',
    origem: 'Restaurante Sabor Bom',
    oferta: '15 marmitas para consumo imediato',
    lat: -23.5614, // latitude (posição no mapa)
    lng: -46.6559, // longitude
    icone: 'restaurante.png',
    atualizado: 'Atualizado há 2h',
    historico: '1.2k+ doações concluídas',
    confiabilidade: '98% (Alta Reputação)',
    volume: 'Volume: 15 marmitas',
    retirada: 'Consumo imediato',
    distancia: 'Distância: 1.2 km',
  },
  {
    id: 2,
    tipo: 'urgente',
    nome: 'Itens de Cesta Básica',
    origem: 'Abrigo Esperança',
    oferta: 'Necessita: Arroz (50kg), Feijão (20kg) e Óleo (15L)',
    lat: -23.5895,
    lng: -46.6333,
    icone: 'relacionamento-com-o-cliente.png',
    alerta:
      'Déficit projetado para os próximos 3 dias. Necessidade estrita de: Arroz (50kg), Feijão (20kg) e Óleo (15L) para sustentação de 50 famílias cadastradas.',
    retirada: 'Não perecíveis apenas',
    distancia: 'Distância: 5.0 km',
  },
  {
    id: 3,
    tipo: 'doador',
    nome: 'Hortaliças e Verduras',
    origem: 'Hortifrúti Central',
    oferta: '30kg de hortaliças — retirada hoje',
    lat: -23.532,
    lng: -46.641,
    icone: 'salada.png',
    atualizado: 'Atualizado há 4h',
    historico: '340+ doações concluídas',
    confiabilidade: '87% (Boa Reputação)',
    volume: 'Volume: 30kg',
    retirada: 'Retirada hoje',
    distancia: 'Distância: 2.8 km',
  },
  {
    id: 4,
    tipo: 'doador',
    nome: 'Pães e Frios',
    origem: 'Padaria União',
    oferta: '8kg de pães — consumo imediato',
    lat: -23.57,
    lng: -46.69,
    icone: 'pao.png',
    atualizado: 'Atualizado há 1h',
    historico: '890+ doações concluídas',
    confiabilidade: '94% (Alta Reputação)',
    volume: 'Volume: 8kg',
    retirada: 'Consumo imediato',
    distancia: 'Distância: 0.7 km',
  },
]

/* Componente que "envolve" o site inteiro e distribui os dados */
export function DoacoesProvider({ children }) {
  const [doacoes, setDoacoes] = useState(doacoesIniciais)

  /* Adiciona uma doação nova vinda do formulário de cadastro.
     O id é gerado a partir da data atual só para não repetir. */
  function adicionarDoacao(novaDoacao) {
    setDoacoes(function (listaAtual) {
      return [{ ...novaDoacao, id: Date.now() }, ...listaAtual]
    })
  }

  return (
    <DoacoesContext.Provider value={{ doacoes, adicionarDoacao }}>
      {children}
    </DoacoesContext.Provider>
  )
}

/* Atalho para as páginas lerem os dados sem repetir useContext */
export function useDoacoes() {
  return useContext(DoacoesContext)
}
