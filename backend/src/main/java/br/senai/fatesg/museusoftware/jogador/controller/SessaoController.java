package br.senai.fatesg.museusoftware.jogador.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.senai.fatesg.museusoftware.jogador.dto.CriarSessaoRequest;
import br.senai.fatesg.museusoftware.jogador.dto.SessaoResponse;
import br.senai.fatesg.museusoftware.jogador.mapper.SessaoMapper;
import br.senai.fatesg.museusoftware.jogador.service.SessaoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/sessoes")
public class SessaoController {

	private final SessaoService sessoes;

	public SessaoController(SessaoService sessoes) {
		this.sessoes = sessoes;
	}

	@PostMapping
	public ResponseEntity<SessaoResponse> criar(@Valid @RequestBody CriarSessaoRequest requisicao) {
		SessaoResponse resposta = SessaoMapper.paraResposta(sessoes.criar(requisicao.apelido()));
		return ResponseEntity.status(HttpStatus.CREATED).body(resposta);
	}
}
