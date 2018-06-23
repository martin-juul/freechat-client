import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SocketService } from '../shared/services/socket.service';

//import { environment } from '../../environments/environment';

@Injectable()
export class AppLoadService
{


  constructor(private http: HttpClient,
              private authService: AuthService,
              private socketService: SocketService) {
  }

  getUser(): Promise<any> {
    if (this.authService.isAuthenticated() === true) {
      this.socketService.connectSocketServer();

      const token = this.authService.getToken();
      const uid = this.authService.getUid();
      return this.http.get(`http://localhost:3000/user/verify-token?id=${uid}&token=${token.token}`)
        .toPromise()
        .then((res) => {
          console.log('[AppLoadService]: verified token', res)
        }).catch((err) => {
          console.error('[AppLoadService]: Could not verify token', err);
        });
    }
  }
}
