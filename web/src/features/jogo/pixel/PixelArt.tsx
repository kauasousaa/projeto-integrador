import { useEffect, useRef } from 'react'

type Propriedades = {
  grade: (string | null)[][]
  escala: number
}

export function PixelArt({ grade, escala }: Propriedades) {
  const tela = useRef<HTMLCanvasElement>(null)
  const altura = grade.length
  const largura = grade[0]?.length ?? 0

  useEffect(() => {
    const canvas = tela.current
    if (!canvas) {
      return
    }
    const contexto = canvas.getContext('2d')
    if (!contexto) {
      return
    }
    contexto.imageSmoothingEnabled = false
    contexto.clearRect(0, 0, largura, altura)
    grade.forEach((linha, y) => {
      linha.forEach((cor, x) => {
        if (!cor) {
          return
        }
        contexto.fillStyle = cor
        contexto.fillRect(x, y, 1, 1)
      })
    })
  }, [grade, largura, altura])

  return (
    <canvas
      ref={tela}
      width={largura}
      height={altura}
      aria-hidden="true"
      style={{
        width: largura * escala,
        height: altura * escala,
        imageRendering: 'pixelated',
        display: 'block',
      }}
    />
  )
}
