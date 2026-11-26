package br.senai.fatesg.museusoftware.historia.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senai.fatesg.museusoftware.historia.model.MarcoHistorico;
import br.senai.fatesg.museusoftware.historia.model.Periodo;

public interface MarcoHistoricoRepository extends JpaRepository<MarcoHistorico, Long> {

	List<MarcoHistorico> findByPeriodoOrderByOrdemAsc(Periodo periodo);
}
