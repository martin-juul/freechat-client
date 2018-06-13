import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatRoom } from '../../models/chat-room.model';
import { Action } from '../../models/messaging/action.model';
import { Event } from '../../models/messaging/event.model';
import { Message } from '../../models/messaging/message.model';
import { User } from '../../models/user.model';
import { ChatRoomService } from '../../services/chat-room.service';
import { SocketService } from '../../services/socket.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: [ './chat.component.scss' ]
})
export class ChatComponent implements OnInit, OnDestroy
{
  //@Input('channelId') channelId: string;
  channel: ChatRoom;
  ioConnection: any;
  protected _action = Action;
  protected _messages: Message[] = [];
  protected _connectedClients: User[] = [];
  protected _messageContent: string;
  private _subscription: Subscription;

  constructor(private socketService: SocketService,
              private userService: UserService,
              private chatRoomService: ChatRoomService) {
  }

  ngOnInit() {
    this._subscription = this.chatRoomService.getRoom()
      .subscribe(async (room: ChatRoom) => {
        this.channel = await room;
        this.connectChat(room);
      });

  }

  connectChat(room: ChatRoom) {
      this._messages = [];
      this.onInitIoConnection(room.id);
      this._connectedClients.push(this.userService.getUser());
      this.onSendNotification(Action.JOINED);
  }

  ngOnDestroy() {
    this._connectedClients = null;
    this._subscription.unsubscribe();
  }

  protected onSendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.sendMessage(message);
    this._messageContent = null;
  }

  protected onSendNotification(action: Action, params?: any): void {

    if (action === Action.JOINED) {
      this.sendNotification(action);
    } else if (action === Action.RENAME) {

    }
  }

  private onInitIoConnection(channelId: string): void {
    this.socketService.initSocket(channelId);

    /*this._subscription.add(this.socketService.onMessage()
      .subscribe((message: Message) => {
        this._messages.push(message);
      }));*/

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this._messages.push(message);
      });

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });

  }

  private sendNotification(action: Action) {
    this._subscription.add(this.socketService.send({
      from: this.userService.user,
      action: action,
      //time: new Date()
    }));
  }

  private sendMessage(message: string) {
    this._subscription.add(this.socketService.send({
      from: this.userService.user,
      content: message,
      time: new Date()
    }));
  }

}
