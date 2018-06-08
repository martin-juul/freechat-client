import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../shared/services/socket.service';

import { Action } from '../../shared/models/action.model';
import { User } from '../../shared/models/user.model';
import { Event } from '../../shared/models/event.model';
import { Message } from '../../shared/models/message.model';
import { LoginService } from '../../shared/services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit
{
  action = Action;
  user: User;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;

  subscription: Subscription;

  constructor(private socketService: SocketService,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.initUser();
    this.initIoConnection();
    console.log(this.user);

    this.subscription = this.loginService.login('test2', 'martin123').subscribe(user => {
      console.log(user);
    });
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.user,
      content: message
    });

    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action
      };
    } else if (action === Action.RENAME) {
      message = {
        action: action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        }
      };
    }

    this.socketService.send(message);
  }

  private initUser(): void {
    const randomId = this.getRandomId();
    this.user = {
      id: `${randomId}`,
      name: "User #" + randomId,
      avatar: 'https://via.placeholder.com/100x100'
    };
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
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
