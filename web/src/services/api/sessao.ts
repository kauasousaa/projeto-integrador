import type { SessaoCriada } from '../../types/sessao'

type ErroApi = {
  mensagem?: string
}

export async function criarSessao(apelido: string): Promise<SessaoCriada> {
  let resposta: Response
  try {
    resposta = await fetch('/api/sessoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apelido }),
    })
  } catch {
    throw new Error('Não foi possível falar com o servidor. Verifique se a API está no ar.')
  }

  const corpo = (await resposta.json().catch(() => null)) as (SessaoCriada & ErroApi) | null
  if (!resposta.ok) {
    throw new Error(corpo?.mensagem ?? 'Não foi possível criar o nome de usuário.')
  }
  if (!corpo?.codigo || !corpo.apelido) {
    throw new Error('Resposta inválida do servidor.')
  }
  return corpo
}
