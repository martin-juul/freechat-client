import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

//import { environment } from '../../environments/environment';
import { AuthToken } from '../shared/models/user.model';
import { AuthService } from './auth.service';


@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor
{
  authToken: AuthToken;

  constructor(private authService: AuthService) {
    const token = this.authService.authToken;
    if (token !== undefined) {
      this.authToken = token;
    } else {
      this.authToken = null;
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authToken) {
      req = req.clone({
        withCredentials: true,
        setHeaders: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'X-FREECHAT-TOKEN': this.authToken.token
        }
      });
    } else {
      req = req.clone({
        withCredentials: true,
        setHeaders: {
          'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
      });
    }

    return next.handle(req);
  }
}
