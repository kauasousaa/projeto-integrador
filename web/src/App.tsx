import { useEffect, useState } from 'react'
import { TelaLogin } from './pages/login/TelaLogin'
import { TelaLobby } from './pages/lobby/TelaLobby'
import { TelaPersonagem } from './pages/personagem/TelaPersonagem'
import { TelaPrimordios } from './pages/fase/TelaPrimordios'
import { TelaTiro } from './pages/tiro/TelaTiro'
import { buscarAparencia } from './services/api/aparencia'
import { CHAVE_SESSAO } from './constants/sessao'
import type { Aparencia } from './types/aparencia'
import type { SessaoCriada } from './types/sessao'

type Etapa = 'carregando' | 'personagem' | 'lobby' | 'primordios' | 'tiro'

export default function App() {
  const [sessaoPronta, setSessaoPronta] = useState(false)
  const [sessao, setSessao] = useState<SessaoCriada | null>(null)
  const [etapa, setEtapa] = useState<Etapa>('carregando')
  const [aparencia, setAparencia] = useState<Aparencia | null>(null)

  useEffect(() => {
    const salva = localStorage.getItem(CHAVE_SESSAO)
    if (!salva) {
      setSessaoPronta(true)
      return
    }
    try {
      setSessao(JSON.parse(salva) as SessaoCriada)
    } catch {
      localStorage.removeItem(CHAVE_SESSAO)
    }
    setSessaoPronta(true)
  }, [])

  useEffect(() => {
    if (!sessao) {
      return
    }
    let ativo = true
    buscarAparencia(sessao.codigo)
      .then((salva) => {
        if (!ativo) {
          return
        }
        setAparencia((atual) => (atual?.salva ? atual : salva))
        setEtapa((atual) =>
          atual === 'lobby' || atual === 'primordios' || atual === 'tiro'
            ? atual
            : salva.salva
              ? 'lobby'
              : 'personagem',
        )
      })
      .catch(() => {
        if (ativo) {
          setEtapa('personagem')
        }
      })
    return () => {
      ativo = false
    }
  }, [sessao])

  function entrar(criada: SessaoCriada) {
    localStorage.setItem(CHAVE_SESSAO, JSON.stringify(criada))
    setSessao(criada)
    setEtapa('personagem')
  }

  function trocarNome() {
    localStorage.removeItem(CHAVE_SESSAO)
    setSessao(null)
    setAparencia(null)
    setEtapa('personagem')
  }

  if (!sessaoPronta || (sessao && etapa === 'carregando')) {
    return <main className="abrindo">Abrindo o museu...</main>
  }

  if (!sessao) {
    return <TelaLogin onEntrar={entrar} />
  }

  if (etapa === 'tiro' && aparencia) {
    return <TelaTiro aparencia={aparencia} onVoltar={() => setEtapa('lobby')} />
  }

  if (etapa === 'primordios' && aparencia) {
    return (
      <TelaPrimordios
        aparencia={aparencia}
        onVoltar={() => setEtapa('lobby')}
        onConcluir={() => setEtapa('tiro')}
      />
    )
  }

  if (etapa === 'lobby' && aparencia) {
    return (
      <TelaLobby
        sessao={sessao}
        aparencia={aparencia}
        onAjustarVisual={() => setEtapa('personagem')}
        onTrocarNome={trocarNome}
        onEntrarPrimordios={() => setEtapa('primordios')}
      />
    )
  }

  return (
    <TelaPersonagem
      sessao={sessao}
      onTrocarNome={trocarNome}
      onEntrar={(salva) => {
        setAparencia(salva)
        setEtapa('lobby')
      }}
    />
  )
}
