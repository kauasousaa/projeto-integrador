import { useEffect, useState, type FormEvent } from 'react'
import { CHAVE_SESSAO } from '../../constants/sessao'
import { criarSessao } from '../../services/api/sessao'
import type { SessaoCriada } from '../../types/sessao'
import './TelaLogin.css'

export function TelaLogin() {
  const [nome, setNome] = useState('')
  const [sessao, setSessao] = useState<SessaoCriada | null>(null)
  const [mensagem, setMensagem] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    const salva = localStorage.getItem(CHAVE_SESSAO)
    if (!salva) {
      return
    }
    try {
      setSessao(JSON.parse(salva) as SessaoCriada)
    } catch {
      localStorage.removeItem(CHAVE_SESSAO)
    }
  }, [])

  function sair() {
    localStorage.removeItem(CHAVE_SESSAO)
    setSessao(null)
    setNome('')
    setMensagem(null)
  }

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
      localStorage.setItem(CHAVE_SESSAO, JSON.stringify(criada))
      setSessao(criada)
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

        {sessao ? (
          <div className="boas-vindas">
            <p>
              Nome registrado, <strong>{sessao.apelido}</strong>.
            </p>
            <p>A primeira fase abre quando a jornada começar.</p>
            <button type="button" onClick={sair}>
              Trocar nome
            </button>
          </div>
        ) : (
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
        )}
      </section>

      <div className="chao" aria-hidden="true">
        <div className="heroi" />
        <div className="portal" />
      </div>
    </main>
  )
}
