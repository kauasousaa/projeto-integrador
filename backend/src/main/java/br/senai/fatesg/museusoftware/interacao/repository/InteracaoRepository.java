package br.senai.fatesg.museusoftware.interacao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senai.fatesg.museusoftware.interacao.model.Interacao;
import br.senai.fatesg.museusoftware.jogador.model.Sessao;

public interface InteracaoRepository extends JpaRepository<Interacao, Long> {

	List<Interacao> findBySessaoOrderByOcorridoEmAsc(Sessao sessao);
}
