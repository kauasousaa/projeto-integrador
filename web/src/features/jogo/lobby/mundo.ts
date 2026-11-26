import { FASES_LOBBY, type CodigoFase, type FaseLobby } from './fases'

export const MUNDO_LARGURA = 1520
export const MUNDO_ALTURA = 208
export const CHAO = 124

export const INICIO = { x: 96, y: 128 }

const ALTURA_SPRITE = 48

const LARGURA_QUADRO = 156
const PASSO_QUADRO = 240
const ORIGEM_QUADRO = 200

type Retangulo = { x: number; y: number; largura: number; altura: number }

type AlaNoMundo = FaseLobby & { x: number }

const PISOS = [
  ['#8d5a32', '#6e4424'],
  ['#6d8f74', '#56785d'],
  ['#c6a56a', '#b08c52'],
  ['#4d6fa8', '#3c5b90'],
  ['#1a2236', '#12182a'],
]

const PAREDES = ['#5c3a22', '#234232', '#4a3a18', '#1a335f', '#16122e']
const MOLDURAS = ['#e6c36a', '#7dffb3', '#f0c419', '#7eb6ff', '#7dffb3']
const TAPETES = ['#7a2430', '#1b4d32', '#8a5a12', '#1a3f86', '#12352e']
const PAINEIS = ['#2a180e', '#10241a', '#241c0c', '#0e1c38', '#100e22']

export const ALAS: AlaNoMundo[] = FASES_LOBBY.map((fase, indice) => ({
  ...fase,
  x: ORIGEM_QUADRO + indice * PASSO_QUADRO,
}))

const COLUNAS = [378, 618, 858, 1098]

const OBSTACULOS: Retangulo[] = [
  { x: 0, y: 0, largura: MUNDO_LARGURA, altura: 154 },
  { x: 0, y: 192, largura: MUNDO_LARGURA, altura: MUNDO_ALTURA - 192 },
  { x: 0, y: 0, largura: 16, altura: MUNDO_ALTURA },
  { x: MUNDO_LARGURA - 16, y: 0, largura: 16, altura: MUNDO_ALTURA },
  { x: 300, y: 170, largura: 72, altura: 18 },
  { x: 860, y: 170, largura: 72, altura: 18 },
  ...ALAS.map((ala) => ({
    x: ala.x + LARGURA_QUADRO / 2 - 16,
    y: CHAO + 16,
    largura: 32,
    altura: 16,
  })),
  ...COLUNAS.map((x) => ({ x, y: 16, largura: 16, altura: CHAO - 8 })),
]

function eraNo(x: number) {
  if (x < 390) {
    return 0
  }
  if (x < 630) {
    return 1
  }
  if (x < 870) {
    return 2
  }
  if (x < 1110) {
    return 3
  }
  return 4
}

function encosta(a: Retangulo, b: Retangulo) {
  return a.x < b.x + b.largura && a.x + a.largura > b.x && a.y < b.y + b.altura && a.y + a.altura > b.y
}

function pesDe(x: number, y: number): Retangulo {
  return { x: x + 8, y: y + 40, largura: 16, altura: 8 }
}

export function cabe(x: number, y: number) {
  const pes = pesDe(x, y)
  return OBSTACULOS.every((bloco) => !encosta(pes, bloco))
}

export function alaPerto(x: number, y: number): CodigoFase | null {
  const pes = pesDe(x, y)
  const pesX = pes.x + pes.largura / 2
  const pesY = pes.y + 4
  if (pesY > CHAO + 58) {
    return null
  }
  let escolhida: CodigoFase | null = null
  let menor = 78
  for (const ala of ALAS) {
    const centro = ala.x + LARGURA_QUADRO / 2
    const distancia = Math.abs(pesX - centro)
    if (distancia < menor) {
      menor = distancia
      escolhida = ala.id
    }
  }
  return escolhida
}

