package br.senai.fatesg.museusoftware.interacao.model;

import java.time.Instant;

import br.senai.fatesg.museusoftware.desafio.model.Desafio;
import br.senai.fatesg.museusoftware.desafio.model.ResultadoAvaliacao;
import br.senai.fatesg.museusoftware.historia.model.Fase;
import br.senai.fatesg.museusoftware.historia.model.MarcoHistorico;
import br.senai.fatesg.museusoftware.historia.model.Periodo;
import br.senai.fatesg.museusoftware.historia.model.Portal;
import br.senai.fatesg.museusoftware.jogador.model.Sessao;
import br.senai.fatesg.museusoftware.shared.model.EixoTematico;
import br.senai.fatesg.museusoftware.shared.model.EntidadeBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Registro append-only para Analytics. Cada linha guarda sessão, data/hora,
 * tipo de evento e a tela ou a fase em que o evento aconteceu.
 */
@Entity
@Table(name = "interacao", indexes = @Index(name = "idx_interacao_sessao_data", columnList = "sessao_id, ocorrido_em"))
public class Interacao extends EntidadeBase {

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "sessao_id", nullable = false, updatable = false)
	private Sessao sessao;

	@Column(name = "ocorrido_em", nullable = false, updatable = false)
	private Instant ocorridoEm;

	@Enumerated(EnumType.STRING)
	@Column(name = "tipo_evento", nullable = false, length = 30, updatable = false)
	private TipoEvento tipoEvento;

	@Enumerated(EnumType.STRING)
	@Column(length = 30, updatable = false)
	private EixoTematico eixo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "periodo_id", updatable = false)
	private Periodo periodo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "fase_id", updatable = false)
	private Fase fase;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "fase_destino_id", updatable = false)
	private Fase faseDestino;

	@Column(length = 80, updatable = false)
	private String tela;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "conteudo_id", updatable = false)
	private MarcoHistorico conteudo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "desafio_id", updatable = false)
	private Desafio desafio;

	@Column(length = 500, updatable = false)
	private String resposta;

	@Column(updatable = false)
	private Boolean acertou;

	@Column(updatable = false)
	private Integer pontos;

	protected Interacao() {
	}

	private Interacao(Sessao sessao, TipoEvento tipoEvento, String tela, Fase fase) {
		if (sessao == null || tipoEvento == null) {
			throw new IllegalArgumentException("sessao e tipo de evento são obrigatórios");
		}
		boolean semTela = tela == null || tela.isBlank();
		if (semTela && fase == null) {
			throw new IllegalArgumentException("informe a tela ou a fase");
		}
		this.sessao = sessao;
		this.tipoEvento = tipoEvento;
		this.ocorridoEm = Instant.now();
		this.tela = semTela ? null : tela.trim();
		this.fase = fase;
		if (fase != null) {
			this.periodo = fase.getPeriodo();
		}
	}

	public static Interacao sessaoIniciada(Sessao sessao) {
		return new Interacao(sessao, TipoEvento.SESSAO_INICIADA, "inicio", null);
	}

	public static Interacao periodoAcessado(Sessao sessao, Periodo periodo, String tela) {
		if (periodo == null) {
			throw new IllegalArgumentException("periodo é obrigatório");
		}
		Interacao interacao = new Interacao(sessao, TipoEvento.PERIODO_ACESSADO, tela, null);
		interacao.periodo = periodo;
		interacao.eixo = EixoTematico.SOFTWARE;
		return interacao;
	}

	public static Interacao eixoAcessado(Sessao sessao, EixoTematico eixo, String tela) {
		if (eixo == null) {
			throw new IllegalArgumentException("eixo é obrigatório");
		}
		Interacao interacao = new Interacao(sessao, TipoEvento.EIXO_ACESSADO, tela, null);
		interacao.eixo = eixo;
		return interacao;
	}

	public static Interacao conteudoAberto(Sessao sessao, MarcoHistorico marco, String tela) {
		if (marco == null) {
			throw new IllegalArgumentException("conteudo é obrigatório");
		}
		Interacao interacao = new Interacao(sessao, TipoEvento.CONTEUDO_ABERTO, tela, marco.getFase());
		interacao.conteudo = marco;
		interacao.periodo = marco.getPeriodo();
		interacao.eixo = marco.getEixo();
		return interacao;
	}

	public static Interacao faseIniciada(Sessao sessao, Fase fase) {
		Interacao interacao = new Interacao(sessao, TipoEvento.FASE_INICIADA, null, fase);
		interacao.eixo = EixoTematico.SOFTWARE;
		return interacao;
	}

	public static Interacao faseConcluida(Sessao sessao, Fase fase, int pontos) {
		if (pontos < 0) {
			throw new IllegalArgumentException("pontos não pode ser negativo");
		}
		Interacao interacao = new Interacao(sessao, TipoEvento.FASE_CONCLUIDA, null, fase);
		interacao.pontos = pontos;
		interacao.eixo = EixoTematico.SOFTWARE;
		return interacao;
	}

	public static Interacao portalAtravessado(Sessao sessao, Portal portal) {
		if (portal == null) {
			throw new IllegalArgumentException("portal é obrigatório");
		}
		Interacao interacao = new Interacao(sessao, TipoEvento.PORTAL_ATRAVESSADO, null, portal.getFaseOrigem());
		interacao.faseDestino = portal.getFaseDestino();
		interacao.eixo = EixoTematico.SOFTWARE;
		return interacao;
	}

	public static Interacao desafioRespondido(Sessao sessao, Desafio desafio, String resposta, ResultadoAvaliacao resultado) {
		if (desafio == null || resultado == null) {
			throw new IllegalArgumentException("desafio e resultado são obrigatórios");
		}
		Interacao interacao = new Interacao(sessao, TipoEvento.DESAFIO_RESPONDIDO, null, desafio.getFase());
		interacao.desafio = desafio;
		interacao.resposta = resposta == null ? null : resposta.trim();
		interacao.acertou = resultado.acertou();
		interacao.pontos = resultado.pontos();
		interacao.eixo = EixoTematico.SOFTWARE;
		return interacao;
	}

	public Sessao getSessao() {
		return sessao;
	}

	public Instant getOcorridoEm() {
		return ocorridoEm;
	}

	public TipoEvento getTipoEvento() {
		return tipoEvento;
	}

	public EixoTematico getEixo() {
		return eixo;
	}

	public Periodo getPeriodo() {
		return periodo;
	}

	public Fase getFase() {
		return fase;
	}

	public Fase getFaseDestino() {
		return faseDestino;
	}

	public String getTela() {
		return tela;
	}

	public MarcoHistorico getConteudo() {
		return conteudo;
	}

	public Desafio getDesafio() {
		return desafio;
	}

	public String getResposta() {
		return resposta;
	}

	public Boolean getAcertou() {
		return acertou;
	}

	public Integer getPontos() {
		return pontos;
	}
}
