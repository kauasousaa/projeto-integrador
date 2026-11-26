package br.senai.fatesg.museusoftware.jogador.dto;

import br.senai.fatesg.museusoftware.jogador.model.CorCabelo;
import br.senai.fatesg.museusoftware.jogador.model.CorCalca;
import br.senai.fatesg.museusoftware.jogador.model.CorCamisa;
import br.senai.fatesg.museusoftware.jogador.model.CorOlhos;
import br.senai.fatesg.museusoftware.jogador.model.EstiloCabelo;
import br.senai.fatesg.museusoftware.jogador.model.TomPele;
import jakarta.validation.constraints.NotNull;

public record AparenciaRequest(
		@NotNull(message = "Escolha um tom de pele") TomPele tomPele,
		@NotNull(message = "Escolha um cabelo") EstiloCabelo cabelo,
		@NotNull(message = "Escolha a cor do cabelo") CorCabelo corCabelo,
		@NotNull(message = "Escolha a cor dos olhos") CorOlhos olhos,
		@NotNull(message = "Escolha a camisa") CorCamisa camisa,
		@NotNull(message = "Escolha a calça") CorCalca calca) {
}
