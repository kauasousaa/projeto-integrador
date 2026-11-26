import {
  corDe,
  CORES_CABELO,
  CORES_CALCA,
  CORES_CAMISA,
  CORES_OLHOS,
  TOM_PELE,
  type Aparencia,
  type EstiloCabelo,
} from '../../../types/aparencia'

function garantir(nome: string, linhas: string[], largura: number) {
  linhas.forEach((linha, indice) => {
    if (linha.length !== largura) {
      throw new Error(`${nome} linha ${indice} tem ${linha.length} pixels`)
    }
  })
  return linhas
}

function escurecer(hex: string, fator: number) {
  const valor = Number.parseInt(hex.slice(1), 16)
  const canal = (deslocamento: number) => Math.max(0, Math.floor(((valor >> deslocamento) & 255) * fator))
  const codigo = (canal(16) << 16) | (canal(8) << 8) | canal(0)
  return `#${codigo.toString(16).padStart(6, '0')}`
}

const PASSO_A = garantir('passo-a', [
  '..o.accccccaao..',
  '..oa.cccccccao..',
  '..oaccccccccao..',
  '..aaccccccca.a..',
  '....pp..pp......',
  '..pp.pp..pp.....',
  '..pP.pP..pp.....',
  '..bb.bb..pP.....',
  '......bb.bbo....',
  '................',
  '................',
  '................',
  '................',
], 16)

const PASSAGEM = garantir('passagem', [
  '..oaaccccccaao..',
  '..oaccccccccao..',
  '..oaccccccccao..',
  '..aaccccccccaa..',
  '....pp....pp....',
  '....pp....pp....',
  '...pp......pp...',
  '...pP......Pp...',
  '..obb......bbo..',
  '................',
  '................',
  '................',
  '................',
], 16)

const PULO = garantir('pulo', [
  '..aa.cccccc.aa..',
  '..o..cccccc..o..',
  '..oaccccccccao..',
  '..oaccccccccao..',
  '....pp....pp....',
  '...pP......Pp...',
  '..obb......bbo..',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
], 16)

const QUEDA = garantir('queda', [
  '..o.acccccca.o..',
  '..oa.cccccc.ao..',
  '..oaccccccccao..',
  '..aaccccccccaa..',
  '.....pp..pp.....',
  '....pp....pp....',
  '...pp......pp...',
  '..pP........Pp..',
  '..bb........bb..',
  '................',
  '................',
  '................',
  '................',
], 16)

function espelhar(linhas: string[]) {
  return linhas.map((linha) => [...linha].reverse().join(''))
}

const CORPO = garantir('corpo', [
  '................',
  '................',
  '.....ossso......',
  '....osssssso....',
  '...osssssssso...',
  '..osssssssssso..',
  '..osSSSssSSSso..',
  '..osseesseesso..',
  '..osssssssssso..',
  '..osssmmmmssso..',
  '...osssssssso...',
  '....ossssso.....',
  '..oaaccccccaao..',
  '..oaccccccccao..',
  '..oaccccccccao..',
  '..aaccccccccaa..',
  '.....pp..pp.....',
  '.....pp..pp.....',
  '.....pp..pp.....',
  '.....pP..Pp.....',
  '....obb..bbo....',
  '................',
  '................',
  '................',
], 16)

const CABELOS: Record<EstiloCabelo, string[]> = {
  CURTO: garantir('curto', [
    '................',
    '....oHHHHHHo....',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohh......hho..',
    '.ohh........hho.',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
  ], 16),
  FRANJA: garantir('franja', [
    '................',
    '....oHHHHHHo....',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohhhhhhhhhho..',
    '.ohhhhhhhhhhhho.',
    '..ohhhhhhhhhho..',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
  ], 16),
  LONGO: garantir('longo', [
    '................',
    '....oHHHHHHo....',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohh......hho..',
    '.ohh........hho.',
    '.hh..........hh.',
    '.hh..........hh.',
    '.hh..........hh.',
    '.hh..........hh.',
    '.hh..........hh.',
    '.hh..........hh.',
    '.hh..........hh.',
    '.hh..........hh.',
    '.oh..........ho.',
    '.oh..........ho.',
    '..o..........o..',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
  ], 16),
  COQUE: garantir('coque', [
    '.....oHHHHo.....',
    '....ohhhhho.....',
    '...ohhhhhhho....',
    '..ohhhhhhhhhho..',
    '..ohh......hho..',
    '.ohh........hho.',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
  ], 16),
  CACHEADO: garantir('cacheado', [
    '..oH.oHH.oH.oH..',
    '.oHHhhHHhhHHHo..',
    'oHhhhhhhhhhhhhHo',
    'oHhHhhHhhHhhHHho',
    '.oHhhhhhhhhhhHo.',
    '..oHH......HHo..',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
  ], 16),
  AFRO: garantir('afro', [
    '.....oHHHHo.....',
    '...oHHHHHHHHo...',
    '..oHhhhhhhhhHo..',
    '.oHhhhhhhhhhhHo.',
    'oHhhhhhhhhhhhhHo',
    'oHhhh......hhhHo',
    'oHh..........hHo',
    '.h............h.',
    '.hh..........hh.',
    '..h..........h..',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
  ], 16),
  TRANCAS: garantir('trancas', [
    '................',
    '....oHHHHo......',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohh......hho..',
    '.oHh........hHo.',
    '.ohh........hho.',
    '.oH..........Ho.',
    '.ohh........hho.',
    '.oHh........hHo.',
    '.oh..........ho.',
    '.oHh........hHo.',
    '.ohh........hho.',
    '.oH..........Ho.',
    '.ohh........hho.',
    '.oHh........hHo.',
    '..o..........o..',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
  ], 16),
  RABO: garantir('rabo', [
    '................',
    '....oHHHHo......',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohh......hhHo.',
    '.ohh........hHH.',
    '............oHH.',
    '.............HH.',
    '............oHH.',
    '.............HH.',
    '............oHH.',
    '.............HH.',
    '............ohh.',
    '.............hh.',
    '............oH..',
    '.............o..',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
  ], 16),
  CARECA: garantir('careca', [
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
  ], 16),
}

