import { useEffect, useRef, useState } from 'react'
import { MolduraFase } from './MolduraFase'
import './TelaExpansao.css'

type Propriedades = {
  onVoltar: () => void
  onConcluir: () => void
}

type Disco = {
  id: string
  nome: string
  ano: string
  cor: string
  fora?: string
  texto?: string
}

const DISCOS: Disco[] = [
  {
    id: 'patinho',
    nome: 'Patinho Feio',
    ano: '1972',
    cor: '#2f6b3a',
    texto:
      'Na Poli-USP, o Patinho Feio liga e não existe software para ele. A equipe escreve tudo: montador, carregador, depurador e compiladores. João José Neto registra esse software básico.',
  },
  {
    id: 'c',
    nome: 'Linguagem C',
    ano: '1972',
    cor: '#1d4e89',
    texto:
      'Dennis Ritchie cria a linguagem C. No ano seguinte o Unix é reescrito em C. O mesmo programa passa a rodar em máquinas diferentes: o software fica portátil.',
  },
  {
    id: 'visicalc',
    nome: 'VisiCalc',
    ano: '1979',
    cor: '#8a5a12',
    texto:
      'A planilha VisiCalc faz gente comprar um computador só para usá-la. Pela primeira vez, o software é o motivo da compra. Ele deixa de ser só ferramenta de laboratório.',
  },
  {
    id: 'msdos',
    nome: 'MS-DOS',
    ano: '1981',
    cor: '#1d4e89',
    texto:
      'O IBM PC chega com o MS-DOS. O computador entra no escritório. A Microsoft, fundada em 1975 com o Altair BASIC, passa a viver desse sistema.',
  },
  {
    id: 'gnu',
    nome: 'GNU',
    ano: '1983',
    cor: '#6b3fa0',
    texto:
      'Richard Stallman começa o projeto GNU: software livre, que a pessoa pode estudar, mudar e compartilhar. Em 1984 o Macintosh populariza janela, ícone e mouse.',
  },
  {
    id: 'lei',
    nome: 'Lei do Software',
    ano: '1987',
    cor: '#8a3d2f',
    texto:
      'No Brasil, a reserva de mercado de 1984 tenta proteger a informática. Em 1987 a Lei do Software entra em vigor. Os bancos, pressionados pela inflação, criam sistemas próprios e o país vira referência nesse software.',
  },
  {
    id: 'teste',
    nome: 'Testar',
    ano: '1985',
    cor: '#6b2a2a',
    texto:
      'Entre 1985 e 1987, falhas do software do Therac-25 causam danos reais em pacientes. A lição da engenharia: software que age no mundo precisa de teste. Não basta funcionar na demonstração.',
  },
  { id: 'iphone', nome: 'iPhone', ano: '2007', cor: '#333', fora: 'O iPhone é de 2007. Nesta época o computador ainda está entrando em casa.' },
  { id: 'react', nome: 'React', ano: '2013', cor: '#333', fora: 'O React é de 2013. Agora o salto é o software sair do laboratório.' },
  { id: 'excel', nome: 'Excel', ano: '1985', cor: '#333', fora: 'O Excel vem depois. A primeira planilha que vende computadores é o VisiCalc.' },
  { id: 'pix', nome: 'Pix', ano: '2020', cor: '#333', fora: 'O Pix é de 2020. O produto desta época é a planilha e o PC.' },
  { id: 'android', nome: 'Android', ano: '2008', cor: '#333', fora: 'O Android é da era do celular. Em 1981 o sistema do escritório é o MS-DOS.' },
  { id: 'k8s', nome: 'Kubernetes', ano: '2014', cor: '#333', fora: 'Kubernetes é nuvem, em 2014. Em 1983 o movimento novo é o software livre.' },
  { id: 'lgpd', nome: 'LGPD', ano: '2018', cor: '#333', fora: 'A LGPD é de 2018. A lei desta fase é a Lei do Software, de 1987.' },
  { id: 'pular', nome: 'Pular o teste', ano: '—', cor: '#333', fora: 'Pular o teste é o que o Therac ensina a não fazer. O software precisa ser provado.' },
]

