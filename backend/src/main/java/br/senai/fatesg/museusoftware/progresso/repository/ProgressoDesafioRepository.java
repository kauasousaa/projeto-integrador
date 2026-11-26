package br.senai.fatesg.museusoftware.progresso.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senai.fatesg.museusoftware.desafio.model.Desafio;
import br.senai.fatesg.museusoftware.jogador.model.Sessao;
import br.senai.fatesg.museusoftware.progresso.model.ProgressoDesafio;

public interface ProgressoDesafioRepository extends JpaRepository<ProgressoDesafio, Long> {

	Optional<ProgressoDesafio> findBySessaoAndDesafio(Sessao sessao, Desafio desafio);
}
