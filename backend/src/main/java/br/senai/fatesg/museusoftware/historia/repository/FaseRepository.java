package br.senai.fatesg.museusoftware.historia.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senai.fatesg.museusoftware.historia.model.Fase;

public interface FaseRepository extends JpaRepository<Fase, Long> {

	List<Fase> findAllByOrderByNumeroAsc();
}
