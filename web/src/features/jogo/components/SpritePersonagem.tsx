import type { CSSProperties } from 'react'
import {
  corDe,
  CORES_CABELO,
  CORES_CALCA,
  CORES_CAMISA,
  CORES_OLHOS,
  TOM_PELE,
  type Aparencia,
} from '../../../types/aparencia'
import './SpritePersonagem.css'

type Propriedades = {
  aparencia: Aparencia
}

export function SpritePersonagem({ aparencia }: Propriedades) {
  const estilo = {
    '--pele': corDe(TOM_PELE, aparencia.tomPele),
    '--cabelo': corDe(CORES_CABELO, aparencia.corCabelo),
    '--olhos': corDe(CORES_OLHOS, aparencia.olhos),
    '--camisa': corDe(CORES_CAMISA, aparencia.camisa),
    '--calca': corDe(CORES_CALCA, aparencia.calca),
  } as CSSProperties

  return (
    <div className={`sprite cabelo-${aparencia.cabelo.toLowerCase()}`} style={estilo} aria-hidden="true">
      <div className="coque" />
      <div className="cabelo" />
      <div className="mechas" />
      <div className="cabeca">
        <div className="franja" />
        <span className="olho esq" />
        <span className="olho dir" />
        <span className="boca" />
      </div>
      <div className="tronco" />
      <div className="braco esq" />
      <div className="braco dir" />
      <div className="perna esq" />
      <div className="perna dir" />
      <div className="sapato esq" />
      <div className="sapato dir" />
    </div>
  )
}
