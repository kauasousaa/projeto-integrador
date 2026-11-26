package br.senai.fatesg.museusoftware.historia.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senai.fatesg.museusoftware.historia.model.CodigoPeriodo;
import br.senai.fatesg.museusoftware.historia.model.Periodo;

public interface PeriodoRepository extends JpaRepository<Periodo, Long> {

	Optional<Periodo> findByCodigo(CodigoPeriodo codigo);

	List<Periodo> findAllByOrderByOrdemAsc();
}
