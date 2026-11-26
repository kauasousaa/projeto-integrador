import { useEffect, useRef, useState } from 'react'
import type { Alvo, Prova } from '../../features/jogo/fase/provas'
import { CORES_CAMISA, TOM_PELE, corDe, type Aparencia } from '../../types/aparencia'
import './TelaTiro.css'

type Propriedades = {
  aparencia: Aparencia
  prova: Prova
  onVoltar: () => void
}

function embaralhar(lista: Alvo[]) {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const atual = copia[i]
    copia[i] = copia[j]
    copia[j] = atual
  }
  return copia
}

function Arma({ pele, camisa, disparo }: { pele: string; camisa: string; disparo: boolean }) {
  const tela = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = tela.current
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }
    ctx.imageSmoothingEnabled = false
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = camisa
    ctx.fillRect(0, 28, 18, 16)
    ctx.fillRect(34, 28, 18, 16)
    ctx.fillStyle = '#140e18'
    ctx.fillRect(0, 28, 18, 2)
    ctx.fillRect(34, 28, 18, 2)
    ctx.fillStyle = pele
    ctx.fillRect(8, 20, 14, 16)
    ctx.fillRect(30, 22, 12, 14)
    ctx.fillStyle = '#140e18'
    ctx.fillRect(18, 6, 14, 26)
    ctx.fillStyle = '#3a342c'
    ctx.fillRect(20, 8, 10, 22)
    ctx.fillStyle = '#6b6258'
    ctx.fillRect(22, 10, 6, 8)
    ctx.fillStyle = '#8a8172'
    ctx.fillRect(20, 24, 10, 4)
    if (disparo) {
      ctx.fillStyle = '#ffe14a'
      ctx.fillRect(20, 0, 10, 6)
      ctx.fillStyle = '#f4f1de'
      ctx.fillRect(22, 0, 6, 3)
    }
  }, [pele, camisa, disparo])

  return <canvas ref={tela} className="arma" width={52} height={44} aria-hidden="true" />
}

export function TelaTiro({ aparencia, prova, onVoltar }: Propriedades) {
  const [alvos] = useState(() => embaralhar(prova.alvos))
  const [escolha, setEscolha] = useState<string | null>(null)
  const [disparo, setDisparo] = useState(false)
  const pele = corDe(TOM_PELE, aparencia.tomPele)
  const camisa = corDe(CORES_CAMISA, aparencia.camisa)
  const alvo = alvos.find((item) => item.id === escolha) ?? null

  function atirar(id: string) {
    if (escolha) {
      return
    }
    setEscolha(id)
    setDisparo(true)
    window.setTimeout(() => setDisparo(false), 180)
  }

  return (
    <main className="tela-tiro">
      <p className="pergunta">
        {prova.pergunta}
        <span>Atire no alvo da resposta.</span>
      </p>
      <div className="parede">
        <div className="alvos">
          {alvos.map((item) => (
            <button
              key={item.id}
              type="button"
              className={escolha === item.id ? 'alvo atingido' : 'alvo'}
              onClick={() => atirar(item.id)}
              disabled={escolha !== null}
            >
              <span className="anel externo">
                <span className="anel meio">
                  <span className="anel centro" />
                </span>
              </span>
              <span className="nome">{item.nome}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="primeiro-plano" aria-hidden="true">
        <Arma pele={pele} camisa={camisa} disparo={disparo} />
      </div>
      {alvo && (
        <article className={alvo.certo ? 'resultado acerto' : 'resultado erro'} aria-live="polite">
          <h1>{alvo.certo ? 'Acertou' : 'Errou'}</h1>
          <p>
            {alvo.certo ? prova.acerto : prova.erro}
          </p>
          <button type="button" onClick={onVoltar}>
            Voltar ao museu
          </button>
        </article>
      )}
    </main>
  )
}
