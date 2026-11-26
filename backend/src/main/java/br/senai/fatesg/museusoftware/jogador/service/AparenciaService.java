package br.senai.fatesg.museusoftware.jogador.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.senai.fatesg.museusoftware.interacao.model.Interacao;
import br.senai.fatesg.museusoftware.interacao.repository.InteracaoRepository;
import br.senai.fatesg.museusoftware.jogador.dto.AparenciaRequest;
import br.senai.fatesg.museusoftware.jogador.dto.AparenciaResponse;
import br.senai.fatesg.museusoftware.jogador.exception.SessaoNaoEncontradaException;
import br.senai.fatesg.museusoftware.jogador.mapper.AparenciaMapper;
import br.senai.fatesg.museusoftware.jogador.model.Aparencia;
import br.senai.fatesg.museusoftware.jogador.model.Sessao;
import br.senai.fatesg.museusoftware.jogador.repository.AparenciaRepository;
import br.senai.fatesg.museusoftware.jogador.repository.SessaoRepository;

@Service
public class AparenciaService {

	private final SessaoRepository sessoes;
	private final AparenciaRepository aparencias;
	private final InteracaoRepository interacoes;

	public AparenciaService(SessaoRepository sessoes, AparenciaRepository aparencias, InteracaoRepository interacoes) {
		this.sessoes = sessoes;
		this.aparencias = aparencias;
		this.interacoes = interacoes;
	}

	@Transactional(readOnly = true)
	public AparenciaResponse buscar(String codigo) {
		Sessao sessao = exigirSessao(codigo);
		return aparencias.findBySessao(sessao).map(AparenciaMapper::paraResposta).orElseGet(AparenciaMapper::padrao);
	}

	@Transactional
	public AparenciaResponse salvar(String codigo, AparenciaRequest requisicao) {
		Sessao sessao = exigirSessao(codigo);
		Aparencia aparencia = aparencias.findBySessao(sessao).orElseGet(() -> new Aparencia(sessao));
		aparencia.atualizar(requisicao.tomPele(), requisicao.cabelo(), requisicao.corCabelo(), requisicao.olhos(),
				requisicao.camisa(), requisicao.calca());
		aparencia = aparencias.save(aparencia);
		interacoes.save(Interacao.personagemSalvo(sessao));
		sessao.registrarAtividade();
		return AparenciaMapper.paraResposta(aparencia);
	}

	private Sessao exigirSessao(String codigo) {
		return sessoes.findByCodigo(codigo).orElseThrow(SessaoNaoEncontradaException::new);
	}
}
