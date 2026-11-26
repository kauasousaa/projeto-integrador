package br.senai.fatesg.museusoftware.historia.model;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import br.senai.fatesg.museusoftware.shared.model.EixoTematico;
import br.senai.fatesg.museusoftware.shared.model.EntidadeBase;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "marco_historico")
public class MarcoHistorico extends EntidadeBase {

	@Column(nullable = false, length = 150)
	private String titulo;

	@Column(nullable = false, length = 2000)
	private String descricao;

	@Column(nullable = false)
	private boolean brasileiro;

	@Column(nullable = false)
	private int ordem;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 30)
	private EixoTematico eixo;

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "periodo_id", nullable = false)
	private Periodo periodo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "fase_id")
	private Fase fase;

	@OneToMany(mappedBy = "marco", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Referencia> referencias = new ArrayList<>();

	@ManyToMany
	@JoinTable(
			name = "marco_personagem",
			joinColumns = @JoinColumn(name = "marco_id"),
			inverseJoinColumns = @JoinColumn(name = "personagem_id"))
	private Set<Personagem> personagens = new LinkedHashSet<>();

	protected MarcoHistorico() {
	}

	public MarcoHistorico(String titulo, String descricao, boolean brasileiro, int ordem, EixoTematico eixo,
			Periodo periodo, Fase fase) {
		if (ordem < 1) {
			throw new IllegalArgumentException("ordem deve ser positiva");
		}
		if (eixo == null || periodo == null) {
			throw new IllegalArgumentException("eixo e periodo são obrigatórios");
		}
		this.titulo = exigirTexto(titulo, "titulo");
		this.descricao = exigirTexto(descricao, "descricao");
		this.brasileiro = brasileiro;
		this.ordem = ordem;
		this.eixo = eixo;
		this.periodo = periodo;
		this.fase = fase;
	}

	public void adicionarReferencia(String citacao, String url) {
		referencias.add(new Referencia(this, citacao, url));
	}

	public void vincularPersonagem(Personagem personagem) {
		if (personagem == null) {
			throw new IllegalArgumentException("personagem é obrigatório");
		}
		personagens.add(personagem);
	}

	public String getTitulo() {
		return titulo;
	}

	public String getDescricao() {
		return descricao;
	}

	public boolean isBrasileiro() {
		return brasileiro;
	}

	public int getOrdem() {
		return ordem;
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

	public List<Referencia> getReferencias() {
		return List.copyOf(referencias);
	}

	public Set<Personagem> getPersonagens() {
		return Set.copyOf(personagens);
	}
}
