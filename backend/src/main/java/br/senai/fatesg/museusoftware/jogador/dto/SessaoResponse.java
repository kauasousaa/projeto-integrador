package br.senai.fatesg.museusoftware.jogador.dto;

import java.time.Instant;

public record SessaoResponse(String codigo, String apelido, Instant iniciadaEm) {
}
