import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { connect } from 'socket.io-client';
import { ChatRoom } from '../models/chat-room.model';
import { Event } from '../models/messaging/event.model';
import { Message } from '../models/messaging/message.model';
import { User } from '../models/user.model';
import { UserService } from './user.service';

//import { environment } from '../../environments/environment';

@Injectable()
export class SocketService
{
  //public connectedRooms: ChatRoom[] = [];
  private socket: SocketIOClient.Socket;
  private socketServer = 'http://localhost:8080';
  private _user: User;

  private _connectedClients = new Subject<ConnectedClient[]>();

  constructor(private http: HttpClient,
              private userService: UserService) {
    this._user = this.userService.getUser();
  }

  public connectSocketServer(): void {
    this.socket = connect(this.socketServer + '/', {
      reconnectionDelay: 500,
      reconnectionDelayMax: 700
    });
  }

  public initSocket(roomId: string): void {

    if (this.socket) {
      this.disconnect();
    }
    this.socket = connect(this.socketServer + '/' + roomId, {
      reconnectionDelay: 500,
      reconnectionDelayMax: 700
    });

    this.socket.emit('client-connected', {
      uid: this._user.id,
      username: this._user.username,
      avatar: this._user.avatar
    });

    if (this.socket.connected) {
      this.onConnectedClients();
    }
  }

  public getClients() {
    return this._connectedClients.asObservable();
  }

  public onConnectedClients() {
    this.socket.on('connected-clients', (clients: ConnectedClient[]) => this._connectedClients.next(clients));
    console.log(this._connectedClients);
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

  public disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket.removeAllListeners();
    }
  }
}

export interface ConnectedClient
{
  uid: string,
  username: string,
  avatar: string
}
