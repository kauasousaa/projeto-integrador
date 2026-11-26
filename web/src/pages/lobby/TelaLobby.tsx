import { useEffect, useRef, useState } from 'react'
import { montarPersonagem } from '../../features/jogo/pixel/sprites'
import { FASES_LOBBY, type CodigoFase } from '../../features/jogo/lobby/fases'
import {
  MUNDO_ALTURA,
  alaPerto,
  cabe,
  desenharMundo,
  desenharVisitante,
  enquadrar,
  INICIO,
} from '../../features/jogo/lobby/mundo'
import type { Aparencia } from '../../types/aparencia'
import type { SessaoCriada } from '../../types/sessao'
import './TelaLobby.css'

type Propriedades = {
  sessao: SessaoCriada
  aparencia: Aparencia
  onAjustarVisual: () => void
  onTrocarNome: () => void
}

const VELOCIDADE = 100

function teclaDeAndar(tecla: string) {
  return (
    tecla === 'w' ||
    tecla === 'a' ||
    tecla === 's' ||
    tecla === 'd' ||
    tecla === 'arrowup' ||
    tecla === 'arrowdown' ||
    tecla === 'arrowleft' ||
    tecla === 'arrowright'
  )
}

export function TelaLobby({ sessao, aparencia, onAjustarVisual, onTrocarNome }: Propriedades) {
  const palco = useRef<HTMLDivElement>(null)
  const tela = useRef<HTMLCanvasElement>(null)
  const [alaId, setAlaId] = useState<CodigoFase | null>(null)
  const [mostrarDica, setMostrarDica] = useState(true)
  const ala = FASES_LOBBY.find((fase) => fase.id === alaId) ?? null

  useEffect(() => {
    const tempo = window.setTimeout(() => setMostrarDica(false), 8000)
    return () => window.clearTimeout(tempo)
  }, [])

  useEffect(() => {
    const canvas = tela.current
    const area = palco.current
    if (!canvas || !area) {
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    const sprite = document.createElement('canvas')
    sprite.width = 16
    sprite.height = 24
    const pincel = sprite.getContext('2d')
    if (!pincel) {
      return
    }
    pincel.imageSmoothingEnabled = false
    montarPersonagem(aparencia).forEach((linha, y) => {
      linha.forEach((cor, x) => {
        if (!cor) {
          return
        }
        pincel.fillStyle = cor
        pincel.fillRect(x, y, 1, 1)
      })
    })

    const teclas = new Set<string>()
    let x = INICIO.x
    let y = INICIO.y
    let esquerda = false
    let passo = 0
    let perto: CodigoFase | null = null
    let ultimo = performance.now()
    let ativo = true

    const ajustar = () => {
      const zoom = Math.max(2, Math.floor(area.clientHeight / MUNDO_ALTURA))
      canvas.width = Math.max(1, Math.floor(area.clientWidth / zoom))
      canvas.height = MUNDO_ALTURA
      canvas.style.width = `${canvas.width * zoom}px`
      canvas.style.height = `${canvas.height * zoom}px`
    }
    ajustar()
    const observador = new ResizeObserver(ajustar)
    observador.observe(area)

    const aoPressionar = (evento: KeyboardEvent) => {
      const tecla = evento.key.toLowerCase()
      if (!teclaDeAndar(tecla)) {
        return
      }
      evento.preventDefault()
      teclas.add(tecla)
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
      let dx = 0
      let dy = 0
      if (teclas.has('a') || teclas.has('arrowleft')) {
        dx -= 1
      }
      if (teclas.has('d') || teclas.has('arrowright')) {
        dx += 1
      }
      if (teclas.has('w') || teclas.has('arrowup')) {
        dy -= 1
      }
      if (teclas.has('s') || teclas.has('arrowdown')) {
        dy += 1
      }
      const andando = dx !== 0 || dy !== 0
      if (andando) {
        const comprimento = Math.hypot(dx, dy)
        dx /= comprimento
        dy /= comprimento
        const nx = x + dx * VELOCIDADE * dt
        const ny = y + dy * VELOCIDADE * dt
        if (cabe(nx, y)) {
          x = nx
        }
        if (cabe(x, ny)) {
          y = ny
        }
        if (dx < 0) {
          esquerda = true
        }
        if (dx > 0) {
          esquerda = false
        }
        passo += dt * 9
      }
      const balanco = andando && Math.floor(passo) % 2 === 0 ? -1 : 0
      const camera = enquadrar(x, canvas.width)
      ctx.imageSmoothingEnabled = false
      ctx.fillStyle = '#120c22'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.translate(-camera, 0)
      const atual = alaPerto(x, y)
      desenharMundo(ctx, atual)
      desenharVisitante(ctx, sprite, x, y + balanco, esquerda)
      ctx.restore()
      if (atual !== perto) {
        perto = atual
        setAlaId(atual)
      }
      quadro = requestAnimationFrame(loop)
    }
    quadro = requestAnimationFrame(loop)

    return () => {
      ativo = false
      cancelAnimationFrame(quadro)
      observador.disconnect()
      window.removeEventListener('keydown', aoPressionar)
      window.removeEventListener('keyup', aoSoltar)
    }
  }, [aparencia])

  return (
    <main className="tela-lobby">
      <div className="palco" ref={palco}>
        <canvas ref={tela} aria-label="Salão do museu. Ande com W, A, S, D ou as setas." />
      </div>
      <header className="guia">
        <div className="identidade">
          <p className="selo">saguão · museu</p>
          <h1>Museu do Software</h1>
          <p className="visitante">{sessao.apelido}</p>
        </div>
        <div className="acoes">
          <button type="button" className="secundario" onClick={onAjustarVisual}>
            Ajustar visual
          </button>
          <button type="button" className="secundario" onClick={onTrocarNome}>
            Trocar nome
          </button>
        </div>
      </header>
      {(ala || mostrarDica) && (
        <article className="placa" aria-live="polite">
          {ala ? (
            <>
              <p className="numero">fase 0{ala.numero} · {ala.quando}</p>
              <h2>{ala.nome}</h2>
              <p>{ala.tema}</p>
              <p className="aviso">A visita a esta época abre na próxima etapa. A fase ainda não está montada.</p>
            </>
          ) : (
            <p>Ande pelo corredor. O começo fica na entrada. Quanto mais você avança, mais o museu olha para o futuro.</p>
          )}
        </article>
      )}
      <p className="controles">W A S D e as setas para andar. Aproxime-se de um quadro para ler a época.</p>
    </main>
  )
}
