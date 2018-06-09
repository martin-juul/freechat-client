import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate
{
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let url = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      console.error('[AuthGuard]: Not allowed', {
        reason: 'Not authenticated',
        path: url
      });
      this.router.navigateByUrl('/auth/signin').then(() => {
        return false;
      }).catch((err) => {
        console.error('[AuthGuard]: could not redirect to signin page', err);
      });
    }
  }
}
