package br.senai.fatesg.museusoftware.progresso.model;

import java.time.Instant;

import br.senai.fatesg.museusoftware.desafio.model.Desafio;
import br.senai.fatesg.museusoftware.desafio.model.ResultadoAvaliacao;
import br.senai.fatesg.museusoftware.jogador.model.Sessao;
import br.senai.fatesg.museusoftware.shared.model.EntidadeBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "progresso_desafio", uniqueConstraints = @UniqueConstraint(columnNames = { "sessao_id", "desafio_id" }))
public class ProgressoDesafio extends EntidadeBase {

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "sessao_id", nullable = false)
	private Sessao sessao;

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "desafio_id", nullable = false)
	private Desafio desafio;

	@Column(nullable = false)
	private boolean respondido;

	private Boolean acertou;

	@Column(nullable = false)
	private int pontos;

	@Column(name = "respondido_em")
	private Instant respondidoEm;

	protected ProgressoDesafio() {
	}

	public ProgressoDesafio(Sessao sessao, Desafio desafio) {
		if (sessao == null || desafio == null) {
			throw new IllegalArgumentException("sessao e desafio são obrigatórios");
		}
		this.sessao = sessao;
		this.desafio = desafio;
		this.respondido = false;
		this.pontos = 0;
	}

	public void registrar(ResultadoAvaliacao resultado) {
		if (respondido) {
			throw new IllegalStateException("desafio já respondido nesta sessão");
		}
		if (resultado == null) {
			throw new IllegalArgumentException("resultado é obrigatório");
		}
		this.respondido = true;
		this.acertou = resultado.acertou();
		this.pontos = resultado.pontos();
		this.respondidoEm = Instant.now();
	}

	public Sessao getSessao() {
		return sessao;
	}

	public Desafio getDesafio() {
		return desafio;
	}

	public boolean isRespondido() {
		return respondido;
	}

	public Boolean getAcertou() {
		return acertou;
	}

	public int getPontos() {
		return pontos;
	}

	public Instant getRespondidoEm() {
		return respondidoEm;
	}
}
