import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  isGroupChat = true;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private chatRoomService: ChatRoomService,
              private socketService: SocketService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['type'] === 'friend') {
        this.socketService.disconnect();
        this.isGroupChat = false;
      } else {
        this.isGroupChat = true;
        this.initGroupChat();
      }
    });

  }

  initGroupChat() {
    this._subscription =
      this.chatRoomService
        .getRoom()
        .subscribe(async(room: ChatRoom) => {
          this.currentChannel = await room;
          if (!await room) {
            this.router.navigateByUrl('/');
          }
        });

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
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

}
