import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChatRoom } from '../models/chat-room.model';

@Injectable()
export class ChatRoomService
{
  private subject = new Subject<ChatRoom>();

  setRoom(room: ChatRoom) {
    this.subject.next(room);
  }

  getRoom(): Observable<ChatRoom> {
    return this.subject.asObservable();
  }

  clearRoom() {
    this.subject.next();
  }
}
