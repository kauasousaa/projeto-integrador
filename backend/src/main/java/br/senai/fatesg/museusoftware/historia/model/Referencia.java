package br.senai.fatesg.museusoftware.historia.model;

import br.senai.fatesg.museusoftware.shared.model.EntidadeBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "referencia")
public class Referencia extends EntidadeBase {

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "marco_id", nullable = false)
	private MarcoHistorico marco;

	@Column(nullable = false, length = 1000)
	private String citacao;

	@Column(length = 300)
	private String url;

	protected Referencia() {
	}

	public Referencia(MarcoHistorico marco, String citacao, String url) {
		if (marco == null) {
			throw new IllegalArgumentException("marco é obrigatório");
		}
		this.marco = marco;
		this.citacao = exigirTexto(citacao, "citacao");
		this.url = url == null || url.isBlank() ? null : url.trim();
	}

	public MarcoHistorico getMarco() {
		return marco;
	}

	public String getCitacao() {
		return citacao;
	}

	public String getUrl() {
		return url;
	}
}
