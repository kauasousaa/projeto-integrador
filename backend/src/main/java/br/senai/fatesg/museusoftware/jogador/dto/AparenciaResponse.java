package br.senai.fatesg.museusoftware.jogador.dto;

import br.senai.fatesg.museusoftware.jogador.model.CorCabelo;
import br.senai.fatesg.museusoftware.jogador.model.CorCalca;
import br.senai.fatesg.museusoftware.jogador.model.CorCamisa;
import br.senai.fatesg.museusoftware.jogador.model.CorOlhos;
import br.senai.fatesg.museusoftware.jogador.model.EstiloCabelo;
import br.senai.fatesg.museusoftware.jogador.model.TomPele;

public record AparenciaResponse(
		TomPele tomPele,
		EstiloCabelo cabelo,
		CorCabelo corCabelo,
		CorOlhos olhos,
		CorCamisa camisa,
		CorCalca calca,
		boolean salva) {
}
