import { useEffect, useState } from 'react'
import { TelaLogin } from './pages/login/TelaLogin'
import { TelaLobby } from './pages/lobby/TelaLobby'
import { TelaPersonagem } from './pages/personagem/TelaPersonagem'
import {
  PROVA_EXPANSAO,
  PROVA_FUNDACAO,
  PROVA_INTERNET,
  PROVA_NUVEM,
  PROVA_PRIMORDIOS,
  type Prova,
} from './features/jogo/fase/provas'
import { TelaExpansao } from './pages/fase/TelaExpansao'
import { TelaFundacao } from './pages/fase/TelaFundacao'
import { TelaInternet } from './pages/fase/TelaInternet'
import { TelaNuvem } from './pages/fase/TelaNuvem'
import { TelaPrimordios } from './pages/fase/TelaPrimordios'
import { TelaTiro } from './pages/tiro/TelaTiro'
import { buscarAparencia } from './services/api/aparencia'
import { CHAVE_SESSAO } from './constants/sessao'
import type { Aparencia } from './types/aparencia'
import type { SessaoCriada } from './types/sessao'

type Etapa =
  | 'carregando'
  | 'personagem'
  | 'lobby'
  | 'primordios'
  | 'fundacao'
  | 'expansao'
  | 'internet'
  | 'nuvem'
  | 'tiro'

function visitaEmAndamento(etapa: Etapa) {
  return etapa !== 'carregando' && etapa !== 'personagem'
}

export default function App() {
  const [sessaoPronta, setSessaoPronta] = useState(false)
  const [sessao, setSessao] = useState<SessaoCriada | null>(null)
  const [etapa, setEtapa] = useState<Etapa>('carregando')
  const [aparencia, setAparencia] = useState<Aparencia | null>(null)
  const [prova, setProva] = useState<Prova>(PROVA_PRIMORDIOS)

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
        setEtapa((atual) => (visitaEmAndamento(atual) ? atual : salva.salva ? 'lobby' : 'personagem'))
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
    return <TelaTiro aparencia={aparencia} prova={prova} onVoltar={() => setEtapa('lobby')} />
  }

  if (etapa === 'nuvem' && aparencia) {
    return (
      <TelaNuvem
        onVoltar={() => setEtapa('lobby')}
        onConcluir={() => {
          setProva(PROVA_NUVEM)
          setEtapa('tiro')
        }}
      />
    )
  }

  if (etapa === 'internet' && aparencia) {
    return (
      <TelaInternet
        aparencia={aparencia}
        onVoltar={() => setEtapa('lobby')}
        onConcluir={() => {
          setProva(PROVA_INTERNET)
          setEtapa('tiro')
        }}
      />
    )
  }

  if (etapa === 'expansao' && aparencia) {
    return (
      <TelaExpansao
        onVoltar={() => setEtapa('lobby')}
        onConcluir={() => {
          setProva(PROVA_EXPANSAO)
          setEtapa('tiro')
        }}
      />
    )
  }

  if (etapa === 'fundacao' && aparencia) {
    return (
      <TelaFundacao
        aparencia={aparencia}
        onVoltar={() => setEtapa('lobby')}
        onConcluir={() => {
          setProva(PROVA_FUNDACAO)
          setEtapa('tiro')
        }}
      />
    )
  }

  if (etapa === 'primordios' && aparencia) {
    return (
      <TelaPrimordios
        aparencia={aparencia}
        onVoltar={() => setEtapa('lobby')}
        onConcluir={() => {
          setProva(PROVA_PRIMORDIOS)
          setEtapa('tiro')
        }}
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
        onEntrarFase={(fase) => {
          const destino = {
            PRIMORDIOS: 'primordios',
            FUNDACAO: 'fundacao',
            EXPANSAO: 'expansao',
            INTERNET: 'internet',
            ERA_DIGITAL: 'nuvem',
          } as const
          setEtapa(destino[fase])
        }}
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
