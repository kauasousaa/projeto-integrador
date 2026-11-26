import { portalPixel } from '../pixel/sprites'

export const MUNDO_LARGURA = 1880
export const MUNDO_ALTURA = 208
export const CHAO = 168
export const ALTURA_SPRITE = 48

export const INICIO = { x: 48, y: CHAO - ALTURA_SPRITE }

const PORTAL_GRADE = portalPixel()

export const PORTAL = { x: 1748, y: CHAO - 48, largura: 48, altura: 48 }

type Retangulo = { x: number; y: number; largura: number; altura: number }

type Placa = { x: number; y: number; linhas: string[] }

export const SOLIDOS: Retangulo[] = [
  { x: 0, y: CHAO, largura: 500, altura: 40 },
  { x: 552, y: CHAO, largura: 400, altura: 40 },
  { x: 1260, y: CHAO, largura: 620, altura: 40 },
  { x: -24, y: 0, largura: 24, altura: MUNDO_ALTURA },
  { x: MUNDO_LARGURA, y: 0, largura: 24, altura: MUNDO_ALTURA },
]

export const CARTOES: Retangulo[] = [
  { x: 984, y: 146, largura: 64, altura: 10 },
  { x: 1076, y: 122, largura: 64, altura: 10 },
  { x: 1168, y: 146, largura: 64, altura: 10 },
]

const PLACAS: Placa[] = [
  {
    x: 36,
    y: 56,
    linhas: ['1804', 'Cartões perfurados', 'mandam na máquina.'],
  },
  {
    x: 600,
    y: 56,
    linhas: ['1843', 'Ada escreve o', 'primeiro programa.'],
  },
  {
    x: 1300,
    y: 56,
    linhas: ['1936', 'Turing imagina uma', 'máquina universal.'],
  },
  {
    x: 1520,
    y: 44,
    linhas: ['1945', 'Cabos no ENIAC.', 'O programa entra', 'na memória.'],
  },
]

function caixa(x: number, y: number): Retangulo {
  return { x: x + 8, y: y + 10, largura: 16, altura: 38 }
}

function encosta(a: Retangulo, b: Retangulo) {
  return a.x < b.x + b.largura && a.x + a.largura > b.x && a.y < b.y + b.altura && a.y + a.altura > b.y
}

function pousou(antes: Retangulo, depois: Retangulo, bloco: Retangulo) {
  const pesAntes = antes.y + antes.altura
  const pesDepois = depois.y + depois.altura
  const cruza =
    depois.x < bloco.x + bloco.largura && depois.x + depois.largura > bloco.x
  return cruza && pesAntes <= bloco.y + 1 && pesDepois >= bloco.y
}

export function avancar(x: number, y: number, dx: number, dy: number) {
  let nx = x + dx
  let corpo = caixa(nx, y)
  for (const bloco of SOLIDOS) {
    if (!encosta(corpo, bloco)) {
      continue
    }
    if (dx > 0) {
      nx = bloco.x - 24
    } else if (dx < 0) {
      nx = bloco.x + bloco.largura - 8
    }
    corpo = caixa(nx, y)
  }

  const antes = caixa(nx, y)
  let ny = y + dy
  let noChao = false
  let corpoY = caixa(nx, ny)
  for (const bloco of SOLIDOS) {
    if (!encosta(corpoY, bloco)) {
      continue
    }
    if (dy > 0) {
      ny = bloco.y - ALTURA_SPRITE
      noChao = true
    } else if (dy < 0) {
      ny = bloco.y + bloco.altura - 10
    }
    corpoY = caixa(nx, ny)
  }

  if (dy > 0) {
    for (const cartao of CARTOES) {
      if (pousou(antes, caixa(nx, ny), cartao)) {
        ny = cartao.y - ALTURA_SPRITE
        noChao = true
      }
    }
  }

  return { x: nx, y: ny, noChao }
}

export function encostaPortal(x: number, y: number) {
  return encosta(caixa(x, y), PORTAL)
}

export function pisoSeguro(x: number, y: number) {
  const centro = x + 16
  const base = y + ALTURA_SPRITE
  const cabeNo = (bloco: Retangulo, margem: number) =>
    Math.abs(base - bloco.y) <= 3 && centro > bloco.x + margem && centro < bloco.x + bloco.largura - margem
  return SOLIDOS.some((bloco) => bloco.altura > 16 && cabeNo(bloco, 28)) || CARTOES.some((bloco) => cabeNo(bloco, 12))
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

function desenharPlaca(ctx: CanvasRenderingContext2D, placa: Placa) {
  const largura = 176
  const altura = 14 + placa.linhas.length * 12
  ctx.fillStyle = '#2a160c'
  ctx.fillRect(placa.x, placa.y, largura, altura)
  ctx.fillStyle = '#e6c36a'
  ctx.fillRect(placa.x + 3, placa.y + 3, largura - 6, altura - 6)
  ctx.fillStyle = '#2a160c'
  ctx.font = '8px "Press Start 2P", monospace'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  placa.linhas.forEach((linha, indice) => {
    ctx.fillText(linha, placa.x + 8, placa.y + 7 + indice * 12)
  })
}

export function desenharFase(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#4a3018'
  ctx.fillRect(0, 0, MUNDO_LARGURA, MUNDO_ALTURA)
  ctx.fillStyle = '#3a2414'
  ctx.fillRect(0, 0, MUNDO_LARGURA, 10)
  ctx.fillStyle = '#e6c36a'
  ctx.fillRect(0, 10, MUNDO_LARGURA, 3)
  ctx.fillStyle = '#1a100c'
  ctx.fillRect(0, CHAO, MUNDO_LARGURA, MUNDO_ALTURA - CHAO)

  for (const bloco of SOLIDOS) {
    if (bloco.y < CHAO) {
      continue
    }
    ctx.fillStyle = '#6e4424'
    ctx.fillRect(bloco.x, bloco.y, bloco.largura, bloco.altura)
    ctx.fillStyle = '#8d5a32'
    ctx.fillRect(bloco.x, bloco.y, bloco.largura, 6)
    ctx.fillStyle = '#5a3818'
    for (let x = bloco.x; x < bloco.x + bloco.largura; x += 16) {
      ctx.fillRect(x, bloco.y, 2, bloco.altura)
    }
  }

  for (const cartao of CARTOES) {
    ctx.fillStyle = '#2a160c'
    ctx.fillRect(cartao.x - 1, cartao.y - 1, cartao.largura + 2, cartao.altura + 2)
    ctx.fillStyle = '#f3e2b3'
    ctx.fillRect(cartao.x, cartao.y, cartao.largura, cartao.altura)
    ctx.fillStyle = '#2a160c'
    for (let x = cartao.x + 6; x < cartao.x + cartao.largura - 4; x += 8) {
      ctx.fillRect(x, cartao.y + 3, 3, 3)
    }
  }

  for (const placa of PLACAS) {
    desenharPlaca(ctx, placa)
  }

  desenharGrade(ctx, PORTAL_GRADE, PORTAL.x, PORTAL.y, 3)
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
