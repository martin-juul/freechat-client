import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

const LOGIN_SERVER = 'http://localhost:3000/';

@Injectable()
export class LoginService
{
  constructor(private http: HttpClient) {
  }

  public signUp(username: string, email: string, password: string) {
    return this.http.post<User>(LOGIN_SERVER + 'auth/signup', {
      username: username,
      password: password,
      email: email
    }, { observe: 'response' });
  }

  public login(username: string, password: string) {
    return this.http.post<User>(LOGIN_SERVER + 'auth/signin', {
      username: username,
      password: password
    }, { observe: 'response' });
  }

  public verifyToken(userId: string, token: string) {
    return this.http.post<User>(LOGIN_SERVER + 'auth/verify-token', {
      token: token
    }, { observe: 'response' });
  }

  public logOut(userId: string, token: string) {
    return this.http.post(LOGIN_SERVER + 'auth/logout', {
      userId: userId,
      token: token
    }, { observe: 'response' });
  }
}
