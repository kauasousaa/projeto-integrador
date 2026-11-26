package br.senai.fatesg.museusoftware.shared.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.senai.fatesg.museusoftware.jogador.exception.NomeEmUsoException;
import br.senai.fatesg.museusoftware.jogador.exception.SessaoNaoEncontradaException;
import br.senai.fatesg.museusoftware.shared.dto.ApiErro;

@RestControllerAdvice
public class TratadorDeErros {

	@ExceptionHandler(SessaoNaoEncontradaException.class)
	public ResponseEntity<ApiErro> sessaoNaoEncontrada(SessaoNaoEncontradaException excecao) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiErro(404, excecao.getMessage()));
	}

	@ExceptionHandler(NomeEmUsoException.class)
	public ResponseEntity<ApiErro> nomeEmUso(NomeEmUsoException excecao) {
		return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiErro(409, excecao.getMessage()));
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiErro> dadosInvalidos(MethodArgumentNotValidException excecao) {
		String mensagem = excecao.getBindingResult().getFieldErrors().stream()
				.findFirst()
				.map(erro -> erro.getDefaultMessage())
				.orElse("Dados inválidos");
		return ResponseEntity.badRequest().body(new ApiErro(400, mensagem));
	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<ApiErro> argumentoInvalido(IllegalArgumentException excecao) {
		return ResponseEntity.badRequest().body(new ApiErro(400, excecao.getMessage()));
	}
}
