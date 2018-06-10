import { Injectable } from '@angular/core';
import { LocalStorage } from '../../utils/local-storage';
import { User } from '../models/user.model';
import { LoginService } from './login.service';

@Injectable()
export class UserService
{
  user: User;

  constructor(private loginService: LoginService) {
    if (!this.user) {
      this.user = {
        username: LocalStorage.get('username'),
        avatar: LocalStorage.get('avatar'),
        id: LocalStorage.get('uid'),
        token: LocalStorage.get('token')
      };
    }
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  logOutUser() {
    // this.loginService.logOut(this.user.id, this.user.token.token);
    LocalStorage.clear();
  }
}
