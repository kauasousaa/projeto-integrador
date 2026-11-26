import { useEffect, useRef, useState } from 'react'
import { montarPersonagem } from '../../features/jogo/pixel/sprites'
import {
  INICIO,
  MUNDO_ALTURA,
  avancar,
  desenharFase,
  desenharVisitante,
  encostaPortal,
  enquadrar,
  pisoSeguro,
} from '../../features/jogo/fase/primordios'
import type { Aparencia } from '../../types/aparencia'
import './TelaPrimordios.css'

type Propriedades = {
  aparencia: Aparencia
  onVoltar: () => void
  onConcluir: () => void
}

const VELOCIDADE = 150
const GRAVIDADE = 1200
const PULO = -360

function teclaDeAndar(tecla: string) {
  return tecla === 'a' || tecla === 'd' || tecla === 'arrowleft' || tecla === 'arrowright'
}

function teclaDePulo(tecla: string) {
  return tecla === 'w' || tecla === 'arrowup' || tecla === ' '
}

export function TelaPrimordios({ aparencia, onVoltar, onConcluir }: Propriedades) {
  const palco = useRef<HTMLDivElement>(null)
  const tela = useRef<HTMLCanvasElement>(null)
  const voltar = useRef(onVoltar)
  const concluir = useRef(onConcluir)
  voltar.current = onVoltar
  concluir.current = onConcluir
  const [concluida, setConcluida] = useState(false)

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
    let vy = 0
    let noChao = true
    let esquerda = false
    let passo = 0
    let puloAte = 0
    let chaoAte = 0
    let marco = { x: INICIO.x, y: INICIO.y }
    let terminou = false
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
      if (tecla === 'escape') {
        evento.preventDefault()
        if (terminou) {
          concluir.current()
        } else {
          voltar.current()
        }
        return
      }
      if (!teclaDeAndar(tecla) && !teclaDePulo(tecla)) {
        return
      }
      evento.preventDefault()
      teclas.add(tecla)
      if (teclaDePulo(tecla)) {
        puloAte = performance.now() + 140
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
      let direcao = 0
      if (teclas.has('a') || teclas.has('arrowleft')) {
        direcao -= 1
      }
      if (teclas.has('d') || teclas.has('arrowright')) {
        direcao += 1
      }
      if (direcao < 0) {
        esquerda = true
      }
      if (direcao > 0) {
        esquerda = false
      }
      if (noChao) {
        chaoAte = agora + 90
        if (pisoSeguro(x, y)) {
          marco = { x, y }
        }
      }
      if (agora < puloAte && agora < chaoAte) {
        vy = PULO
        puloAte = 0
        noChao = false
      }
      vy = Math.min(vy + GRAVIDADE * dt, 520)
      const passoX = direcao * VELOCIDADE * dt
      const passoY = vy * dt
      const seguinte = avancar(x, y, passoX, passoY)
      x = seguinte.x
      y = seguinte.y
      noChao = seguinte.noChao
      if (noChao && vy > 0) {
        vy = 0
      }
      if (y > MUNDO_ALTURA) {
        x = marco.x
        y = marco.y
        vy = 0
        noChao = true
      }
      if (!terminou && encostaPortal(x, y)) {
        terminou = true
        setConcluida(true)
      }
      const balanco = direcao !== 0 && noChao && Math.floor(passo) % 2 === 0 ? -1 : 0
      if (direcao !== 0 && noChao) {
        passo += dt * 9
      }
      const camera = enquadrar(x, canvas.width)
      ctx.imageSmoothingEnabled = false
      ctx.fillStyle = '#120c22'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.translate(-camera, 0)
      desenharFase(ctx)
      desenharVisitante(ctx, sprite, x, y + balanco, esquerda)
      ctx.restore()
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
    <main className="tela-fase">
      <div className="palco" ref={palco}>
        <canvas ref={tela} aria-label="Fase Primórdios. Ande com A e D ou as setas. Pule com W, seta para cima ou espaço." />
      </div>
      <header className="guia">
        <div className="identidade">
          <p className="selo">fase 01 · até 1945</p>
          <h1>Primórdios</h1>
        </div>
        <button type="button" className="secundario" onClick={concluida ? onConcluir : onVoltar}>
          Voltar ao museu
        </button>
      </header>
      <p className="controles">A D e as setas andam. W, seta para cima ou espaço pulam. Esc volta ao museu.</p>
      {concluida && (
        <article className="fim" aria-live="polite">
          <h2>O começo fica para trás</h2>
          <p>Cartões, lógica e a ideia de um programa guardado na memória. A Fundação abre no próximo passo.</p>
          <button type="button" onClick={onConcluir}>
            Voltar ao museu
          </button>
        </article>
      )}
    </main>
  )
}
