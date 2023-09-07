import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/models/board.model';
import { DataService } from 'src/app/services/data.service';
import { NewBoardDialogComponent } from '../new-board-dialog/new-board-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


 
@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})

export class WorkspaceComponent implements OnInit {
	boards: Board[] = [];
	
	constructor(
		private dataService: DataService, 
		private router: Router,	
		private dialog: MatDialog 
	) { }

	ngOnInit(): void {
		this.loadBoards();
	}

	loadBoards() {
		this.dataService.getBoards().subscribe((data) => {
			this.boards = data;
		});
	}
	
	navigateToBoard(board: Board) {
		console.log(board.name);
		this.router.navigate(['/board', board.id], { queryParams: { name: board.name }});
	}
	
	openNewBoardDialog() {
		const dialogRef = this.dialog.open(NewBoardDialogComponent, { width: '300px'});
		
		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.dataService.createBoard(result).subscribe((newBoard) => {
					this.boards.push(newBoard);
					// Navigate to newly created board
					this.navigateToBoard(newBoard);
				});
			}
		});
	}
	
	deleteBoard(boardId: number) {
		const confirmed = confirm('Are you sure?');
		if (confirmed) {
			console.log("confirmed");
			this.dataService.deleteBoard(boardId).subscribe(() => {
				// Update UI
				this.boards = this.boards.filter((board) => board.id !== boardId);
			});
		} 
	}

}
