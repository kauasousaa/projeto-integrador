package br.senai.fatesg.museusoftware.desafio.model;

import br.senai.fatesg.museusoftware.historia.model.Fase;
import br.senai.fatesg.museusoftware.shared.model.EntidadeBase;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "tipo", length = 30)
@Table(name = "desafio")
public abstract class Desafio extends EntidadeBase {

	@Column(nullable = false, length = 120)
	private String titulo;

	@Column(nullable = false, length = 1000)
	private String enunciado;

	@Column(nullable = false)
	private int pontuacao;

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "fase_id", nullable = false)
	private Fase fase;

	protected Desafio() {
	}

	protected Desafio(String titulo, String enunciado, int pontuacao, Fase fase) {
		if (pontuacao < 1) {
			throw new IllegalArgumentException("pontuacao deve ser positiva");
		}
		if (fase == null) {
			throw new IllegalArgumentException("fase é obrigatória");
		}
		this.titulo = exigirTexto(titulo, "titulo");
		this.enunciado = exigirTexto(enunciado, "enunciado");
		this.pontuacao = pontuacao;
		this.fase = fase;
	}

	public abstract ResultadoAvaliacao avaliar(String resposta);

	protected final int pontuar(boolean acertou) {
		return acertou ? pontuacao : 0;
	}

	protected final String normalizar(String texto) {
		return texto == null ? "" : texto.trim().toLowerCase();
	}

	public String getTitulo() {
		return titulo;
	}

	public String getEnunciado() {
		return enunciado;
	}

	public int getPontuacao() {
		return pontuacao;
	}

	public Fase getFase() {
		return fase;
	}
}
