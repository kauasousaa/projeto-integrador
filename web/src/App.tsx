import { useEffect, useState } from 'react'
import { TelaLogin } from './pages/login/TelaLogin'
import { TelaPersonagem } from './pages/personagem/TelaPersonagem'
import { CHAVE_SESSAO } from './constants/sessao'
import type { SessaoCriada } from './types/sessao'

export default function App() {
  const [sessao, setSessao] = useState<SessaoCriada | null>(null)

  useEffect(() => {
    const salva = localStorage.getItem(CHAVE_SESSAO)
    if (!salva) {
      return
    }
    try {
      setSessao(JSON.parse(salva) as SessaoCriada)
    } catch {
      localStorage.removeItem(CHAVE_SESSAO)
    }
  }, [])

  function entrar(criada: SessaoCriada) {
    localStorage.setItem(CHAVE_SESSAO, JSON.stringify(criada))
    setSessao(criada)
  }

  function trocarNome() {
    localStorage.removeItem(CHAVE_SESSAO)
    setSessao(null)
  }

  if (!sessao) {
    return <TelaLogin onEntrar={entrar} />
  }

  return <TelaPersonagem sessao={sessao} onTrocarNome={trocarNome} />
}
