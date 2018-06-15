import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatRoom } from '../shared/models/chat-room.model';

@Injectable()
export class AdminService
{
  serviceBaseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getChannels(): Promise<ChatRoom[]> {
    return new Promise(((resolve, reject) => {
      this.http
        .get<ChatRoom[]>(`${this.serviceBaseUrl}/chat/rooms`)
        .toPromise()
        .then((res: ChatRoom[]) => resolve(res))
        .catch(err => reject(err));
    }));
  }
}
