import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatWindowComponent } from './chat-window/chat-window.component';

const chatRoutes: Routes = [
  { path: '', component: ChatWindowComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(chatRoutes) ],
  exports: [ RouterModule ]
})
export class ChatRoutingModule
{
}
