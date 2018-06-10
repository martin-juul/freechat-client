import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client';
import { Message } from '../models/messaging/message.model';
import { Observable } from 'rxjs';
import { Event } from '../models/messaging/event.model';

//import { environment } from '../../environments/environment';

@Injectable()
export class SocketService {
  private socket;

  public initSocket(): void {
    this.socket = socketIo('http://localhost:8080');
  }

  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
