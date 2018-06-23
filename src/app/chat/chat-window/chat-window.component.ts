import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatRoom } from '../../shared/models/chat-room.model';
import { ChatRoomService } from '../../shared/services/chat-room.service';
import { ConnectedClient, SocketService } from '../../shared/services/socket.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: [ './chat-window.component.scss' ]
})
export class ChatWindowComponent implements OnInit, OnDestroy
{
  protected currentChannel: ChatRoom;
  private _subscription: Subscription;

  constructor(private router: Router,
              private chatRoomService: ChatRoomService,
              private socketService: SocketService) {
  }

  ngOnInit() {
    this._subscription =
      this.chatRoomService
        .getRoom()
        .subscribe(async(room: ChatRoom) => {
          this.currentChannel = await room;
          if (!await room) {
            this.router.navigateByUrl('/');
          }
        });

    console.log('chat-window initializing');

    if (this.currentChannel) {
      this.listenConnectedClients();
    }

  }

  listenConnectedClients() {
    this._subscription.add(
      this.socketService.getClients()
        .subscribe((clients: ConnectedClient[]) => {
          console.log(clients);
        })
    );
  }

  ngOnDestroy() {
    this.socketService.disconnect();
    this._subscription.unsubscribe();
  }

}
