import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceComponent } from "./components/workspace/workspace.component"
import { BoardComponent } from "./components/board/board.component"

const routes: Routes = [
	{
		path: "",
		component: WorkspaceComponent
	},
	{
		path: "board/:id",
		component: BoardComponent
	},
	{
		path: '**',
		redirectTo: '/'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
