import { Injectable } from '@angular/core';
import { AuthToken, User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { LocalStorage } from '../utils/local-storage';

@Injectable()
export class AuthService
{
  authToken: AuthToken;
  private _key = 'auth-token';
  private _authenticated = false;

  constructor(private userService: UserService) {
  }

  authenticate(user: User) {
    this._authenticated = true;
    this.userService.setUser(user);
    this.setToken(user.token);
    LocalStorage.set('uid', user.id);
    LocalStorage.set('username', user.username);
    LocalStorage.set('avatar', user.avatar);
  }

  isAuthenticated() {
    if (this.checkTokenExists()) {
      this._authenticated = true;
    }

    return this._authenticated;
  }

  protected checkTokenExists() {
    return !!this.getToken();
  }

  setToken(token: AuthToken): void {
    LocalStorage.set(this._key, token);
    this.authToken = this.getToken();
  }

  getToken(): AuthToken {
    return LocalStorage.get(this._key);
  }

  getUsername(): string {
    return LocalStorage.get('username');
  }

  getUid() {
    return LocalStorage.get('uid');
  }
}