const RODADAS = ['patinho', 'c', 'visicalc', 'msdos', 'gnu', 'lei', 'teste']

const MESA: Record<string, [string, string]> = {
  patinho: ['iphone', 'react'],
  c: ['pix', 'excel'],
  visicalc: ['excel', 'pix'],
  msdos: ['android', 'iphone'],
  gnu: ['k8s', 'react'],
  lei: ['lgpd', 'pix'],
  teste: ['pular', 'iphone'],
}

function discoPorId(id: string) {
  const disco = DISCOS.find((item) => item.id === id)
  if (!disco) {
    throw new Error(`Disco ${id} não existe`)
  }
  return disco
}

export function TelaExpansao({ onVoltar, onConcluir }: Propriedades) {
  const voltar = useRef(onVoltar)
  const concluir = useRef(onConcluir)
  voltar.current = onVoltar
  concluir.current = onConcluir
  const [passo, setPasso] = useState(0)
  const [aviso, setAviso] = useState('O computador de casa acabou de nascer. Escolha o disco desta época, não o do futuro.')
  const [aberto, setAberto] = useState<Disco | null>(null)
  const concluida = passo >= RODADAS.length
  const certo = concluida ? null : discoPorId(RODADAS[passo])
  const opcoes = certo ? [certo, ...MESA[certo.id].map(discoPorId)] : []

  useEffect(() => {
    const aoPressionar = (evento: KeyboardEvent) => {
      if (evento.key !== 'Escape') {
        return
      }
      evento.preventDefault()
      if (concluida) {
        concluir.current()
      } else {
        voltar.current()
      }
    }
    window.addEventListener('keydown', aoPressionar)
    return () => window.removeEventListener('keydown', aoPressionar)
  }, [concluida])

  function escolher(disco: Disco) {
    if (concluida || aberto) {
      return
    }
    if (disco.id !== RODADAS[passo]) {
      setAviso(disco.fora ?? 'Esse disco é de outra época.')
      return
    }
    setAberto(disco)
    setAviso('Leia a janela. Ela conta o que esse disco mudou.')
  }

  function seguir() {
    setAberto(null)
    setPasso((atual) => atual + 1)
    setAviso('O próximo disco já está na mesa.')
  }

  return (
    <MolduraFase
      tema="expansao"
      selo="fase 03 · 1970–1989"
      titulo="Expansão"
      controles="Clique no disco da época. Leia a janela e siga. Esc volta ao museu."
      concluida={concluida}
      resumoTitulo="O software chegou às pessoas"
      resumoTexto="Do Patinho Feio ao PC, à planilha, ao software livre e à janela. O Brasil regula o programa e os bancos escrevem os seus. A rede vem a seguir."
      onVoltar={onVoltar}
      onConcluir={onConcluir}
    >
      <div className="gabinete">
        <div className="tela-crt">
          <div className="barra">Micro Museu · {certo ? certo.ano : 'fim da fase'}</div>
          <p className="tarefa">{aviso}</p>
          <div className="mesa">
            {opcoes.map((disco, indice) => (
              <button
                key={disco.id}
                type="button"
                className="icone"
                style={{ left: ['12%', '40%', '68%'][indice], top: '28%' }}
                onClick={() => escolher(disco)}
              >
                <span className="selo-icone" style={{ background: disco.cor }} />
                <span>{disco.nome}</span>
                <small>{disco.ano}</small>
              </button>
            ))}
          </div>
          {aberto && (
            <article className="janela">
              <header>
                {aberto.nome}
                <span>{aberto.ano}</span>
              </header>
              <p>{aberto.texto}</p>
              <button type="button" onClick={seguir}>
                Seguir a história
              </button>
            </article>
          )}
        </div>
      </div>
    </MolduraFase>
  )
}
