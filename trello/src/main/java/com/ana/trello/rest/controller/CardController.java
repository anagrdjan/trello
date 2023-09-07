package com.ana.trello.rest.controller;

import com.ana.trello.data.entity.Card;
import com.ana.trello.data.repository.BoardListRepository;
import com.ana.trello.data.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/card")
public class CardController {

    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private BoardListRepository boardListRepository;

    @PostMapping("/{boardListId}")
    public ResponseEntity<Card> createBoardList(@PathVariable Long boardListId, @RequestBody Card card) {
        if (!card.getContent().isBlank()) {
            card.setBoardList(boardListRepository.findById(boardListId).get());
            return new ResponseEntity<>(cardRepository.save(card), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteCard(@PathVariable Long id) {
        cardRepository.deleteById(id);
    }
}
