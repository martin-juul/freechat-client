import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatRoom } from '../../shared/models/chat-room.model';

import { Action } from '../../shared/models/messaging/action.model';
import { Event } from '../../shared/models/messaging/event.model';
import { Message } from '../../shared/models/messaging/message.model';
import { User } from '../../shared/models/user.model';
import { LoginService } from '../../shared/services/login.service';
import { SocketService } from '../../shared/services/socket.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit, OnDestroy
{
  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
