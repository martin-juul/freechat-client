import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatRoom } from '../../shared/models/chat-room.model';
import { ChatRoomService } from '../../shared/services/chat-room.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: [ './chat-window.component.scss' ]
})
export class ChatWindowComponent implements OnInit
{
  private _subscription: Subscription;
  protected currentChannel: ChatRoom;

  constructor(private router: Router,
              private chatRoomService: ChatRoomService) {
  }

  ngOnInit() {
    this._subscription =
      this.chatRoomService
        .getRoom()
        .subscribe((room: ChatRoom) => {
          this.currentChannel = room;
          console.log(room);
          if (!room.id) {
            this.router.navigateByUrl('/')
          }
        });
  }

}
