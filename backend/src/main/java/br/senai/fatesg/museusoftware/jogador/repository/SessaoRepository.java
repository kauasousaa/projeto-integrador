package br.senai.fatesg.museusoftware.jogador.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senai.fatesg.museusoftware.jogador.model.Sessao;

public interface SessaoRepository extends JpaRepository<Sessao, Long> {

	Optional<Sessao> findByCodigo(String codigo);

	boolean existsByApelidoNormalizado(String apelidoNormalizado);
}