function pintar(linhas: string[], grade: (string | null)[][], cores: Record<string, string>) {
  linhas.forEach((linha, y) => {
    ;[...linha].forEach((simbolo, x) => {
      if (simbolo !== '.') {
        grade[y][x] = cores[simbolo]
      }
    })
  })
}

export type Pose = 'parado' | 'passagem' | 'passo-a' | 'passo-b' | 'pulo' | 'queda' | 'pouso'

const MIUDOS: Record<Exclude<Pose, 'parado'>, string[]> = {
  passagem: PASSAGEM,
  'passo-a': PASSO_A,
  'passo-b': espelhar(PASSO_A),
  pulo: PULO,
  queda: QUEDA,
  pouso: PASSAGEM,
}

export function animacaoDoPersonagem(estado: {
  andando: boolean
  noChao: boolean
  subindo: boolean
  ciclo: number
  pouso: number
}) {
  if (!estado.noChao) {
    return { pose: estado.subindo ? 'pulo' : 'queda', elevacao: estado.subindo ? -1 : 0 } as const
  }
  if (estado.pouso > 0) {
    return { pose: 'pouso', elevacao: 1 } as const
  }
  if (!estado.andando) {
    return { pose: 'parado', elevacao: 0 } as const
  }
  const quadro = Math.floor(estado.ciclo) % 4
  if (quadro === 1) {
    return { pose: 'passo-a', elevacao: -2 } as const
  }
  if (quadro === 3) {
    return { pose: 'passo-b', elevacao: -2 } as const
  }
  return { pose: 'passagem', elevacao: 0 } as const
}

export function montarPersonagem(aparencia: Aparencia, pose: Pose = 'parado') {
  const pele = corDe(TOM_PELE, aparencia.tomPele)
  const cabelo = corDe(CORES_CABELO, aparencia.corCabelo)
  const camisa = corDe(CORES_CAMISA, aparencia.camisa)
  const calca = corDe(CORES_CALCA, aparencia.calca)
  const olhos = corDe(CORES_OLHOS, aparencia.olhos)
  const cores: Record<string, string> = {
    o: '#140e18',
    k: '#140e18',
    s: pele,
    S: escurecer(pele, 0.78),
    a: pele,
    e: olhos,
    m: escurecer(pele, 0.55),
    c: camisa,
    p: calca,
    P: escurecer(calca, 0.7),
    b: '#3a2a22',
    h: cabelo,
    H: escurecer(cabelo, 0.68),
  }
  const linhas = pose === 'parado' ? CORPO : [...CORPO.slice(0, 11), ...MIUDOS[pose]]
  const grade: (string | null)[][] = linhas.map(() => Array<string | null>(16).fill(null))
  pintar(linhas, grade, cores)
  pintar(CABELOS[aparencia.cabelo], grade, cores)
  return grade
}

const POSES: Pose[] = ['parado', 'passagem', 'passo-a', 'passo-b', 'pulo', 'queda', 'pouso']

export function telasDoPersonagem(aparencia: Aparencia) {
  const telas = {} as Record<Pose, HTMLCanvasElement>
  for (const pose of POSES) {
    const tela = document.createElement('canvas')
    tela.width = 16
    tela.height = 24
    const pincel = tela.getContext('2d')
    if (!pincel) {
      continue
    }
    pincel.imageSmoothingEnabled = false
    montarPersonagem(aparencia, pose).forEach((linha, y) => {
      linha.forEach((cor, x) => {
        if (!cor) {
          return
        }
        pincel.fillStyle = cor
        pincel.fillRect(x, y, 1, 1)
      })
    })
    telas[pose] = tela
  }
  return telas
}

const PORTAL_PIXELS = garantir('portal', [
  '......oooo......',
  '....ooLLLLoo....',
  '...oLL....LLo...',
  '..oLL.oooo.LLo..',
  '..oL.oPPPPo.Lo..',
  '..oL.oP..Po.Lo..',
  '..oLoP.CC.PoLo..',
  '..oLoP....PoLo..',
  '..oL.oP..Po.Lo..',
  '..oL.oPPPPo.Lo..',
  '..oLL.oooo.LLo..',
  '...oLL....LLo...',
  '....ooLLLLoo....',
  '......oooo......',
  '......o..o......',
  '.....oooooo.....',
], 16)

export function portalPixel() {
  const cores: Record<string, string> = {
    o: '#140e18',
    L: '#c77dff',
    P: '#7b2cbf',
    C: '#7dffb3',
  }
  return PORTAL_PIXELS.map((linha) => [...linha].map((simbolo) => (simbolo === '.' ? null : cores[simbolo])))
}
