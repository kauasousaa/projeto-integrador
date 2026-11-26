package br.senai.fatesg.museusoftware.jogador.exception;

public class NomeEmUsoException extends RuntimeException {

	public NomeEmUsoException() {
		super("Este nome de usuário já está sendo utilizado. Escolha outro nome de usuário.");
	}
}
