package br.senai.fatesg.museusoftware.historia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senai.fatesg.museusoftware.historia.model.Portal;

public interface PortalRepository extends JpaRepository<Portal, Long> {
}
