import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-board-dialog',
  templateUrl: './new-board-dialog.component.html',
  styleUrls: ['./new-board-dialog.component.css']
})
export class NewBoardDialogComponent implements OnInit {
	boardName: string = '';
	
	constructor(private dialogRef: MatDialogRef<NewBoardDialogComponent>) {}
	
	ngOnInit(): void {}
	
	onSubmit() {
		// Pass entered boardName to parent component (Workspace)
		this.dialogRef.close(this.boardName);
	}
	
	onCancel() {
		this.dialogRef.close();
	}

}
