package br.senai.fatesg.museusoftware.jogador.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senai.fatesg.museusoftware.jogador.model.Aparencia;
import br.senai.fatesg.museusoftware.jogador.model.Sessao;

public interface AparenciaRepository extends JpaRepository<Aparencia, Long> {

	Optional<Aparencia> findBySessao(Sessao sessao);
}
