import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedComponentModule } from '../shared/components/shared-component.module';
import { ChatRoutingModule } from './chat-routing.module';

import { ChatWindowComponent } from './chat-window/chat-window.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ChatRoutingModule,
    SharedComponentModule,
  ],
  declarations: [
    ChatWindowComponent,
  ],
  providers: [
  ]
})
export class ChatModule
{
}
