import { useEffect, useRef, useState } from 'react'
import { animacaoDoPersonagem, telasDoPersonagem } from '../../features/jogo/pixel/sprites'
import type { Aparencia } from '../../types/aparencia'
import { MolduraFase } from './MolduraFase'

type Propriedades = {
  aparencia: Aparencia
  onVoltar: () => void
  onConcluir: () => void
}

type Opcao = { rotulo: string; certa: boolean; correcao: string }

type Capitulo = {
  id: string
  x: number
  ano: string
  nome: string
  texto: string
  pergunta: string
  opcoes: Opcao[]
}

type Retangulo = { x: number; y: number; largura: number; altura: number }

const LARGURA = 1320
const ALTURA = 240
const CHAO_PAREDE = 208

const CAPITULOS: Capitulo[] = [
  {
    id: 'hopper',
    x: 150,
    ano: '1952',
    nome: 'A-0',
    texto:
      'Grace Hopper cria o A-0, o primeiro compilador. A pessoa escreve mais perto do inglês, e a máquina traduz isso para números.',
    pergunta: 'O que o A-0 fazia?',
    opcoes: [
      { rotulo: 'Traduzia o programa', certa: true, correcao: '' },
      { rotulo: 'Ligava cabos no ENIAC', certa: false, correcao: 'Os cabos eram a forma antiga, do ENIAC. O A-0 já traduz o texto do programa.' },
      { rotulo: 'Abria uma janela', certa: false, correcao: 'Janela e mouse vêm bem depois. Em 1952 o salto é o compilador.' },
    ],
  },
  {
    id: 'fortran',
    x: 340,
    ano: '1957',
    nome: 'FORTRAN',
    texto:
      'John Backus, na IBM, lança o FORTRAN. É a primeira linguagem de alto nível usada em massa, feita para o cálculo científico.',
    pergunta: 'Para que o FORTRAN foi feito?',
    opcoes: [
      { rotulo: 'Cálculo científico', certa: true, correcao: '' },
      { rotulo: 'Rede social', certa: false, correcao: 'Rede social é desta última era. O FORTRAN calculava.' },
      { rotulo: 'Desenhar ícones', certa: false, correcao: 'Ícone é da interface gráfica, nos anos 1970 e 1980.' },
    ],
  },
  {
    id: 'cobol',
    x: 530,
    ano: '1960',
    nome: 'COBOL',
    texto:
      'O COBOL nasce para os negócios, com forte participação de Hopper. A frase é legível. Bancos e governos ainda rodam COBOL hoje.',
    pergunta: 'Quem ainda depende do COBOL?',
    opcoes: [
      { rotulo: 'Bancos e governos', certa: true, correcao: '' },
      { rotulo: 'Só os jogos', certa: false, correcao: 'O COBOL não nasceu para jogo. Ele cuida de negócio e de governo.' },
      { rotulo: 'O telefone celular', certa: false, correcao: 'O celular chega décadas depois. O COBOL fica nos sistemas grandes.' },
    ],
  },
  {
    id: 'crise',
    x: 720,
    ano: '1968',
    nome: 'Crise',
    texto:
      'Projetos enormes atrasam e estouram o custo. Na conferência da OTAN, em Garmisch, adotam o nome Engenharia de Software. Dijkstra ataca o Go To sem controle.',
    pergunta: 'O que nasce para enfrentar a crise?',
    opcoes: [
      { rotulo: 'A Engenharia de Software', certa: true, correcao: '' },
      { rotulo: 'A loja de aplicativos', certa: false, correcao: 'A loja de aplicativos é de 2008. Em 1968 o problema é o projeto que não termina.' },
      { rotulo: 'O Pix', certa: false, correcao: 'O Pix é de 2020. Em 1968 a resposta é tratar software como engenharia.' },
    ],
  },
  {
    id: 'apollo',
    x: 910,
    ano: '1969',
    nome: 'Apollo',
    texto:
      'Margaret Hamilton lidera o software da Apollo 11. O programa prioriza o que importa e o pouso continua. No mesmo ano nascem o Unix e a venda de software separado do hardware: o software vira negócio.',
    pergunta: 'Quem liderou o software da Apollo 11?',
    opcoes: [
      { rotulo: 'Margaret Hamilton', certa: true, correcao: '' },
      { rotulo: 'Ada Lovelace', certa: false, correcao: 'Ada escreveu o primeiro programa, em 1843. A Apollo é de Hamilton, em 1969.' },
      { rotulo: 'Tim Berners-Lee', certa: false, correcao: 'Berners-Lee cria a Web em 1991. A Apollo é de Hamilton.' },
    ],
  },
  {
    id: 'brasil',
    x: 1100,
    ano: '1957–1964',
    nome: 'Brasil',
    texto:
      'Em 1957 o UNIVAC-120 chega a São Paulo. Em 1961 o Zezinho, feito no ITA, é o primeiro computador projetado e construído no Brasil. Em 1964 nasce o SERPRO, o processamento de dados do governo.',
    pergunta: 'O que foi o Zezinho?',
    opcoes: [
      { rotulo: 'Computador projetado no Brasil', certa: true, correcao: '' },
      { rotulo: 'O primeiro navegador', certa: false, correcao: 'Navegador é dos anos 1990. O Zezinho é um computador do ITA, em 1961.' },
      { rotulo: 'Uma planilha', certa: false, correcao: 'A planilha é o VisiCalc, em 1979. O Zezinho é máquina e projeto brasileiro.' },
    ],
  },
]

