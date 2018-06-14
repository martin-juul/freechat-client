import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { connect } from 'socket.io-client';
import { ChatRoom } from '../models/chat-room.model';
import { Event } from '../models/messaging/event.model';
import { Message } from '../models/messaging/message.model';

//import { environment } from '../../environments/environment';

@Injectable()
export class SocketService
{
  //public connectedRooms: ChatRoom[] = [];
  private socket: SocketIOClient.Socket;
  private socketServer = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public initSocket(roomId: string): void {

    /*if (this.socket) {
      this.socket.close();
      this.socket.removeAllListeners();
    }*/
    this.socket = connect(this.socketServer + '/' + roomId, {
      reconnectionDelay: 500,
      reconnectionDelayMax: 700
    });

  }

  // public onHistory(): Observable<Message[]> {
  //   return new Observable<Message[]>(observer => {
  //     this.socket.on('get-history', (data: Message[]) => observer.next(data));
  //   });
  // }
  //
  // public getHistory(): void {
  //   this.socket.emit('get-history');
  // }

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

  public getRooms(): Promise<ChatRoom[]> {
    return new Promise(((resolve, reject) => {
      this.http
        .get<ChatRoom[]>(this.socketServer + '/chat/rooms')
        .toPromise()
        .then((res: ChatRoom[]) => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    }));
  }

  public disconnect(roomId?: string) {
    if (roomId) {
      //this.socket.close(roomId);
    } else {
      this.socket.close();
    }
  }
}
