package br.senai.fatesg.museusoftware.desafio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senai.fatesg.museusoftware.desafio.model.Desafio;
import br.senai.fatesg.museusoftware.historia.model.Fase;

public interface DesafioRepository extends JpaRepository<Desafio, Long> {

	List<Desafio> findByFase(Fase fase);
}
