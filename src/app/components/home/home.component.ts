import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../../shared/services/socket.service';

import { Action } from '../../shared/models/messaging/action.model';
import { User } from '../../shared/models/user.model';
import { Event } from '../../shared/models/messaging/event.model';
import { Message } from '../../shared/models/messaging/message.model';
import { LoginService } from '../../shared/services/login.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit, OnDestroy
{
  action = Action;
  user: User;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  connectedClients: User[] = [];

  subscription: Subscription;

  constructor(private socketService: SocketService,
              private loginService: LoginService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.initIoConnection();

    this.user = this.userService.getUser();
    this.connectedClients.push(this.user);
    this.sendNotification(Action.JOINED);

    console.log(this.user);
  }

  ngOnDestroy() {
    this.connectedClients = [];
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.user,
      content: message,
      time: new Date()
    });

    this.messageContent = null;
  }

  public sendNotification(action: Action, params?: any): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action,
        time: new Date()
      };
    } else if (action === Action.RENAME) {
      message = {
        action: action,
        content: {
          username: this.user.username,
          previousUsername: params.previousUsername,
          time: new Date()
        }
      };
    }

    this.socketService.send(message);
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
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

}
