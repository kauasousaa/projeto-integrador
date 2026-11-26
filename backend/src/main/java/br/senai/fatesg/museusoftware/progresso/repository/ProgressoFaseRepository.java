package br.senai.fatesg.museusoftware.progresso.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senai.fatesg.museusoftware.historia.model.Fase;
import br.senai.fatesg.museusoftware.jogador.model.Sessao;
import br.senai.fatesg.museusoftware.progresso.model.ProgressoFase;

public interface ProgressoFaseRepository extends JpaRepository<ProgressoFase, Long> {

	Optional<ProgressoFase> findBySessaoAndFase(Sessao sessao, Fase fase);
}
