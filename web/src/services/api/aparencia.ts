import type { Aparencia } from '../../types/aparencia'

type ErroApi = {
  mensagem?: string
}

async function lerCorpo(resposta: Response): Promise<(Aparencia & ErroApi) | null> {
  return (await resposta.json().catch(() => null)) as (Aparencia & ErroApi) | null
}

export async function buscarAparencia(codigo: string): Promise<Aparencia> {
  let resposta: Response
  try {
    resposta = await fetch(`/api/sessoes/${codigo}/aparencia`)
  } catch {
    throw new Error('Não foi possível falar com o servidor. Verifique se a API está no ar.')
  }
  const corpo = await lerCorpo(resposta)
  if (!resposta.ok) {
    throw new Error(corpo?.mensagem ?? 'Não foi possível carregar o personagem.')
  }
  if (!corpo?.tomPele) {
    throw new Error('Resposta inválida do servidor.')
  }
  return corpo
}

export async function salvarAparencia(codigo: string, aparencia: Aparencia): Promise<Aparencia> {
  let resposta: Response
  try {
    resposta = await fetch(`/api/sessoes/${codigo}/aparencia`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tomPele: aparencia.tomPele,
        cabelo: aparencia.cabelo,
        corCabelo: aparencia.corCabelo,
        olhos: aparencia.olhos,
        camisa: aparencia.camisa,
        calca: aparencia.calca,
      }),
    })
  } catch {
    throw new Error('Não foi possível falar com o servidor. Verifique se a API está no ar.')
  }
  const corpo = await lerCorpo(resposta)
  if (!resposta.ok) {
    throw new Error(corpo?.mensagem ?? 'Não foi possível salvar o personagem.')
  }
  if (!corpo?.tomPele) {
    throw new Error('Resposta inválida do servidor.')
  }
  return corpo
}
