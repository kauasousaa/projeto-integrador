package br.senai.fatesg.museusoftware.desafio.model;

import br.senai.fatesg.museusoftware.historia.model.Fase;
import br.senai.fatesg.museusoftware.historia.model.Portal;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@DiscriminatorValue("PORTAL")
@Table(name = "desafio_portal")
public class DesafioPortal extends Desafio {

	@Column(name = "resposta_esperada", nullable = false, length = 200)
	private String respostaEsperada;

	@Column(nullable = false, length = 1000)
	private String explicacao;

	@OneToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "portal_id", nullable = false, unique = true)
	private Portal portal;

	protected DesafioPortal() {
	}

	public DesafioPortal(String titulo, String enunciado, int pontuacao, Fase fase, Portal portal,
			String respostaEsperada, String explicacao) {
		super(titulo, enunciado, pontuacao, fase);
		if (portal == null) {
			throw new IllegalArgumentException("portal é obrigatório");
		}
		if (portal.getFaseOrigem().getNumero() != fase.getNumero()) {
			throw new IllegalArgumentException("o desafio precisa ser da fase de origem do portal");
		}
		this.portal = portal;
		this.respostaEsperada = exigirTexto(respostaEsperada, "respostaEsperada");
		this.explicacao = exigirTexto(explicacao, "explicacao");
	}

	@Override
	public ResultadoAvaliacao avaliar(String resposta) {
		boolean acertou = normalizar(resposta).equals(normalizar(respostaEsperada));
		return new ResultadoAvaliacao(acertou, pontuar(acertou), explicacao);
	}

	public Portal getPortal() {
		return portal;
	}
}
