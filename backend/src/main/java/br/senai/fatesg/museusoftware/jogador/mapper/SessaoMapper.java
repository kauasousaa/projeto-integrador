package br.senai.fatesg.museusoftware.jogador.mapper;

import br.senai.fatesg.museusoftware.jogador.dto.SessaoResponse;
import br.senai.fatesg.museusoftware.jogador.model.Sessao;

public final class SessaoMapper {

	private SessaoMapper() {
	}

	public static SessaoResponse paraResposta(Sessao sessao) {
		return new SessaoResponse(sessao.getCodigo(), sessao.getApelido(), sessao.getIniciadaEm());
	}
}
