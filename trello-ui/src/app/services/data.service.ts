import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Board } from '../models/board.model';
import { BoardList } from '../models/board-list.model';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
	// BACKEND URL
	private baseUrl = 'http://localhost:8080/api';

	constructor(private http: HttpClient) { }
	
	// *** Board
	
	getBoards(): Observable<Board[]> {
		console.log('getBoards is being called');
		const url = this.baseUrl + "/board";
		return this.http.get<Board[]>(url);
	}
	
	createBoard(boardName: string): Observable<Board> {
		const newBoard = { name: boardName };
		return this.http.post<Board>(this.baseUrl + "/board", newBoard);
	}
	
	deleteBoard(boardId: number): Observable<void> {
		console.log("calling " + this.baseUrl + "/board/" + boardId);
		return this.http.delete<void>(this.baseUrl + "/board/" + boardId );
	}
	
	// *** BoardList
	
	loadBoardLists(boardId: number): Observable<BoardList[]> {
		const url = this.baseUrl + "/boardList/" + boardId;
		return this.http.get<BoardList[]>(url);
	}
	
	createBoardList(boardId: number, boardListName: string): Observable<BoardList> {
		const newBoardList = { name: boardListName, boardId: boardId };
		console.log(newBoardList);
		return this.http.post<BoardList>(this.baseUrl + "/boardList", newBoardList);
	}	

	deleteBoardList(boardListId: number): Observable<void> {
		return this.http.delete<void>(this.baseUrl + "/boardList/" + boardListId );
	}
	
	// *** Card
	
	createCard(boardListId: number, cardContent: string): Observable<Card> {
		const newCard = { content: cardContent };
		return this.http.post<Card>(this.baseUrl + "/card/" + boardListId, newCard);
	}
	
	deleteCard(cardId: number): Observable<void> {
		return this.http.delete<void>(this.baseUrl + "/card/" + cardId );
	}
}
 