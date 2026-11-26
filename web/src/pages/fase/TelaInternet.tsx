import { useEffect, useRef, useState } from 'react'
import { SpritePersonagem } from '../../features/jogo/components/SpritePersonagem'
import type { Aparencia } from '../../types/aparencia'
import { MolduraFase } from './MolduraFase'
import './TelaInternet.css'

type Propriedades = {
  aparencia: Aparencia
  onVoltar: () => void
  onConcluir: () => void
}

type No = {
  id: string
  x: number
  y: number
  nome: string
  texto: string
  destino?: boolean
}

const NOS: No[] = [
  {
    id: 'cern',
    x: 10,
    y: 46,
    nome: 'CERN',
    texto: '1991. Tim Berners-Lee publica a World Wide Web no CERN: página, endereço e o protocolo que liga uma máquina à outra.',
  },
  {
    id: 'linux',
    x: 10,
    y: 22,
    nome: 'Linux',
    texto: '1991. Linus Torvalds publica o Linux. O código livre vira a base de servidores, da nuvem e de boa parte da internet.',
  },
  {
    id: 'mosaic',
    x: 28,
    y: 46,
    nome: 'Mosaic',
    texto: '1993. O Mosaic é o primeiro navegador gráfico popular. A rede deixa de ser só texto de especialista e passa a ser página.',
  },
  {
    id: 'lua',
    x: 28,
    y: 72,
    nome: 'Lua',
    texto: '1993. Na PUC-Rio, Ierusalimschy, Figueiredo e Celes criam Lua. É a linguagem nascida no Brasil que entra em jogos, Adobe e TV digital.',
  },
  {
    id: 'java',
    x: 46,
    y: 46,
    nome: 'Java',
    texto: '1995. O Java promete escrever uma vez e rodar em qualquer lugar. No mesmo ano, Brendan Eich cria o JavaScript, a linguagem da página.',
  },
  {
    id: 'agil',
    x: 62,
    y: 46,
    nome: 'Ágil',
    texto: '2001. O Manifesto Ágil responde aos processos pesados: software em ciclos curtos, com gente falando com gente, em vez de um plano que não muda.',
  },
  {
    id: 'lojas',
    x: 78,
    y: 46,
    nome: 'Lojas',
    texto: '2007 e 2008. O iPhone e as lojas de aplicativo mudam a distribuição. O programa passa a ser baixado no bolso, não instalado de um disco.',
  },
  {
    id: 'www',
    x: 92,
    y: 46,
    nome: 'Página',
    texto: 'A página abre. O software não mora mais numa máquina só: ele é link, navegador, código livre e aplicativo.',
    destino: true,
  },
]

const LIGACOES = [
  ['cern', 'linux'],
  ['cern', 'mosaic'],
  ['mosaic', 'lua'],
  ['mosaic', 'java'],
  ['java', 'agil'],
  ['agil', 'lojas'],
  ['lojas', 'www'],
]

const TRAVA: Record<string, { exige: string; aviso: string }> = {
  mosaic: { exige: 'linux', aviso: 'Suba até o Linux antes. O código livre também segura essa rede.' },
  java: { exige: 'lua', aviso: 'Desça até a Lua. O Brasil escreve uma linguagem nesta mesma época.' },
}

function noPorId(id: string) {
  const no = NOS.find((item) => item.id === id)
  if (!no) {
    throw new Error(`Nó ${id} não existe`)
  }
  return no
}

function vizinhos(id: string) {
  return LIGACOES.filter((par) => par.includes(id)).map((par) => noPorId(par[0] === id ? par[1] : par[0]))
}

export function TelaInternet({ aparencia, onVoltar, onConcluir }: Propriedades) {
  const voltar = useRef(onVoltar)
  const concluir = useRef(onConcluir)
  voltar.current = onVoltar
  concluir.current = onConcluir
  const [atualId, setAtualId] = useState('cern')
  const [concluida, setConcluida] = useState(false)
  const [trava, setTrava] = useState('')
  const vistos = useRef(new Set(['cern']))
  const atual = noPorId(atualId)

  useEffect(() => {
    const aoPressionar = (evento: KeyboardEvent) => {
      const tecla = evento.key.toLowerCase()
      if (tecla === 'escape') {
        evento.preventDefault()
        if (concluida) {
          concluir.current()
        } else {
          voltar.current()
        }
        return
      }
      if (concluida || evento.repeat) {
        return
      }
      let dx = 0
      let dy = 0
      if (tecla === 'a' || tecla === 'arrowleft') {
        dx = -1
      } else if (tecla === 'd' || tecla === 'arrowright') {
        dx = 1
      } else if (tecla === 'w' || tecla === 'arrowup') {
        dy = -1
      } else if (tecla === 's' || tecla === 'arrowdown') {
        dy = 1
      } else {
        return
      }
      evento.preventDefault()
      setAtualId((id) => {
        const aqui = noPorId(id)
        let melhor: No | null = null
        let melhorNota = 0.5
        for (const outro of vizinhos(id)) {
          const vx = outro.x - aqui.x
          const vy = outro.y - aqui.y
          const comprimento = Math.hypot(vx, vy)
          const nota = (vx / comprimento) * dx + (vy / comprimento) * dy
          if (nota > melhorNota) {
            melhorNota = nota
            melhor = outro
          }
        }
        if (!melhor) {
          return id
        }
        const travaDoCaminho = TRAVA[melhor.id]
        if (travaDoCaminho && !vistos.current.has(travaDoCaminho.exige)) {
          setTrava(travaDoCaminho.aviso)
          return id
        }
        vistos.current.add(melhor.id)
        setTrava('')
        if (melhor.destino) {
          setConcluida(true)
        }
        return melhor.id
      })
    }
    window.addEventListener('keydown', aoPressionar)
    return () => window.removeEventListener('keydown', aoPressionar)
  }, [concluida])

  return (
    <MolduraFase
      tema="rede"
      selo="fase 04 · 1990–2009"
      titulo="Internet"
      controles="W A S D e as setas mudam de nó. Visite Linux e Lua antes de seguir. Esc volta ao museu."
      concluida={concluida}
      resumoTitulo="O software passou a ser rede"
      resumoTexto="A Web, o Linux, o navegador, a Lua feita no Brasil, Java, o ágil e a loja de aplicativos. O programa deixa de morar numa máquina só."
      onVoltar={onVoltar}
      onConcluir={onConcluir}
    >
      <div className="mapa" aria-label="Mapa da rede. Leve o pacote do CERN até a Página.">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          {LIGACOES.map(([origem, destino]) => {
            const a = noPorId(origem)
            const b = noPorId(destino)
            return <line key={`${origem}-${destino}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
          })}
        </svg>
        {NOS.map((no) => (
          <div
            key={no.id}
            className={no.id === atualId ? 'no aqui' : no.destino ? 'no destino' : 'no'}
            style={{ left: `${no.x}%`, top: `${no.y}%` }}
          >
            {no.nome}
          </div>
        ))}
        <div className="pacote" style={{ left: `${atual.x}%`, top: `${atual.y}%` }}>
          <SpritePersonagem aparencia={aparencia} escala={2} />
        </div>
      </div>
      <p className="dica">
        <strong>{atual.nome}.</strong> {trava || atual.texto}
      </p>
    </MolduraFase>
  )
}
