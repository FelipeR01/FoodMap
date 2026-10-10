import { createContext, useContext, useState } from 'react'

const AlimentoContext = createContext(null)

export function AlimentoProvider({ children }) {
  const [alimentoSelecionado, setAlimentoSelecionado] = useState(null)

  function selecionarAlimento(id) {
    setAlimentoSelecionado(function (atual) {
      return atual === id ? null : id
    })
  }

  return (
    <AlimentoContext.Provider value={{ alimentoSelecionado, selecionarAlimento }}>
      {children}
    </AlimentoContext.Provider>
  )
}

export function useAlimento() {
  return useContext(AlimentoContext)
}
