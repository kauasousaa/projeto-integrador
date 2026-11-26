package br.senai.fatesg.museusoftware.progresso.model;

import java.time.Instant;

import br.senai.fatesg.museusoftware.historia.model.Fase;
import br.senai.fatesg.museusoftware.jogador.model.Sessao;
import br.senai.fatesg.museusoftware.shared.model.EntidadeBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "progresso_fase", uniqueConstraints = @UniqueConstraint(columnNames = { "sessao_id", "fase_id" }))
public class ProgressoFase extends EntidadeBase {

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "sessao_id", nullable = false)
	private Sessao sessao;

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "fase_id", nullable = false)
	private Fase fase;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 20)
	private StatusProgresso status;

	@Column(nullable = false)
	private int pontuacao;

	@Column(name = "atualizado_em", nullable = false)
	private Instant atualizadoEm;

	@Column(name = "concluido_em")
	private Instant concluidoEm;

	protected ProgressoFase() {
	}

	public ProgressoFase(Sessao sessao, Fase fase) {
		if (sessao == null || fase == null) {
			throw new IllegalArgumentException("sessao e fase são obrigatórias");
		}
		this.sessao = sessao;
		this.fase = fase;
		this.status = StatusProgresso.NAO_INICIADO;
		this.pontuacao = 0;
		this.atualizadoEm = Instant.now();
	}

	public void iniciar() {
		if (status == StatusProgresso.CONCLUIDO) {
			throw new IllegalStateException("fase já concluída");
		}
		this.status = StatusProgresso.EM_ANDAMENTO;
		this.atualizadoEm = Instant.now();
	}

	public void concluir(int pontos) {
		if (status == StatusProgresso.CONCLUIDO) {
			throw new IllegalStateException("fase já concluída");
		}
		if (pontos < 0) {
			throw new IllegalArgumentException("pontos não pode ser negativo");
		}
		this.status = StatusProgresso.CONCLUIDO;
		this.pontuacao = pontos;
		this.concluidoEm = Instant.now();
		this.atualizadoEm = this.concluidoEm;
	}

	public Sessao getSessao() {
		return sessao;
	}

	public Fase getFase() {
		return fase;
	}

	public StatusProgresso getStatus() {
		return status;
	}

	public int getPontuacao() {
		return pontuacao;
	}

	public Instant getAtualizadoEm() {
		return atualizadoEm;
	}

	public Instant getConcluidoEm() {
		return concluidoEm;
	}
}
