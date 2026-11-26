package br.senai.fatesg.museusoftware.shared.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class EntidadeBase {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	protected EntidadeBase() {
	}

	public Long getId() {
		return id;
	}

	protected static String exigirTexto(String valor, String campo) {
		if (valor == null || valor.isBlank()) {
			throw new IllegalArgumentException(campo + " é obrigatório");
		}
		return valor.trim();
	}

	@Override
	public final boolean equals(Object outro) {
		if (this == outro) {
			return true;
		}
		if (outro == null || getClass() != outro.getClass()) {
			return false;
		}
		EntidadeBase entidade = (EntidadeBase) outro;
		return id != null && id.equals(entidade.id);
	}

	@Override
	public final int hashCode() {
		return getClass().hashCode();
	}
}
