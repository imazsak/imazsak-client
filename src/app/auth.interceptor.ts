import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {flatMap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith(AuthService.refreshUrl)) {
      return next.handle(req);
    } else {
      return this.authService.getToken()
        .pipe(flatMap(token => {
          if (!!token) {
            return next.handle(req.clone({
              headers: req.headers.set('Authorization', 'Bearer ' + token)
            }));
          } else {
            return next.handle(req);
          }
        }));
    }
  }
}