export function enquadrar(x: number, visivel: number) {
  if (MUNDO_LARGURA <= visivel) {
    return Math.round((MUNDO_LARGURA - visivel) / 2)
  }
  const camera = x + 16 - visivel / 2
  return Math.round(Math.min(MUNDO_LARGURA - visivel, Math.max(0, camera)))
}

function desenharGrade(
  ctx: CanvasRenderingContext2D,
  grade: (string | null)[][],
  x: number,
  y: number,
  escala: number,
) {
  grade.forEach((linha, linhaY) => {
    linha.forEach((cor, coluna) => {
      if (!cor) {
        return
      }
      ctx.fillStyle = cor
      ctx.fillRect(x + coluna * escala, y + linhaY * escala, escala, escala)
    })
  })
}

function desenharParede(ctx: CanvasRenderingContext2D) {
  for (let x = 0; x < MUNDO_LARGURA; x += 8) {
    ctx.fillStyle = PAREDES[eraNo(x)]
    ctx.fillRect(x, 0, 8, CHAO)
  }
  ctx.fillStyle = '#3a2414'
  ctx.fillRect(0, 0, MUNDO_LARGURA, 6)
  ctx.fillRect(0, CHAO - 6, MUNDO_LARGURA, 6)
  ctx.fillStyle = '#e6c36a'
  ctx.fillRect(0, 6, MUNDO_LARGURA, 3)
}

function desenharChao(ctx: CanvasRenderingContext2D) {
  for (let y = CHAO; y < MUNDO_ALTURA; y += 8) {
    for (let x = 0; x < MUNDO_LARGURA; x += 8) {
      const [claro, escuro] = PISOS[eraNo(x)]
      ctx.fillStyle = (x / 8 + y / 8) % 2 === 0 ? claro : escuro
      ctx.fillRect(x, y, 8, 8)
    }
  }
  for (let x = 24; x < MUNDO_LARGURA - 24; x += 8) {
    ctx.fillStyle = TAPETES[eraNo(x)]
    ctx.fillRect(x, 154, 8, 22)
  }
  ctx.fillStyle = '#7dffb3'
  for (let x = 1110; x < MUNDO_LARGURA; x += 16) {
    ctx.fillRect(x, CHAO, 1, 68)
  }
  ctx.fillStyle = '#3a2414'
  ctx.fillRect(0, 192, MUNDO_LARGURA, 16)
  ctx.fillStyle = '#e6c36a'
  ctx.fillRect(0, 192, MUNDO_LARGURA, 3)
}

function desenharLustre(ctx: CanvasRenderingContext2D, x: number) {
  ctx.fillStyle = '#140e18'
  ctx.fillRect(x, 0, 2, 16)
  ctx.fillStyle = '#ffe14a'
  ctx.fillRect(x - 5, 14, 12, 8)
  ctx.fillStyle = '#fff4b0'
  ctx.fillRect(x - 3, 16, 8, 4)
}

function desenharColuna(ctx: CanvasRenderingContext2D, x: number) {
  ctx.fillStyle = '#140e18'
  ctx.fillRect(x - 2, 14, 20, 6)
  ctx.fillRect(x, 20, 16, CHAO - 28)
  ctx.fillStyle = '#d9d0c1'
  ctx.fillRect(x + 2, 22, 12, CHAO - 34)
  ctx.fillStyle = '#8a8172'
  ctx.fillRect(x + 2, 22, 3, CHAO - 34)
  ctx.fillStyle = '#140e18'
  ctx.fillRect(x - 2, CHAO - 12, 20, 6)
}

function desenharEntrada(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#3a2414'
  ctx.fillRect(28, 28, 96, 88)
  ctx.fillStyle = '#6b3f22'
  ctx.fillRect(36, 36, 80, 80)
  ctx.fillStyle = '#2a1a10'
  ctx.fillRect(44, 44, 28, 64)
  ctx.fillRect(80, 44, 28, 64)
  ctx.fillStyle = '#e6c36a'
  ctx.fillRect(74, 74, 4, 4)
  ctx.fillRect(36, 16, 80, 14)
  ctx.fillStyle = '#140e18'
  ctx.font = '8px "Press Start 2P", monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('ENTRADA', 76, 23)
}

