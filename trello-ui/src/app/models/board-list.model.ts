import { Card } from './card.model';

export class BoardList {
	id: number;
	name: string;
	boardId: number; 
	cards: Card[] = [];
	
	constructor(id: number, name: string, boardId: number, cards: Card[]) {
		this.id = id;
		this.name = name;
		this.boardId = boardId;
		this.cards = cards;
	}
}
