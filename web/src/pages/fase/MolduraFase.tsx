import type { ReactNode } from 'react'
import './TelaPrimordios.css'

type Propriedades = {
  tema: 'laboratorio' | 'expansao' | 'rede' | 'futuro'
  selo: string
  titulo: string
  controles: string
  concluida: boolean
  resumoTitulo: string
  resumoTexto: string
  children: ReactNode
  onVoltar: () => void
  onConcluir: () => void
}

export function MolduraFase({
  tema,
  selo,
  titulo,
  controles,
  concluida,
  resumoTitulo,
  resumoTexto,
  children,
  onVoltar,
  onConcluir,
}: Propriedades) {
  return (
    <main className={`tela-fase tema-${tema}`}>
      <div className="miolo">{children}</div>
      <header className="guia">
        <div className="identidade">
          <p className="selo">{selo}</p>
          <h1>{titulo}</h1>
        </div>
        <button type="button" onClick={concluida ? onConcluir : onVoltar}>
          Voltar ao museu
        </button>
      </header>
      <p className="controles">{controles}</p>
      {concluida && (
        <article className="fim" aria-live="polite">
          <h2>{resumoTitulo}</h2>
          <p>{resumoTexto}</p>
          <button type="button" onClick={onConcluir}>
            Voltar ao museu
          </button>
        </article>
      )}
    </main>
  )
}
