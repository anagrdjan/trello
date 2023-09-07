package com.ana.trello.data.repository;

import com.ana.trello.data.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {
}
