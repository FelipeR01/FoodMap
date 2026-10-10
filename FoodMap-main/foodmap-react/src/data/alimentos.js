import { ALIMENTOS, restaurantesPorAlimento } from './restaurantes.js'

// Meta de distribuição dos macronutrientes definida pelo grupo, em % das calorias.
export const META_MACROS = {
  proteina: 40,
  carboidrato: 30,
  gordura: 30,
}

// Valores por porção, conforme a Tabela Brasileira de Composição de Alimentos (TACO - NEPA/Unicamp).
// O grupo de cada alimento vem do ALIMENTOS, em restaurantes.js, para não duplicar essa informação.
const fichas = [
  // Legumes e verduras
  {
    id: 'cenoura',
    nome: 'Cenoura',
    descricao: 'Fonte de betacaroteno, com poucas calorias.',
    icone: '🥕',
    nutricao: { porcao: '100 g (crua)', calorias: 34, proteina: 1.3, carboidrato: 7.7, gordura: 0.2, fibra: 3.2 },
  },
  {
    id: 'batata_doce',
    nome: 'Batata doce',
    descricao: 'Carboidrato de absorção lenta, dá saciedade.',
    icone: '🍠',
    nutricao: { porcao: '100 g (cozida)', calorias: 77, proteina: 0.6, carboidrato: 18.4, gordura: 0.1, fibra: 2.2 },
  },
  {
    id: 'brocolis',
    nome: 'Brócolis',
    descricao: 'Rico em fibra, cálcio e vitamina C.',
    icone: '🥦',
    nutricao: { porcao: '100 g (cozido)', calorias: 25, proteina: 2.1, carboidrato: 4.4, gordura: 0.5, fibra: 3.4 },
  },
  {
    id: 'abobora',
    nome: 'Abóbora',
    descricao: 'Leve, adocicada e fácil de armazenar.',
    icone: '🎃',
    nutricao: { porcao: '100 g (cabotiá, cozida)', calorias: 48, proteina: 1.4, carboidrato: 11.0, gordura: 0.5, fibra: 2.5 },
  },
  {
    id: 'couve',
    nome: 'Couve',
    descricao: 'Folha de alto valor nutritivo e baixo custo.',
    icone: '🥬',
    nutricao: { porcao: '100 g (manteiga, cozida)', calorias: 27, proteina: 1.7, carboidrato: 4.3, gordura: 0.5, fibra: 3.1 },
  },

  // Laticínios
  {
    id: 'queijo_mussarela_bufala',
    nome: 'Queijo mussarela de búfala',
    descricao: 'Proteína e cálcio, com bastante gordura.',
    icone: '🧀',
    nutricao: { porcao: '100 g', calorias: 330, proteina: 22.6, carboidrato: 3.0, gordura: 25.2, fibra: 0 },
  },
  {
    id: 'queijo_minas',
    nome: 'Queijo minas',
    descricao: 'Queijo fresco, boa fonte de cálcio.',
    icone: '🧀',
    nutricao: { porcao: '100 g (frescal)', calorias: 264, proteina: 17.4, carboidrato: 3.2, gordura: 20.2, fibra: 0 },
  },
  {
    id: 'ricota',
    nome: 'Ricota',
    descricao: 'Versão mais leve, com menos gordura.',
    icone: '🧀',
    nutricao: { porcao: '100 g', calorias: 140, proteina: 12.6, carboidrato: 3.8, gordura: 8.1, fibra: 0 },
  },
  {
    id: 'peito_de_peru',
    nome: 'Peito de peru',
    descricao: 'Frio magro, prático para montar refeições.',
    icone: '🦃',
    nutricao: { porcao: '100 g (defumado)', calorias: 95, proteina: 17.4, carboidrato: 2.0, gordura: 1.9, fibra: 0 },
  },
  {
    id: 'iogurte',
    nome: 'Iogurte',
    descricao: 'Proteína e cálcio em porção pequena.',
    icone: '🥛',
    nutricao: { porcao: '100 g (natural)', calorias: 51, proteina: 4.0, carboidrato: 1.9, gordura: 3.0, fibra: 0 },
  },

  // Carnes, aves, peixes e ovos
  {
    id: 'file_mignon',
    nome: 'Filé mignon',
    descricao: 'Corte magro, com ferro e muita proteína.',
    icone: '🥩',
    nutricao: { porcao: '100 g (grelhado)', calorias: 220, proteina: 32.8, carboidrato: 0, gordura: 8.8, fibra: 0 },
  },
  {
    id: 'peito_de_frango',
    nome: 'Peito de frango',
    descricao: 'Muita proteína e pouca gordura.',
    icone: '🍗',
    nutricao: { porcao: '100 g (grelhado, sem pele)', calorias: 159, proteina: 32.0, carboidrato: 0, gordura: 2.5, fibra: 0 },
  },
  {
    id: 'tilapia',
    nome: 'Tilápia',
    descricao: 'Peixe magro, de sabor suave.',
    icone: '🐟',
    nutricao: { porcao: '100 g (filé, cru)', calorias: 96, proteina: 20.1, carboidrato: 0, gordura: 1.7, fibra: 0 },
  },
  {
    id: 'salmao',
    nome: 'Salmão',
    descricao: 'Proteína com gordura boa, do tipo ômega-3.',
    icone: '🐠',
    nutricao: { porcao: '100 g (grelhado)', calorias: 243, proteina: 23.9, carboidrato: 0, gordura: 16.2, fibra: 0 },
  },
  {
    id: 'ovo',
    nome: 'Ovo',
    descricao: 'Proteína completa, barata e fácil de preparar.',
    icone: '🥚',
    nutricao: { porcao: '100 g (cozido)', calorias: 146, proteina: 13.3, carboidrato: 0.6, gordura: 9.5, fibra: 0 },
  },

  // Grãos
  {
    id: 'arroz',
    nome: 'Arroz',
    descricao: 'Energia barata, base do prato brasileiro.',
    icone: '🍚',
    nutricao: { porcao: '100 g (branco, cozido)', calorias: 128, proteina: 2.5, carboidrato: 28.1, gordura: 0.2, fibra: 1.6 },
  },
  {
    id: 'milho',
    nome: 'Milho',
    descricao: 'Carboidrato com fibra, aceita bem conserva.',
    icone: '🌽',
    nutricao: { porcao: '100 g (verde, cozido)', calorias: 98, proteina: 3.2, carboidrato: 18.7, gordura: 1.0, fibra: 3.9 },
  },
  {
    id: 'aveia',
    nome: 'Aveia',
    descricao: 'Fibra que ajuda a segurar a fome.',
    icone: '🌾',
    nutricao: { porcao: '100 g (em flocos)', calorias: 394, proteina: 13.9, carboidrato: 66.6, gordura: 8.5, fibra: 9.1 },
  },
  {
    id: 'paes',
    nome: 'Pães',
    descricao: 'Energia rápida, com prazo de validade curto.',
    icone: '🍞',
    nutricao: { porcao: '100 g (francês)', calorias: 300, proteina: 8.0, carboidrato: 58.6, gordura: 3.1, fibra: 2.3 },
  },

  // Frutas
  {
    id: 'abacate',
    nome: 'Abacate',
    descricao: 'Fruta rica em gordura boa e fibra.',
    icone: '🥑',
    nutricao: { porcao: '100 g (cru)', calorias: 96, proteina: 1.2, carboidrato: 6.0, gordura: 8.4, fibra: 6.3 },
  },
  {
    id: 'banana',
    nome: 'Banana',
    descricao: 'Energia rápida, potássio e fibra.',
    icone: '🍌',
    nutricao: { porcao: '100 g (prata, crua)', calorias: 98, proteina: 1.3, carboidrato: 26.0, gordura: 0.1, fibra: 2.0 },
  },
  {
    id: 'maca',
    nome: 'Maçã',
    descricao: 'Fruta resistente, boa para transporte.',
    icone: '🍎',
    nutricao: { porcao: '100 g (com casca)', calorias: 56, proteina: 0.3, carboidrato: 15.2, gordura: 0, fibra: 1.3 },
  },
  {
    id: 'morango',
    nome: 'Morango',
    descricao: 'Poucas calorias e muita vitamina C.',
    icone: '🍓',
    nutricao: { porcao: '100 g (cru)', calorias: 30, proteina: 0.9, carboidrato: 6.8, gordura: 0.3, fibra: 1.7 },
  },
  {
    id: 'pera',
    nome: 'Pera',
    descricao: 'Fruta doce, com boa quantidade de fibra.',
    icone: '🍐',
    nutricao: { porcao: '100 g (crua)', calorias: 53, proteina: 0.6, carboidrato: 14.0, gordura: 0.1, fibra: 3.0 },
  },

  // Oleaginosa
  {
    id: 'feijao',
    nome: 'Feijão carioca',
    descricao: 'Proteína vegetal e fibra, base do prato brasileiro.',
    icone: '🫘',
    nutricao: { porcao: '100 g (cozido)', calorias: 76, proteina: 4.8, carboidrato: 13.6, gordura: 0.5, fibra: 8.5 },
  },
  {
    id: 'lentilha',
    nome: 'Lentilha',
    descricao: 'Proteína vegetal com ferro e fibra.',
    icone: '🥣',
    nutricao: { porcao: '100 g (cozida)', calorias: 93, proteina: 6.3, carboidrato: 16.3, gordura: 0.5, fibra: 7.9 },
  },
  {
    id: 'castanha',
    nome: 'Castanha',
    descricao: 'Muita energia e selênio em pouca quantidade.',
    icone: '🌰',
    nutricao: { porcao: '100 g (do-pará, crua)', calorias: 643, proteina: 14.5, carboidrato: 15.1, gordura: 63.5, fibra: 7.9 },
  },
  {
    id: 'azeite',
    nome: 'Azeite',
    descricao: 'Gordura boa, usada em pouca quantidade.',
    icone: '🫒',
    nutricao: { porcao: '100 ml (de oliva)', calorias: 884, proteina: 0, carboidrato: 0, gordura: 100, fibra: 0 },
  },
]

export const alimentos = fichas.map(function (ficha) {
  return { ...ficha, grupo: ALIMENTOS[ficha.id].grupo }
})

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

// Agrupa os alimentos na mesma ordem em que os grupos aparecem no restaurantes.js.
export function gruposDeAlimentos() {
  const porGrupo = {}
  const ordem = []

  Object.values(ALIMENTOS).forEach(function (item) {
    if (porGrupo[item.grupo] === undefined) {
      porGrupo[item.grupo] = []
      ordem.push(item.grupo)
    }
  })

  alimentos.forEach(function (alimento) {
    porGrupo[alimento.grupo].push(alimento)
  })

  return ordem
    .map(function (nome) {
      return { nome: nome, alimentos: porGrupo[nome] }
    })
    .filter(function (grupo) {
      return grupo.alimentos.length > 0
    })
}
