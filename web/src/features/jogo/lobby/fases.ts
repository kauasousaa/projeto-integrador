export type CodigoFase = 'PRIMORDIOS' | 'FUNDACAO' | 'EXPANSAO' | 'INTERNET' | 'ERA_DIGITAL'

export type FaseLobby = {
  id: CodigoFase
  numero: number
  nome: string
  quando: string
  tema: string
  como: string
  clima: 'passado' | 'laboratorio' | 'expansao' | 'rede' | 'futuro'
  icone: (string | null)[][]
}

function grade(linhas: string[], cores: Record<string, string>) {
  linhas.forEach((linha, indice) => {
    if (linha.length !== 16) {
      throw new Error(`Ícone linha ${indice} tem ${linha.length} pixels`)
    }
  })
  return linhas.map((linha) => [...linha].map((simbolo) => (simbolo === '.' ? null : cores[simbolo])))
}

const primordios = grade(
  [
    '................',
    '....oooooooo....',
    '...oaaaaaaaaao..',
    '...oa.a.a.a.ao..',
    '...oaaaaaaaaao..',
    '...oa.a.a.a.ao..',
    '...oaaaaaaaaao..',
    '....oooooooo....',
    '......o..o......',
    '.....oo..oo.....',
    '................',
    '................',
  ],
  { o: '#3a2414', a: '#e6c36a' },
)

const fundacao = grade(
  [
    '................',
    '...oooooooooo...',
    '..oaabbbbbaao...',
    '..oaabbbbbaao...',
    '..oaaaaaaaaao...',
    '...oooooooooo...',
    '.....o....o.....',
    '....oo....oo....',
    '................',
    '................',
    '................',
    '................',
  ],
  { o: '#17381c', a: '#7dffb3', b: '#1b4d32' },
)

const expansao = grade(
  [
    '................',
    '..oooooooooooo..',
    '.oaaaaaaaaaaaao.',
    '.oaaa......aaao.',
    '.oaaaaaaaaaaaao.',
    '..oooooooooooo..',
    '.....oooooo.....',
    '......oooo......',
    '................',
    '................',
    '................',
    '................',
  ],
  { o: '#1a1028', a: '#f0c419' },
)

const internet = grade(
  [
    '................',
    '....oooo........',
    '...oaaaao.......',
    '....oooo........',
    '......ooooo.....',
    '.........oooo...',
    '........oaaaao..',
    '.........oooo...',
    '....oooo........',
    '...oaaaao.......',
    '....oooo........',
    '................',
  ],
  { o: '#10204a', a: '#7eb6ff' },
)

const futuro = grade(
  [
    '................',
    '..o.oooooooo.o..',
    '..oooaaaaaaaoo..',
    '..ooa.aaaa.aoo..',
    '..oooaaaaaaaoo..',
    '..o.oooooooo.o..',
    '....o..aa..o....',
    '.....oooooo.....',
    '................',
    '................',
    '................',
    '................',
  ],
  { o: '#7dffb3', a: '#c77dff' },
)

export const FASES_LOBBY: FaseLobby[] = [
  {
    id: 'PRIMORDIOS',
    numero: 1,
    nome: 'Primórdios',
    quando: 'até 1945',
    tema: 'O começo: contas, cartões e a ideia de um programa.',
    como: 'A corrida conta como o programa nasceu.',
    clima: 'passado',
    icone: primordios,
  },
  {
    id: 'FUNDACAO',
    numero: 2,
    nome: 'Fundação',
    quando: '1945–1969',
    tema: 'Compiladores, linguagens e o software que sai do laboratório.',
    como: 'O laboratório conta a linguagem e a engenharia.',
    clima: 'laboratorio',
    icone: fundacao,
  },
  {
    id: 'EXPANSAO',
    numero: 3,
    nome: 'Expansão',
    quando: '1970–1989',
    tema: 'O código sai dos laboratórios e chega às casas.',
    como: 'O micro conta o software virando produto.',
    clima: 'expansao',
    icone: expansao,
  },
  {
    id: 'INTERNET',
    numero: 4,
    nome: 'Internet',
    quando: '1990–2009',
    tema: 'A rede liga o mundo e muda a vida do software.',
    como: 'A rede conta a web, o código livre e o ágil.',
    clima: 'rede',
    icone: internet,
  },
  {
    id: 'ERA_DIGITAL',
    numero: 5,
    nome: 'Era digital',
    quando: '2010–hoje',
    tema: 'Nuvem, dados e o que o código ainda vai inventar.',
    como: 'A nuvem conta o software de agora.',
    clima: 'futuro',
    icone: futuro,
  },
]
