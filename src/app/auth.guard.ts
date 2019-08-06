import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLogin();
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLogin();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.checkLogin();
  }

  private checkLogin(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(map(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }
      return isLoggedIn;
    }));
  }
}
