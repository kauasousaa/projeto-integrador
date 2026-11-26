import { useMemo, useState, type FormEvent } from 'react'
import { SpritePersonagem } from '../../features/jogo/components/SpritePersonagem'
import { PixelArt } from '../../features/jogo/pixel/PixelArt'
import { portalPixel } from '../../features/jogo/pixel/sprites'
import { criarSessao } from '../../services/api/sessao'
import { APARENCIA_INICIAL } from '../../types/aparencia'
import type { SessaoCriada } from '../../types/sessao'
import './TelaLogin.css'

type Propriedades = {
  onEntrar: (sessao: SessaoCriada) => void
}

export function TelaLogin({ onEntrar }: Propriedades) {
  const [nome, setNome] = useState('')
  const [mensagem, setMensagem] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)
  const portal = useMemo(() => portalPixel(), [])

  async function entrar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const apelido = nome.trim()
    if (!apelido) {
      setMensagem('Informe um nome de usuário.')
      return
    }

    setCarregando(true)
    setMensagem(null)
    try {
      const criada = await criarSessao(apelido)
      onEntrar(criada)
    } catch (erro) {
      setMensagem(erro instanceof Error ? erro.message : 'Não foi possível criar o nome de usuário.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="tela-login">
      <div className="ceu" aria-hidden="true" />
      <section className="painel">
        <p className="fase">fase 00 · entrada</p>
        <h1>Museu do Software</h1>
        <p className="subtitulo">Uma jornada 8-bit pela evolução do código.</p>

        <form onSubmit={entrar} noValidate>
            <label htmlFor="nome-usuario">Nome de usuário</label>
            <input
              id="nome-usuario"
              name="apelido"
              value={nome}
              maxLength={40}
              autoComplete="username"
              autoFocus
              disabled={carregando}
              aria-invalid={mensagem ? true : undefined}
              aria-describedby={mensagem ? 'erro-nome' : undefined}
              onChange={(evento) => {
                setNome(evento.target.value)
                if (mensagem) {
                  setMensagem(null)
                }
              }}
            />
            {mensagem ? (
              <p id="erro-nome" className="erro" role="alert">
                {mensagem}
              </p>
            ) : (
              <p className="dica">Só o nome. Ele precisa ser único no museu.</p>
            )}
            <button type="submit" disabled={carregando}>
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
      </section>

      <div className="chao" aria-hidden="true">
        <div className="heroi">
          <SpritePersonagem aparencia={APARENCIA_INICIAL} escala={4} />
        </div>
        <div className="portal">
          <PixelArt grade={portal} escala={4} />
        </div>
      </div>
    </main>
  )
}
