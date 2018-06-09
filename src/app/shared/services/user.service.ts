import { Injectable } from '@angular/core';
import { LocalStorage } from '../../utils/local-storage';
import { User } from '../models/user.model';

@Injectable()
export class UserService
{
   user: User;

  constructor() {
    if (!this.user) {
      this.user = {
        username: LocalStorage.get('username'),
        avatar: LocalStorage.get('avatar'),
        id: LocalStorage.get('uid'),
        token: JSON.parse(LocalStorage.get('token'))
      };
    }
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}
