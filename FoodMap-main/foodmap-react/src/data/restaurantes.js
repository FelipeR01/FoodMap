// Cada alimento tem: id (código interno, sem acento/espaço), nome (aparece no popup) e grupo
export const ALIMENTOS = {
  // Legumes e verduras
  cenoura: { id: 'cenoura', nome: 'Cenoura', grupo: 'Legumes e verduras' },
  batata_doce: { id: 'batata_doce', nome: 'Batata doce', grupo: 'Legumes e verduras' },
  brocolis: { id: 'brocolis', nome: 'Brócolis', grupo: 'Legumes e verduras' },
  abobora: { id: 'abobora', nome: 'Abóbora', grupo: 'Legumes e verduras' },
  couve: { id: 'couve', nome: 'Couve', grupo: 'Legumes e verduras' },

  // Laticínios
  queijo_mussarela_bufala: { id: 'queijo_mussarela_bufala', nome: 'Queijo mussarela de búfala', grupo: 'Laticínios' },
  queijo_minas: { id: 'queijo_minas', nome: 'Queijo minas', grupo: 'Laticínios' },
  ricota: { id: 'ricota', nome: 'Ricota', grupo: 'Laticínios' },
  peito_de_peru: { id: 'peito_de_peru', nome: 'Peito de peru', grupo: 'Laticínios' },
  iogurte: { id: 'iogurte', nome: 'Iogurte', grupo: 'Laticínios' },

  // Carnes, aves, peixes e ovos
  file_mignon: { id: 'file_mignon', nome: 'Filé mignon', grupo: 'Carnes, aves, peixes e ovos' },
  peito_de_frango: { id: 'peito_de_frango', nome: 'Peito de frango', grupo: 'Carnes, aves, peixes e ovos' },
  tilapia: { id: 'tilapia', nome: 'Tilápia', grupo: 'Carnes, aves, peixes e ovos' },
  salmao: { id: 'salmao', nome: 'Salmão', grupo: 'Carnes, aves, peixes e ovos' },
  ovo: { id: 'ovo', nome: 'Ovo', grupo: 'Carnes, aves, peixes e ovos' },

  // Grãos
  arroz: { id: 'arroz', nome: 'Arroz', grupo: 'Grãos' },
  milho: { id: 'milho', nome: 'Milho', grupo: 'Grãos' },
  aveia: { id: 'aveia', nome: 'Aveia', grupo: 'Grãos' },
  paes: { id: 'paes', nome: 'Pães', grupo: 'Grãos' },

  // Frutas
  abacate: { id: 'abacate', nome: 'Abacate', grupo: 'Frutas' },
  banana: { id: 'banana', nome: 'Banana', grupo: 'Frutas' },
  maca: { id: 'maca', nome: 'Maçã', grupo: 'Frutas' },
  morango: { id: 'morango', nome: 'Morango', grupo: 'Frutas' },
  pera: { id: 'pera', nome: 'Pera', grupo: 'Frutas' },

  // Oleaginosa
  feijao: { id: 'feijao', nome: 'Feijão', grupo: 'Oleaginosa' },
  lentilha: { id: 'lentilha', nome: 'Lentilha', grupo: 'Oleaginosa' },
  castanha: { id: 'castanha', nome: 'Castanha', grupo: 'Oleaginosa' },
  azeite: { id: 'azeite', nome: 'Azeite', grupo: 'Oleaginosa' },
}

// DADOS FICTÍCIOS (demonstrativo): nomes e endereços inventados
export const restaurantes = [
  {
    id: 1,
    nome: 'Sabor da Terra',
    endereco: 'Rua das Flores, 120 - São Paulo, SP',
    latitude: -23.5614,
    longitude: -46.6559,
    alimentos: ['arroz', 'feijao', 'peito_de_frango', 'cenoura', 'couve'],
  },
  {
    id: 2,
    nome: 'Cantina Verde Vida',
    endereco: 'Av. Central, 450 - São Paulo, SP',
    latitude: -23.5505,
    longitude: -46.6333,
    alimentos: ['paes', 'iogurte', 'banana', 'ovo', 'aveia'],
  },
  {
    id: 3,
    nome: 'Mar e Horta',
    endereco: 'Rua do Porto, 88 - São Paulo, SP',
    latitude: -23.5329,
    longitude: -46.6395,
    alimentos: ['salmao', 'tilapia', 'brocolis', 'batata_doce', 'azeite'],
  },
  {
    id: 4,
    nome: 'Fogão da Vovó',
    endereco: 'Rua das Palmeiras, 300 - São Paulo, SP',
    latitude: -23.5870,
    longitude: -46.6580,
    alimentos: ['arroz', 'feijao', 'file_mignon', 'abobora', 'milho'],
  },
  {
    id: 5,
    nome: 'Empório Natural',
    endereco: 'Av. dos Ipês, 75 - São Paulo, SP',
    latitude: -23.5740,
    longitude: -46.6230,
    alimentos: ['queijo_minas', 'ricota', 'maca', 'pera', 'castanha'],
  },
  {
    id: 6,
    nome: 'Bistrô Raízes',
    endereco: 'Rua Verde, 215 - São Paulo, SP',
    latitude: -23.5460,
    longitude: -46.6700,
    alimentos: ['lentilha', 'abacate', 'morango', 'peito_de_peru', 'queijo_mussarela_bufala'],
  },
]

// Para o Matias: restaurantes que oferecem determinado alimento
export function restaurantesPorAlimento(alimentoId) {
  return restaurantes.filter(function (r) {
    return r.alimentos.includes(alimentoId)
  })
}