package br.senai.fatesg.museusoftware.historia.model;

import br.senai.fatesg.museusoftware.shared.model.EntidadeBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "fase")
public class Fase extends EntidadeBase {

	@Column(nullable = false, unique = true)
	private int numero;

	@Column(nullable = false, length = 80)
	private String nome;

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "periodo_id", nullable = false)
	private Periodo periodo;

	@Column(nullable = false, length = 500)
	private String descricao;

	protected Fase() {
	}

	public Fase(int numero, String nome, Periodo periodo, String descricao) {
		if (numero < 1) {
			throw new IllegalArgumentException("numero deve ser positivo");
		}
		if (periodo == null) {
			throw new IllegalArgumentException("periodo é obrigatório");
		}
		this.numero = numero;
		this.nome = exigirTexto(nome, "nome");
		this.periodo = periodo;
		this.descricao = exigirTexto(descricao, "descricao");
	}

	public int getNumero() {
		return numero;
	}

	public String getNome() {
		return nome;
	}

	public Periodo getPeriodo() {
		return periodo;
	}

	public String getDescricao() {
		return descricao;
	}
}
