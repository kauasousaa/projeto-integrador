export type Alvo = {
  id: string
  nome: string
  certo: boolean
}

export type Prova = {
  pergunta: string
  alvos: Alvo[]
  acerto: string
  erro: string
}

export const PROVA_PRIMORDIOS: Prova = {
  pergunta: 'Quem escreveu o primeiro programa de computador?',
  alvos: [
    { id: 'ada', nome: 'Ada Lovelace', certo: true },
    { id: 'turing', nome: 'Alan Turing', certo: false },
    { id: 'hopper', nome: 'Grace Hopper', certo: false },
  ],
  acerto: 'Ada Lovelace escreveu o primeiro programa publicado, em 1843, para a Máquina Analítica.',
  erro: 'Quem escreveu o primeiro programa foi Ada Lovelace, em 1843. Turing e Hopper vêm depois nessa história.',
}

export const PROVA_FUNDACAO: Prova = {
  pergunta: 'Quem criou o primeiro compilador?',
  alvos: [
    { id: 'hopper', nome: 'Grace Hopper', certo: true },
    { id: 'hamilton', nome: 'Margaret Hamilton', certo: false },
    { id: 'backus', nome: 'John Backus', certo: false },
  ],
  acerto: 'Grace Hopper criou o A-0 em 1952, o primeiro compilador. A ideia era escrever programas perto do inglês.',
  erro: 'O primeiro compilador foi o A-0, de Grace Hopper, em 1952. Hamilton cuidou da Apollo. Backus liderou o FORTRAN.',
}

export const PROVA_EXPANSAO: Prova = {
  pergunta: 'Qual foi a primeira planilha eletrônica?',
  alvos: [
    { id: 'visicalc', nome: 'VisiCalc', certo: true },
    { id: 'excel', nome: 'Excel', certo: false },
    { id: 'lotus', nome: 'Lotus 1-2-3', certo: false },
  ],
  acerto: 'O VisiCalc, de 1979, foi a primeira planilha. Ele fez muita gente comprar um computador.',
  erro: 'A primeira planilha foi o VisiCalc, em 1979. Lotus e Excel vieram depois.',
}

export const PROVA_INTERNET: Prova = {
  pergunta: 'Quem criou a World Wide Web?',
  alvos: [
    { id: 'tim', nome: 'Tim Berners-Lee', certo: true },
    { id: 'linus', nome: 'Linus Torvalds', certo: false },
    { id: 'brendan', nome: 'Brendan Eich', certo: false },
  ],
  acerto: 'Tim Berners-Lee publicou a Web em 1991, no CERN. HTML, HTTP e o endereço da página nascem aí.',
  erro: 'A Web foi criada por Tim Berners-Lee, no CERN, em 1991. Torvalds fez o Linux. Eich fez o JavaScript.',
}

export const PROVA_NUVEM: Prova = {
  pergunta: 'Qual sistema do Banco Central transfere dinheiro na hora desde 2020?',
  alvos: [
    { id: 'pix', nome: 'Pix', certo: true },
    { id: 'ted', nome: 'TED', certo: false },
    { id: 'boleto', nome: 'Boleto', certo: false },
  ],
  acerto: 'O Pix, de 2020, é software do Banco Central. A transferência liquida na hora, o dia todo.',
  erro: 'Quem transfere na hora, desde 2020, é o Pix. TED e boleto são outros meios, mais antigos.',
}
