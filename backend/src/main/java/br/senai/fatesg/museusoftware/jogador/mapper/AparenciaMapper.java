package br.senai.fatesg.museusoftware.jogador.mapper;

import br.senai.fatesg.museusoftware.jogador.dto.AparenciaResponse;
import br.senai.fatesg.museusoftware.jogador.model.Aparencia;
import br.senai.fatesg.museusoftware.jogador.model.CorCabelo;
import br.senai.fatesg.museusoftware.jogador.model.CorCalca;
import br.senai.fatesg.museusoftware.jogador.model.CorCamisa;
import br.senai.fatesg.museusoftware.jogador.model.CorOlhos;
import br.senai.fatesg.museusoftware.jogador.model.EstiloCabelo;
import br.senai.fatesg.museusoftware.jogador.model.TomPele;

public final class AparenciaMapper {

	private AparenciaMapper() {
	}

	public static AparenciaResponse paraResposta(Aparencia aparencia) {
		return new AparenciaResponse(aparencia.getTomPele(), aparencia.getCabelo(), aparencia.getCorCabelo(),
				aparencia.getOlhos(), aparencia.getCamisa(), aparencia.getCalca(), true);
	}

	public static AparenciaResponse padrao() {
		return new AparenciaResponse(TomPele.PESSEGO, EstiloCabelo.CURTO, CorCabelo.CASTANHO, CorOlhos.CASTANHO,
				CorCamisa.VERMELHO, CorCalca.AZUL, false);
	}
}
