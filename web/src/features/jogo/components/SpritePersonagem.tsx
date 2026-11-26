import { PixelArt } from '../pixel/PixelArt'
import { montarPersonagem } from '../pixel/sprites'
import type { Aparencia } from '../../../types/aparencia'

type Propriedades = {
  aparencia: Aparencia
  escala?: number
}

export function SpritePersonagem({ aparencia, escala = 6 }: Propriedades) {
  return <PixelArt grade={montarPersonagem(aparencia)} escala={escala} />
}
