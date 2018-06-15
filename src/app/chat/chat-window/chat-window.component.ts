import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatRoom } from '../../shared/models/chat-room.model';
import { ChatRoomService } from '../../shared/services/chat-room.service';
import { SocketService } from '../../shared/services/socket.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: [ './chat-window.component.scss' ]
})
export class ChatWindowComponent implements OnInit, OnDestroy
{
  private _subscription: Subscription;
  protected currentChannel: ChatRoom;

  constructor(private router: Router,
              private chatRoomService: ChatRoomService,
              private socketService: SocketService) {
  }

  ngOnInit() {
    this._subscription =
      this.chatRoomService
        .getRoom()
        .subscribe((room: ChatRoom) => {
          this.currentChannel = room;
          if (!this.currentChannel) {
            this.router.navigateByUrl('/')
          }
        });
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

}
