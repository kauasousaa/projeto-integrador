package br.senai.fatesg.museusoftware.jogador.model;

import java.time.Instant;
import java.util.UUID;

import br.senai.fatesg.museusoftware.shared.model.EntidadeBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "sessao")
public class Sessao extends EntidadeBase {

	@Column(nullable = false, unique = true, length = 36, updatable = false)
	private String codigo;

	@Column(nullable = false, length = 40)
	private String apelido;

	@Column(name = "iniciada_em", nullable = false, updatable = false)
	private Instant iniciadaEm;

	@Column(name = "atualizada_em", nullable = false)
	private Instant atualizadaEm;

	protected Sessao() {
	}

	public Sessao(String apelido) {
		this.codigo = UUID.randomUUID().toString();
		this.apelido = exigirTexto(apelido, "apelido");
		if (this.apelido.length() > 40) {
			throw new IllegalArgumentException("apelido deve ter no máximo 40 caracteres");
		}
		this.iniciadaEm = Instant.now();
		this.atualizadaEm = this.iniciadaEm;
	}

	public void registrarAtividade() {
		this.atualizadaEm = Instant.now();
	}

	public String getCodigo() {
		return codigo;
	}

	public String getApelido() {
		return apelido;
	}

	public Instant getIniciadaEm() {
		return iniciadaEm;
	}

	public Instant getAtualizadaEm() {
		return atualizadaEm;
	}
}
