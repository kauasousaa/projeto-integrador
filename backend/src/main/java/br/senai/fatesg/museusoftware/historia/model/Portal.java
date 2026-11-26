package br.senai.fatesg.museusoftware.historia.model;

import br.senai.fatesg.museusoftware.shared.model.EntidadeBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "portal")
public class Portal extends EntidadeBase {

	@Column(nullable = false, length = 80)
	private String nome;

	@OneToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "fase_origem_id", nullable = false, unique = true)
	private Fase faseOrigem;

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "fase_destino_id", nullable = false)
	private Fase faseDestino;

	protected Portal() {
	}

	public Portal(String nome, Fase faseOrigem, Fase faseDestino) {
		if (faseOrigem == null || faseDestino == null) {
			throw new IllegalArgumentException("origem e destino são obrigatórios");
		}
		if (faseOrigem.getNumero() >= faseDestino.getNumero()) {
			throw new IllegalArgumentException("o portal só avança para uma fase posterior");
		}
		this.nome = exigirTexto(nome, "nome");
		this.faseOrigem = faseOrigem;
		this.faseDestino = faseDestino;
	}

	public String getNome() {
		return nome;
	}

	public Fase getFaseOrigem() {
		return faseOrigem;
	}

	public Fase getFaseDestino() {
		return faseDestino;
	}
}
