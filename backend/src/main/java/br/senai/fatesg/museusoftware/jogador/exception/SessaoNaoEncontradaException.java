package br.senai.fatesg.museusoftware.jogador.exception;

public class SessaoNaoEncontradaException extends RuntimeException {

	public SessaoNaoEncontradaException() {
		super("Sessão não encontrada.");
	}
}