function desenharQuadro(ctx: CanvasRenderingContext2D, ala: AlaNoMundo, ativa: boolean) {
  const era = ala.numero - 1
  const y = 22
  const altura = 90
  ctx.fillStyle = ativa ? '#ffe14a' : '#140e18'
  ctx.fillRect(ala.x - 2, y - 2, LARGURA_QUADRO + 4, altura + 4)
  ctx.fillStyle = MOLDURAS[era]
  ctx.fillRect(ala.x, y, LARGURA_QUADRO, altura)
  ctx.fillStyle = PAINEIS[era]
  ctx.fillRect(ala.x + 8, y + 8, LARGURA_QUADRO - 16, 52)
  desenharGrade(ctx, ala.icone, ala.x + (LARGURA_QUADRO - 64) / 2, y + 10, 4)
  ctx.fillStyle = '#f4f1de'
  ctx.fillRect(ala.x + 8, y + 64, LARGURA_QUADRO - 16, 18)
  ctx.fillStyle = '#140e18'
  ctx.font = '8px "Press Start 2P", monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(ala.nome, ala.x + LARGURA_QUADRO / 2, y + 73)
  const centro = ala.x + LARGURA_QUADRO / 2
  ctx.fillStyle = '#140e18'
  ctx.fillRect(centro - 16, CHAO + 16, 32, 16)
  ctx.fillStyle = MOLDURAS[era]
  ctx.fillRect(centro - 12, CHAO + 18, 24, 6)
}

function desenharBanco(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = '#8a5330'
  ctx.fillRect(x, y, 72, 6)
  ctx.fillStyle = '#3a2414'
  ctx.fillRect(x + 4, y + 6, 6, 10)
  ctx.fillRect(x + 62, y + 6, 6, 10)
}

function desenharHorizonte(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#101628'
  ctx.fillRect(1348, 24, 140, 88)
  ctx.fillStyle = '#7dffb3'
  ctx.fillRect(1356, 32, 124, 72)
  ctx.fillStyle = '#16122e'
  ctx.fillRect(1364, 40, 108, 56)
  ctx.fillStyle = '#c77dff'
  ctx.fillRect(1404, 52, 28, 20)
  ctx.fillStyle = '#7dffb3'
  ctx.fillRect(1414, 58, 8, 8)
}

export function desenharMundo(ctx: CanvasRenderingContext2D, alaAtiva: CodigoFase | null) {
  desenharParede(ctx)
  desenharChao(ctx)
  desenharEntrada(ctx)
  desenharHorizonte(ctx)
  for (const x of COLUNAS) {
    desenharColuna(ctx, x)
  }
  for (const ala of ALAS) {
    desenharQuadro(ctx, ala, ala.id === alaAtiva)
    desenharLustre(ctx, ala.x + LARGURA_QUADRO / 2)
  }
  desenharBanco(ctx, 300, 166)
  desenharBanco(ctx, 860, 166)
}

export function desenharVisitante(
  ctx: CanvasRenderingContext2D,
  sprite: CanvasImageSource,
  x: number,
  y: number,
  esquerda: boolean,
) {
  ctx.fillStyle = 'rgba(12, 8, 20, 0.4)'
  ctx.fillRect(x + 4, y + ALTURA_SPRITE - 4, 24, 4)
  ctx.save()
  ctx.imageSmoothingEnabled = false
  if (esquerda) {
    ctx.translate(Math.round(x + 32), Math.round(y))
    ctx.scale(-2, 2)
  } else {
    ctx.translate(Math.round(x), Math.round(y))
    ctx.scale(2, 2)
  }
  ctx.drawImage(sprite, 0, 0)
  ctx.restore()
}
