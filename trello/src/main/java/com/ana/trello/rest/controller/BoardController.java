package com.ana.trello.rest.controller;

import com.ana.trello.data.entity.Board;
import com.ana.trello.data.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardRepository repository;

    @GetMapping
    public List<Board> listAll() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<Board> createBoard(@RequestBody Board board) {
        Board newBoard = repository.save(board);
        return new ResponseEntity<>(newBoard, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void deleteBoard(@PathVariable Long id) {
        repository.deleteById(id);
    }

}