const MOVEIS: Retangulo[] = [
  { x: 0, y: 0, largura: LARGURA, altura: 28 },
  { x: 0, y: CHAO_PAREDE, largura: LARGURA, altura: 32 },
  { x: 0, y: 0, largura: 16, altura: ALTURA },
  { x: LARGURA - 16, y: 0, largura: 16, altura: ALTURA },
]

const PORTA: Retangulo = { x: 1248, y: 96, largura: 40, altura: 64 }

function pes(x: number, y: number): Retangulo {
  return { x: x + 8, y: y + 40, largura: 16, altura: 8 }
}

function encosta(a: Retangulo, b: Retangulo) {
  return a.x < b.x + b.largura && a.x + a.largura > b.x && a.y < b.y + b.altura && a.y + a.altura > b.y
}

function cabe(x: number, y: number) {
  const corpo = pes(x, y)
  return MOVEIS.every((movel) => !encosta(corpo, movel))
}

function desenharVisitante(
  ctx: CanvasRenderingContext2D,
  sprite: CanvasImageSource,
  x: number,
  y: number,
  esquerda: boolean,
) {
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

export function TelaFundacao({ aparencia, onVoltar, onConcluir }: Propriedades) {
  const palco = useRef<HTMLDivElement>(null)
  const tela = useRef<HTMLCanvasElement>(null)
  const voltar = useRef(onVoltar)
  const concluir = useRef(onConcluir)
  voltar.current = onVoltar
  concluir.current = onConcluir
  const [aviso, setAviso] = useState('Ande até a máquina acesa e pressione E. A primeira é o compilador de Hopper.')
  const [aberto, setAberto] = useState<Capitulo | null>(null)
  const [erro, setErro] = useState('')
  const [concluida, setConcluida] = useState(false)
  const vivo = useRef({ indice: 0, pausado: false, concluida: false })

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
    const sprites = telasDoPersonagem(aparencia)
    const teclas = new Set<string>()
    let x = 48
    let y = 140
    let esquerda = false
    let passo = 0
    let pedirE = false
    let ultimo = performance.now()
    let ativo = true

    const ajustar = () => {
      const zoom = Math.max(2, Math.floor(area.clientHeight / ALTURA))
      canvas.width = Math.max(1, Math.floor(area.clientWidth / zoom))
      canvas.height = ALTURA
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
        if (vivo.current.concluida) {
          concluir.current()
        } else {
          voltar.current()
        }
        return
      }
      if (vivo.current.pausado || vivo.current.concluida) {
        return
      }
      if (tecla === 'e') {
        evento.preventDefault()
        pedirE = true
        return
      }
      if (!['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(tecla)) {
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
      if (!vivo.current.pausado && !vivo.current.concluida) {
        if (teclas.has('a') || teclas.has('arrowleft')) dx -= 1
        if (teclas.has('d') || teclas.has('arrowright')) dx += 1
        if (teclas.has('w') || teclas.has('arrowup')) dy -= 1
        if (teclas.has('s') || teclas.has('arrowdown')) dy += 1
      }
      const andando = dx !== 0 || dy !== 0
      if (andando) {
        const comprimento = Math.hypot(dx, dy)
        dx /= comprimento
        dy /= comprimento
        const nx = x + dx * 110 * dt
        const ny = y + dy * 110 * dt
        if (cabe(nx, y)) x = nx
        if (cabe(x, ny)) y = ny
        if (dx < 0) esquerda = true
        if (dx > 0) esquerda = false
        passo += dt * 10
      }
      if (pedirE) {
        pedirE = false
        const atual = CAPITULOS[vivo.current.indice]
        if (atual && Math.hypot(x + 16 - atual.x, y + 24 - 110) < 96) {
          vivo.current.pausado = true
          setErro('')
          setAberto(atual)
        } else if (atual) {
          setAviso(`A máquina desta parte da história é ${atual.nome}, de ${atual.ano}. Ela está acesa.`)
        }
      }
      if (
        !vivo.current.concluida &&
        vivo.current.indice >= CAPITULOS.length &&
        encosta(pes(x, y), PORTA)
      ) {
        vivo.current.concluida = true
        setConcluida(true)
      }
      const animacao = animacaoDoPersonagem({
        andando,
        noChao: true,
        subindo: false,
        ciclo: passo,
        pouso: 0,
      })
      const camera = Math.round(Math.min(LARGURA - canvas.width, Math.max(0, x + 16 - canvas.width / 2)))
      ctx.imageSmoothingEnabled = false
      ctx.fillStyle = '#10281e'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.translate(-camera, 0)
      ctx.fillStyle = '#1c4636'
      for (let coluna = 0; coluna < LARGURA; coluna += 20) {
        ctx.fillRect(coluna, 28, 2, 180)
      }
      ctx.fillStyle = '#0c1c16'
      ctx.fillRect(0, 0, LARGURA, 16)
      ctx.fillStyle = '#7dffb3'
      ctx.fillRect(0, 16, LARGURA, 3)
      CAPITULOS.forEach((capitulo, indice) => {
        const feito = indice < vivo.current.indice
        const atual = indice === vivo.current.indice
        ctx.fillStyle = atual ? '#7dffb3' : '#1a2c24'
        ctx.fillRect(capitulo.x - 36, 40, 72, 44)
        ctx.fillStyle = '#07140f'
        ctx.fillRect(capitulo.x - 26, 48, 52, 18)
        ctx.fillStyle = feito || atual ? '#7dffb3' : '#245443'
        ctx.fillRect(capitulo.x - 20, 54, 12, 8)
        if (feito) {
          ctx.fillRect(capitulo.x - 4, 54, 12, 8)
        }
      })
      if (vivo.current.indice >= CAPITULOS.length) {
        ctx.fillStyle = '#7dffb3'
        ctx.fillRect(PORTA.x + 8, PORTA.y, 24, 52)
        ctx.fillStyle = '#0e241c'
        ctx.fillRect(PORTA.x + 16, PORTA.y + 20, 8, 12)
      }
      desenharVisitante(ctx, sprites[animacao.pose], x, y + animacao.elevacao, esquerda)
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

  function responder(opcao: Opcao) {
    if (!opcao.certa) {
      setErro(opcao.correcao)
      return
    }
    const proximo = vivo.current.indice + 1
    vivo.current.indice = proximo
    vivo.current.pausado = false
    setAberto(null)
    setErro('')
    if (proximo >= CAPITULOS.length) {
      setAviso('O corredor acaba numa porta acesa. A linguagem, a engenharia e o Brasil desta época ficam para trás.')
      return
    }
    const seguinte = CAPITULOS[proximo]
    setAviso(`Certo. Siga até ${seguinte.nome}, de ${seguinte.ano}.`)
  }

  return (
    <MolduraFase
      tema="laboratorio"
      selo="fase 02 · 1945–1969"
      titulo="Fundação"
      controles="W A S D e as setas andam. E liga a máquina acesa. Esc volta ao museu."
      concluida={concluida}
      resumoTitulo="O software ganha nome e ofício"
      resumoTexto="Compilador, FORTRAN, COBOL, a crise que cria a Engenharia de Software, a Apollo e o começo da computação no Brasil. O programa deixa o laboratório no próximo quadro."
      onVoltar={onVoltar}
      onConcluir={onConcluir}
    >
      <div className="palco" ref={palco}>
        <canvas ref={tela} aria-label="Laboratório da Fundação. Visite as máquinas na ordem da história." />
      </div>
      <p className="dica">
        <strong>{aberto ? `${aberto.ano} · ${aberto.nome}` : 'Laboratório'}.</strong> {aberto ? aberto.texto : aviso}
      </p>
      {aberto && (
        <article className="escolha">
          <p>{aberto.pergunta}</p>
          {erro && <p>{erro}</p>}
          <div className="opcoes">
            {aberto.opcoes.map((opcao) => (
              <button key={opcao.rotulo} type="button" onClick={() => responder(opcao)}>
                {opcao.rotulo}
              </button>
            ))}
          </div>
        </article>
      )}
    </MolduraFase>
  )
}
