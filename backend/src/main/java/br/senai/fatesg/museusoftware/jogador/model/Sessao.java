package br.senai.fatesg.museusoftware.jogador.model;

import java.time.Instant;
import java.util.Locale;
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

	@Column(name = "apelido_normalizado", nullable = false, unique = true, length = 40, updatable = false)
	private String apelidoNormalizado;

	@Column(name = "iniciada_em", nullable = false, updatable = false)
	private Instant iniciadaEm;

	@Column(name = "atualizada_em", nullable = false)
	private Instant atualizadaEm;

	protected Sessao() {
	}

	public Sessao(String apelido) {
		this.codigo = UUID.randomUUID().toString();
		this.apelido = normalizarExibicao(apelido);
		this.apelidoNormalizado = normalizarChave(this.apelido);
		this.iniciadaEm = Instant.now();
		this.atualizadaEm = this.iniciadaEm;
	}

	public static String normalizarChave(String apelido) {
		return normalizarExibicao(apelido).toLowerCase(Locale.ROOT);
	}

	private static String normalizarExibicao(String apelido) {
		String texto = exigirTexto(apelido, "apelido");
		if (texto.length() > 40) {
			throw new IllegalArgumentException("apelido deve ter no máximo 40 caracteres");
		}
		return texto;
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
