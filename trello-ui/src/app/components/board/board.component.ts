import { Component, OnInit } from '@angular/core';

import { Board } from 'src/app/models/board.model';
import { BoardList } from 'src/app/models/board-list.model';
import { Card } from 'src/app/models/card.model';

import { DataService } from 'src/app/services/data.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
	boardId: number = 0;
	boardName: string = '';
	boardLists: BoardList[] = [];
	
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private dataService: DataService
	){}
	
	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.boardId = +params['id'];
			this.loadBoardLists();
			//console.log(this.boardId);
		});
		this.route.queryParams.subscribe((queryParams) => {
			this.boardName = queryParams['name'];
		});
	}
	
	loadBoardLists() {
		this.dataService.loadBoardLists(this.boardId).subscribe((data)=> {
			this.boardLists = data;
		});
	}
	
	createBoardList(boardListName: string) {
		this.dataService.createBoardList(this.boardId, boardListName).subscribe((createdList) => {
			// Update UI
			this.boardLists.push(createdList);
		});
	}
	
	createCard(boardListId: number, cardContent: string) {
		this.dataService.createCard(boardListId, cardContent).subscribe((createdCard) => {
			const boardList = this.boardLists.find((list) => list.id === boardListId);
			if (boardList) {
				if (!boardList.cards) {
					boardList.cards = [];
				}
				boardList.cards.push(createdCard);
			}
		});
	}

	navigateToHome() {
		this.router.navigate(['/']);
	}
	
	deleteBoardList(boardListId: number) {
		const confirmed = confirm('Are you sure?');
		if (confirmed) {
			console.log("confirmed");
			this.dataService.deleteBoardList(boardListId).subscribe(() => {
				this.boardLists = this.boardLists.filter((boardList) => boardList.id !== boardListId);
			});
		} 
	}
	
	deleteCard(cardId: number) {
		const confirmed = confirm('Are you sure?');
		if (confirmed) {
			console.log("confirmed");
			this.dataService.deleteCard(cardId).subscribe(() => {
				// Update UI
				this.boardLists.forEach((boardList) => { 
					boardList.cards = boardList.cards.filter((card) => card.id !== cardId);
				});
			});
		} 
	}

}
