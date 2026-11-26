package br.senai.fatesg.museusoftware.jogador.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CriarSessaoRequest(
		@NotBlank(message = "Informe um nome de usuário")
		@Size(max = 40, message = "O nome de usuário deve ter no máximo 40 caracteres")
		String apelido) {
}
