import { useEffect, useState } from 'react'
import { SpritePersonagem } from '../../features/jogo/components/SpritePersonagem'
import { buscarAparencia, salvarAparencia } from '../../services/api/aparencia'
import {
  APARENCIA_INICIAL,
  CORES_CABELO,
  CORES_CALCA,
  CORES_CAMISA,
  CORES_OLHOS,
  ESTILOS_CABELO,
  TOM_PELE,
  type Aparencia,
  type EstiloCabelo,
} from '../../types/aparencia'
import type { SessaoCriada } from '../../types/sessao'
import './TelaPersonagem.css'

type Propriedades = {
  sessao: SessaoCriada
  onTrocarNome: () => void
  onEntrar: (aparencia: Aparencia) => void
}

function proximoEstilo(atual: EstiloCabelo, direcao: 1 | -1) {
  const indice = ESTILOS_CABELO.findIndex((item) => item.id === atual)
  const proximo = (indice + direcao + ESTILOS_CABELO.length) % ESTILOS_CABELO.length
  return ESTILOS_CABELO[proximo].id
}

export function TelaPersonagem({ sessao, onTrocarNome, onEntrar }: Propriedades) {
  const [aparencia, setAparencia] = useState<Aparencia>(APARENCIA_INICIAL)
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    let ativo = true
    buscarAparencia(sessao.codigo)
      .then((salva) => {
        if (ativo) {
          setAparencia(salva)
        }
      })
      .catch((falha: unknown) => {
        if (ativo) {
          setErro(falha instanceof Error ? falha.message : 'Não foi possível carregar o personagem.')
        }
      })
      .finally(() => {
        if (ativo) {
          setCarregando(false)
        }
      })
    return () => {
      ativo = false
    }
  }, [sessao.codigo])

  function escolher<K extends keyof Aparencia>(campo: K, valor: Aparencia[K]) {
    setAparencia((atual) => ({ ...atual, [campo]: valor, salva: false }))
    setMensagem(null)
  }

  async function confirmar() {
    setSalvando(true)
    setErro(null)
    setMensagem(null)
    try {
      const salva = await salvarAparencia(sessao.codigo, aparencia)
      onEntrar(salva)
    } catch (falha) {
      setErro(falha instanceof Error ? falha.message : 'Não foi possível salvar o personagem.')
    } finally {
      setSalvando(false)
    }
  }

  const estiloAtual = ESTILOS_CABELO.find((item) => item.id === aparencia.cabelo)?.nome ?? 'Curto'

  return (
    <main className="tela-personagem">
      <div className="ceu" aria-hidden="true" />
      <section className="painel">
        <p className="fase">fase 00 · personagem</p>
        <h1>Monte seu personagem</h1>
        <p className="subtitulo">Olá, {sessao.apelido}. Escolha o visual antes de entrar no museu.</p>

        <div className="palco">
          {carregando ? <p className="dica">Carregando visual...</p> : <SpritePersonagem aparencia={aparencia} />}
        </div>

        <div className="seletor">
          <button type="button" aria-label="Cabelo anterior" onClick={() => escolher('cabelo', proximoEstilo(aparencia.cabelo, -1))}>
            ◀
          </button>
          <p>Cabelo: {estiloAtual}</p>
          <button type="button" aria-label="Próximo cabelo" onClick={() => escolher('cabelo', proximoEstilo(aparencia.cabelo, 1))}>
            ▶
          </button>
        </div>

        <Paleta titulo="Tom de pele" opcoes={TOM_PELE} selecionado={aparencia.tomPele} onEscolher={(id) => escolher('tomPele', id)} />
        <Paleta titulo="Cor do cabelo" opcoes={CORES_CABELO} selecionado={aparencia.corCabelo} onEscolher={(id) => escolher('corCabelo', id)} />
        <Paleta titulo="Olhos" opcoes={CORES_OLHOS} selecionado={aparencia.olhos} onEscolher={(id) => escolher('olhos', id)} />
        <Paleta titulo="Camisa" opcoes={CORES_CAMISA} selecionado={aparencia.camisa} onEscolher={(id) => escolher('camisa', id)} />
        <Paleta titulo="Calça" opcoes={CORES_CALCA} selecionado={aparencia.calca} onEscolher={(id) => escolher('calca', id)} />

        {erro ? (
          <p className="erro" role="alert">
            {erro}
          </p>
        ) : null}
        {mensagem ? <p className="ok">{mensagem}</p> : null}

        <div className="acoes">
          <button type="button" onClick={confirmar} disabled={carregando || salvando}>
            {salvando ? 'Entrando...' : 'Entrar no museu'}
          </button>
          <button type="button" className="secundario" onClick={onTrocarNome}>
            Trocar nome
          </button>
        </div>
      </section>
    </main>
  )
}

type PaletaProps<T extends string> = {
  titulo: string
  opcoes: { id: T; nome: string; cor: string }[]
  selecionado: T
  onEscolher: (id: T) => void
}

function Paleta<T extends string>({ titulo, opcoes, selecionado, onEscolher }: PaletaProps<T>) {
  const nome = opcoes.find((item) => item.id === selecionado)?.nome ?? ''
  return (
    <fieldset className="paleta">
      <legend>
        {titulo}: {nome}
      </legend>
      <div className="amostras">
        {opcoes.map((opcao) => (
          <button
            key={opcao.id}
            type="button"
            className={opcao.id === selecionado ? 'amostra ativa' : 'amostra'}
            style={{ background: opcao.cor }}
            aria-label={`${titulo} ${opcao.nome}`}
            aria-pressed={opcao.id === selecionado}
            onClick={() => onEscolher(opcao.id)}
          />
        ))}
      </div>
    </fieldset>
  )
}
