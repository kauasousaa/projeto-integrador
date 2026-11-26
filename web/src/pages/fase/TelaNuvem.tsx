import { useEffect, useRef, useState } from 'react'
import { MolduraFase } from './MolduraFase'
import './TelaNuvem.css'

type Propriedades = {
  onVoltar: () => void
  onConcluir: () => void
}

type Peca = {
  id: number
  x: number
  y: number
  nome: string
  falha: boolean
}

const PEDIDOS = [
  { nome: 'Docker', texto: '2013. O Docker empacota o programa com tudo o que ele precisa. Assim ele roda igual em qualquer máquina.' },
  { nome: 'React', texto: '2013. O React muda a construção da tela. A interface passa a ser descrita, e o programa atualiza o que a pessoa vê.' },
  { nome: 'Kubernetes', texto: '2014. O Kubernetes organiza muitos programas na nuvem. O software deixa de morar numa máquina só.' },
  { nome: 'LGPD', texto: '2018. A LGPD, no Brasil, muda o projeto: a privacidade dos dados entra desde o começo, não como remendo.' },
  { nome: 'Pix', texto: '2020. O Pix, feito pelo Banco Central, transfere dinheiro na hora. É software público usado pelo país inteiro.' },
  { nome: 'Copilot', texto: '2021. O Copilot sugere código. A inteligência artificial passa a escrever software junto com a pessoa.' },
]

const DISTRACAO = ['Cartão', 'COBOL', 'VisiCalc']

const TEXTO_FALHA =
  'Falha. Um erro numa biblioteca usada por todo mundo, ou uma atualização solta de uma vez, derruba milhões de máquinas. Teste e implantação gradual continuam sendo engenharia.'

export function TelaNuvem({ onVoltar, onConcluir }: Propriedades) {
  const campo = useRef<HTMLDivElement>(null)
  const voltar = useRef(onVoltar)
  const concluir = useRef(onConcluir)
  voltar.current = onVoltar
  concluir.current = onConcluir
  const [pecas, setPecas] = useState<Peca[]>([])
  const [servidor, setServidor] = useState(40)
  const [indice, setIndice] = useState(0)
  const [aviso, setAviso] = useState('Recolha o que a nuvem pede, na ordem da história. A Falha ensina, mas não avança.')
  const [concluida, setConcluida] = useState(false)
  const vivo = useRef({ indice: 0, concluida: false, servidor: 40 })

  useEffect(() => {
    const area = campo.current
    if (!area) {
      return
    }
    const teclas = new Set<string>()
    let lista: Peca[] = []
    let proximoId = 1
    let espera = 0
    let ultimo = performance.now()
    let ativo = true

    const aoPressionar = (evento: KeyboardEvent) => {
      const tecla = evento.key.toLowerCase()
      if (tecla === 'escape') {
        evento.preventDefault()
        if (vivo.current.concluida) {
          concluir.current()
        } else {
          voltar.current()
        }
        return
      }
      if (tecla === 'a' || tecla === 'd' || tecla === 'arrowleft' || tecla === 'arrowright') {
        evento.preventDefault()
        teclas.add(tecla)
      }
    }
    const aoSoltar = (evento: KeyboardEvent) => {
      teclas.delete(evento.key.toLowerCase())
    }
    window.addEventListener('keydown', aoPressionar)
    window.addEventListener('keyup', aoSoltar)

    let quadro = 0
    const loop = (agora: number) => {
      if (!ativo) {
        return
      }
      const dt = Math.min(0.033, (agora - ultimo) / 1000)
      ultimo = agora
      if (!vivo.current.concluida) {
        let direcao = 0
        if (teclas.has('a') || teclas.has('arrowleft')) {
          direcao -= 1
        }
        if (teclas.has('d') || teclas.has('arrowright')) {
          direcao += 1
        }
        vivo.current.servidor = Math.min(78, Math.max(4, vivo.current.servidor + direcao * 62 * dt))
        espera -= dt
        const pedidoAtual = PEDIDOS[vivo.current.indice]
        if (espera <= 0 && pedidoAtual) {
          espera = 1.15
          const sorteio = proximoId % 3
          const falha = sorteio === 0
          lista = [
            ...lista,
            {
              id: proximoId,
              x: 8 + Math.random() * 62,
              y: -8,
              falha,
              nome: falha ? 'Falha' : sorteio === 1 ? DISTRACAO[proximoId % DISTRACAO.length] : pedidoAtual.nome,
            },
          ]
          proximoId += 1
        }
        const altura = area.clientHeight
        const largura = area.clientWidth
        const linha = altura - 170
        const servidorX = (vivo.current.servidor / 100) * largura
        const restantes: Peca[] = []
        for (const peca of lista) {
          const y = peca.y + 78 * dt
          const pecaX = (peca.x / 100) * largura
          const encostou = y > linha && y < linha + 28 && pecaX < servidorX + 140 && pecaX + 78 > servidorX
          if (encostou) {
            const pedido = PEDIDOS[vivo.current.indice]
            if (peca.falha) {
              setAviso(TEXTO_FALHA)
            } else if (pedido && peca.nome === pedido.nome) {
              setAviso(pedido.texto)
              vivo.current.indice += 1
              setIndice(vivo.current.indice)
              if (vivo.current.indice >= PEDIDOS.length) {
                vivo.current.concluida = true
                setConcluida(true)
              }
            } else if (pedido) {
              setAviso(`${peca.nome} é de outra época. A nuvem pediu ${pedido.nome}.`)
            }
            continue
          }
          if (y < altura) {
            restantes.push({ ...peca, y })
          }
        }
        lista = restantes
        setServidor(vivo.current.servidor)
        setPecas(lista)
      }
      quadro = requestAnimationFrame(loop)
    }
    quadro = requestAnimationFrame(loop)

    return () => {
      ativo = false
      cancelAnimationFrame(quadro)
      window.removeEventListener('keydown', aoPressionar)
      window.removeEventListener('keyup', aoSoltar)
    }
  }, [])

  return (
    <MolduraFase
      tema="futuro"
      selo="fase 05 · 2010–hoje"
      titulo="Era digital"
      controles="A D e as setas movem o servidor. Recolha o nome pedido. A Falha ensina e não conta. Esc volta ao museu."
      concluida={concluida}
      resumoTitulo="O software de agora"
      resumoTexto="O programa foi para a nuvem, a tela virou React, a LGPD pôs a privacidade no projeto, o Pix mostrou software público e a IA começou a escrever código."
      onVoltar={onVoltar}
      onConcluir={onConcluir}
    >
      <div className={aviso.startsWith('Falha') ? 'ceu abalado' : 'ceu'} ref={campo}>
        {pecas.map((peca) => (
          <span
            key={peca.id}
            className={peca.falha ? 'bloco falha' : 'bloco'}
            style={{ left: `${peca.x}%`, top: peca.y }}
          >
            {peca.nome}
          </span>
        ))}
        <div className="servidor" style={{ left: `${servidor}%` }}>
          <span />
          <span />
          <span />
        </div>
      </div>
      <p className="dica">
        <strong>
          {PEDIDOS[indice] ? `Recolha ${PEDIDOS[indice].nome}.` : 'História completa.'}
        </strong>{' '}
        {aviso}
      </p>
    </MolduraFase>
  )
}
