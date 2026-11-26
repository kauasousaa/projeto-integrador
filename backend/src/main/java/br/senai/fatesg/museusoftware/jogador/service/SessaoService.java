package br.senai.fatesg.museusoftware.jogador.service;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.senai.fatesg.museusoftware.interacao.model.Interacao;
import br.senai.fatesg.museusoftware.interacao.repository.InteracaoRepository;
import br.senai.fatesg.museusoftware.jogador.exception.NomeEmUsoException;
import br.senai.fatesg.museusoftware.jogador.model.Sessao;
import br.senai.fatesg.museusoftware.jogador.repository.SessaoRepository;

@Service
public class SessaoService {

	private final SessaoRepository sessoes;
	private final InteracaoRepository interacoes;

	public SessaoService(SessaoRepository sessoes, InteracaoRepository interacoes) {
		this.sessoes = sessoes;
		this.interacoes = interacoes;
	}

	@Transactional
	public Sessao criar(String apelido) {
		String chave = Sessao.normalizarChave(apelido);
		if (sessoes.existsByApelidoNormalizado(chave)) {
			throw new NomeEmUsoException();
		}
		Sessao sessao = new Sessao(apelido);
		try {
			sessao = sessoes.saveAndFlush(sessao);
		} catch (DataIntegrityViolationException excecao) {
			throw new NomeEmUsoException();
		}
		interacoes.save(Interacao.sessaoIniciada(sessao));
		return sessao;
	}
}
