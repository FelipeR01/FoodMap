import { restaurantesPorAlimento } from './restaurantes.js'

// Valores por porção, conforme a Tabela Brasileira de Composição de Alimentos (TACO - NEPA/Unicamp).
const destaques = [
  {
    id: 'feijao',
    nome: 'Feijão carioca',
    descricao: 'Proteína vegetal e fibra, base do prato brasileiro.',
    icone: '🫘',
    nutricao: {
      porcao: '100 g (cozido)',
      calorias: 76,
      proteina: 4.8,
      carboidrato: 13.6,
      gordura: 0.5,
      fibra: 8.5,
    },
  },
  {
    id: 'ovo',
    nome: 'Ovo',
    descricao: 'Proteína completa, barata e fácil de preparar.',
    icone: '🥚',
    nutricao: {
      porcao: '100 g (cozido)',
      calorias: 146,
      proteina: 13.3,
      carboidrato: 0.6,
      gordura: 9.5,
      fibra: 0,
    },
  },
  {
    id: 'banana',
    nome: 'Banana',
    descricao: 'Energia rápida, potássio e fibra.',
    icone: '🍌',
    nutricao: {
      porcao: '100 g (prata, crua)',
      calorias: 98,
      proteina: 1.3,
      carboidrato: 26.0,
      gordura: 0.1,
      fibra: 2.0,
    },
  },
]

export const alimentos = destaques

export function buscarAlimento(id) {
  return (
    alimentos.find(function (alimento) {
      return alimento.id === id
    }) ?? null
  )
}

export function contarRestaurantes(id) {
  return restaurantesPorAlimento(id).length
}
