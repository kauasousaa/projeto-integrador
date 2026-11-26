package br.senai.fatesg.museusoftware.historia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senai.fatesg.museusoftware.historia.model.Referencia;

public interface ReferenciaRepository extends JpaRepository<Referencia, Long> {
}
