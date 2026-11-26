package br.senai.fatesg.museusoftware.jogador.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.senai.fatesg.museusoftware.jogador.dto.AparenciaRequest;
import br.senai.fatesg.museusoftware.jogador.dto.AparenciaResponse;
import br.senai.fatesg.museusoftware.jogador.service.AparenciaService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/sessoes/{codigo}/aparencia")
public class AparenciaController {

	private final AparenciaService aparencias;

	public AparenciaController(AparenciaService aparencias) {
		this.aparencias = aparencias;
	}

	@GetMapping
	public AparenciaResponse buscar(@PathVariable String codigo) {
		return aparencias.buscar(codigo);
	}

	@PutMapping
	public ResponseEntity<AparenciaResponse> salvar(@PathVariable String codigo,
			@Valid @RequestBody AparenciaRequest requisicao) {
		return ResponseEntity.ok(aparencias.salvar(codigo, requisicao));
	}
}
