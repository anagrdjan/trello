package com.ana.trello.rest.controller;

import com.ana.trello.data.entity.Board;
import com.ana.trello.data.entity.BoardList;
import com.ana.trello.data.repository.BoardListRepository;
import com.ana.trello.data.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/boardList")
public class BoardListController {

    @Autowired
    private BoardListRepository repository;

    @Autowired
    private BoardRepository boardRepository;

    @GetMapping("/{boardId}")
    public List<BoardList> listByBoardId(@PathVariable Long boardId) {
        return repository.findByBoardId(boardId);
    }

    @PostMapping
    public ResponseEntity<BoardList> createBoardList(@RequestBody BoardList boardList) {
        if (!boardList.getName().isBlank()) {
            BoardList newBoardList = new BoardList();
            newBoardList.setBoard(boardRepository.findById(boardList.getBoardId()).get());
            newBoardList.setName(boardList.getName());
            newBoardList = repository.save(newBoardList);
            return new ResponseEntity<>(newBoardList, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteBoardList(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
