import * as primordios from '../../features/jogo/fase/primordios'
import type { Aparencia } from '../../types/aparencia'
import { TelaFase, type Relato } from './TelaFase'

type Propriedades = {
  aparencia: Aparencia
  onVoltar: () => void
  onConcluir: () => void
}

const RELATOS: Relato[] = [
  {
    apartirDe: 0,
    ano: '1804',
    titulo: 'A instrução sai da máquina',
    texto:
      'Ainda não existe a palavra software. O tear de Jacquard troca o desenho do tecido com cartões perfurados: a sequência de instruções muda sem reconstruir a máquina.',
  },
  {
    apartirDe: 520,
    ano: '1843',
    titulo: 'Ada escreve um programa',
    texto:
      'Ada Lovelace publica um algoritmo para a Máquina Analítica de Babbage, o primeiro programa. Ela vê que a máquina pode tratar símbolos, não só números. No Brasil, o governo ainda usa tabuladoras de cartão: o computador não chegou.',
  },
  {
    apartirDe: 900,
    ano: '1936',
    titulo: 'Uma máquina para qualquer programa',
    texto:
      'Alan Turing descreve uma máquina universal. Uma máquina só passa a poder executar qualquer programa. Esse é o fundamento teórico de todo software.',
  },
  {
    apartirDe: 1260,
    ano: '1945',
    titulo: 'O programa entra na memória',
    texto:
      'O ENIAC é programado com cabos e chaves, por seis programadoras. Von Neumann descreve o programa guardado na mesma memória dos dados. Em 1948, o Manchester Baby executa o primeiro programa assim.',
  },
]

export function TelaPrimordios({ aparencia, onVoltar, onConcluir }: Propriedades) {
  return (
    <TelaFase
      aparencia={aparencia}
      fase={primordios}
      selo="fase 01 · até 1945"
      titulo="Primórdios"
      resumoTitulo="O programa já existe"
      resumoTexto="A instrução se separou da máquina, virou um programa publicado e depois passou a morar na memória. O próximo passo é escrever isso numa linguagem."
      rotulo="Fase Primórdios. Corra a história do programa, do cartão até a memória."
      relatos={RELATOS}
      onVoltar={onVoltar}
      onConcluir={onConcluir}
    />
  )
}
