package br.senai.fatesg.museusoftware.jogador.model;

import br.senai.fatesg.museusoftware.shared.model.EntidadeBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "aparencia")
public class Aparencia extends EntidadeBase {

	@OneToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "sessao_id", nullable = false, unique = true)
	private Sessao sessao;

	@Enumerated(EnumType.STRING)
	@Column(name = "tom_pele", nullable = false, length = 20)
	private TomPele tomPele;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 20)
	private EstiloCabelo cabelo;

	@Enumerated(EnumType.STRING)
	@Column(name = "cor_cabelo", nullable = false, length = 20)
	private CorCabelo corCabelo;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 20)
	private CorOlhos olhos;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 20)
	private CorCamisa camisa;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 20)
	private CorCalca calca;

	protected Aparencia() {
	}

	public Aparencia(Sessao sessao) {
		if (sessao == null) {
			throw new IllegalArgumentException("sessao é obrigatória");
		}
		this.sessao = sessao;
		this.tomPele = TomPele.PESSEGO;
		this.cabelo = EstiloCabelo.CURTO;
		this.corCabelo = CorCabelo.CASTANHO;
		this.olhos = CorOlhos.CASTANHO;
		this.camisa = CorCamisa.VERMELHO;
		this.calca = CorCalca.AZUL;
	}

	public void atualizar(TomPele tomPele, EstiloCabelo cabelo, CorCabelo corCabelo, CorOlhos olhos, CorCamisa camisa,
			CorCalca calca) {
		if (tomPele == null || cabelo == null || corCabelo == null || olhos == null || camisa == null || calca == null) {
			throw new IllegalArgumentException("todas as escolhas do personagem são obrigatórias");
		}
		this.tomPele = tomPele;
		this.cabelo = cabelo;
		this.corCabelo = corCabelo;
		this.olhos = olhos;
		this.camisa = camisa;
		this.calca = calca;
	}

	public Sessao getSessao() {
		return sessao;
	}

	public TomPele getTomPele() {
		return tomPele;
	}

	public EstiloCabelo getCabelo() {
		return cabelo;
	}

	public CorCabelo getCorCabelo() {
		return corCabelo;
	}

	public CorOlhos getOlhos() {
		return olhos;
	}

	public CorCamisa getCamisa() {
		return camisa;
	}

	public CorCalca getCalca() {
		return calca;
	}
}
