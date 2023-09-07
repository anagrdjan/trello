package com.ana.trello.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 4096)
    private String content;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "boardList_id", nullable = false)
    private BoardList boardList;

    public Card() {
    }

    public Card(String content, BoardList boardList) {
        this.content = content;
        this.boardList = boardList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public BoardList getBoardList() {
        return boardList;
    }

    public void setBoardList(BoardList boardList) {
        this.boardList = boardList;
    }
}
