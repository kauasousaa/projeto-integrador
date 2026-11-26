package br.senai.fatesg.museusoftware.historia.model;

import br.senai.fatesg.museusoftware.shared.model.EntidadeBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "personagem")
public class Personagem extends EntidadeBase {

	@Column(nullable = false, length = 120)
	private String nome;

	@Column(nullable = false, length = 500)
	private String descricao;

	protected Personagem() {
	}

	public Personagem(String nome, String descricao) {
		this.nome = exigirTexto(nome, "nome");
		this.descricao = exigirTexto(descricao, "descricao");
	}

	public String getNome() {
		return nome;
	}

	public String getDescricao() {
		return descricao;
	}
}
