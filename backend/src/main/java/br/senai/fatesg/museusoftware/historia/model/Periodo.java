package br.senai.fatesg.museusoftware.historia.model;

import br.senai.fatesg.museusoftware.shared.model.EntidadeBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

@Entity
@Table(name = "periodo")
public class Periodo extends EntidadeBase {

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, unique = true, length = 20)
	private CodigoPeriodo codigo;

	@Column(nullable = false, length = 80)
	private String nome;

	@Column(nullable = false, length = 40)
	private String intervalo;

	@Column(nullable = false, unique = true)
	private int ordem;

	@Column(nullable = false, length = 500)
	private String resumo;

	protected Periodo() {
	}

	public Periodo(CodigoPeriodo codigo, String nome, String intervalo, int ordem, String resumo) {
		if (codigo == null) {
			throw new IllegalArgumentException("codigo é obrigatório");
		}
		if (ordem < 1) {
			throw new IllegalArgumentException("ordem deve ser positiva");
		}
		this.codigo = codigo;
		this.nome = exigirTexto(nome, "nome");
		this.intervalo = exigirTexto(intervalo, "intervalo");
		this.ordem = ordem;
		this.resumo = exigirTexto(resumo, "resumo");
	}

	public CodigoPeriodo getCodigo() {
		return codigo;
	}

	public String getNome() {
		return nome;
	}

	public String getIntervalo() {
		return intervalo;
	}

	public int getOrdem() {
		return ordem;
	}

	public String getResumo() {
		return resumo;
	}
}
