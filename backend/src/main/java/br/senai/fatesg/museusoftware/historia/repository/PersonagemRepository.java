package br.senai.fatesg.museusoftware.historia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senai.fatesg.museusoftware.historia.model.Personagem;

public interface PersonagemRepository extends JpaRepository<Personagem, Long> {
}
