export type TomPele = 'CLARO' | 'PESSEGO' | 'MORENO' | 'BRONZE' | 'ESCURO'
export type EstiloCabelo = 'CURTO' | 'FRANJA' | 'LONGO' | 'COQUE' | 'CARECA'
export type CorCabelo = 'PRETO' | 'CASTANHO' | 'LOIRO' | 'RUIVO' | 'ROSA'
export type CorOlhos = 'CASTANHO' | 'VERDE' | 'AZUL' | 'MEL'
export type CorCamisa = 'VERMELHO' | 'AZUL' | 'VERDE' | 'ROXO' | 'AMARELO'
export type CorCalca = 'AZUL' | 'PRETO' | 'MARROM' | 'VERDE'

export type Aparencia = {
  tomPele: TomPele
  cabelo: EstiloCabelo
  corCabelo: CorCabelo
  olhos: CorOlhos
  camisa: CorCamisa
  calca: CorCalca
  salva: boolean
}

export const APARENCIA_INICIAL: Aparencia = {
  tomPele: 'PESSEGO',
  cabelo: 'CURTO',
  corCabelo: 'CASTANHO',
  olhos: 'CASTANHO',
  camisa: 'VERMELHO',
  calca: 'AZUL',
  salva: false,
}

export const TOM_PELE: { id: TomPele; nome: string; cor: string }[] = [
  { id: 'CLARO', nome: 'Claro', cor: '#f3d2b5' },
  { id: 'PESSEGO', nome: 'Pêssego', cor: '#e8b48a' },
  { id: 'MORENO', nome: 'Moreno', cor: '#c68642' },
  { id: 'BRONZE', nome: 'Bronze', cor: '#8d5524' },
  { id: 'ESCURO', nome: 'Escuro', cor: '#4a2912' },
]

export const ESTILOS_CABELO: { id: EstiloCabelo; nome: string }[] = [
  { id: 'CURTO', nome: 'Curto' },
  { id: 'FRANJA', nome: 'Franja' },
  { id: 'LONGO', nome: 'Longo' },
  { id: 'COQUE', nome: 'Coque' },
  { id: 'CARECA', nome: 'Careca' },
]

export const CORES_CABELO: { id: CorCabelo; nome: string; cor: string }[] = [
  { id: 'PRETO', nome: 'Preto', cor: '#1c1c1c' },
  { id: 'CASTANHO', nome: 'Castanho', cor: '#6b3e26' },
  { id: 'LOIRO', nome: 'Loiro', cor: '#e6c36a' },
  { id: 'RUIVO', nome: 'Ruivo', cor: '#c4491d' },
  { id: 'ROSA', nome: 'Rosa', cor: '#e56bb5' },
]

export const CORES_OLHOS: { id: CorOlhos; nome: string; cor: string }[] = [
  { id: 'CASTANHO', nome: 'Castanho', cor: '#5a341c' },
  { id: 'VERDE', nome: 'Verde', cor: '#3d8c4a' },
  { id: 'AZUL', nome: 'Azul', cor: '#3a7bd5' },
  { id: 'MEL', nome: 'Mel', cor: '#c9892d' },
]

export const CORES_CAMISA: { id: CorCamisa; nome: string; cor: string }[] = [
  { id: 'VERMELHO', nome: 'Vermelha', cor: '#d7263d' },
  { id: 'AZUL', nome: 'Azul', cor: '#2f6fed' },
  { id: 'VERDE', nome: 'Verde', cor: '#2f9e44' },
  { id: 'ROXO', nome: 'Roxa', cor: '#7b2cbf' },
  { id: 'AMARELO', nome: 'Amarela', cor: '#f0c419' },
]

export const CORES_CALCA: { id: CorCalca; nome: string; cor: string }[] = [
  { id: 'AZUL', nome: 'Jeans', cor: '#2c4c7c' },
  { id: 'PRETO', nome: 'Preta', cor: '#222222' },
  { id: 'MARROM', nome: 'Marrom', cor: '#6b4423' },
  { id: 'VERDE', nome: 'Verde', cor: '#1f6b45' },
]

export function corDe<T extends string>(lista: { id: T; cor: string }[], id: T) {
  return lista.find((item) => item.id === id)?.cor ?? '#000'
}
