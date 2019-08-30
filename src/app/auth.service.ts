import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static readonly refreshUrl = '/auth/core/refresh-token';
  private tokenData: TokenData = undefined;

  constructor(private http: HttpClient, private router: Router) {
    this.loadTokenFromLocalStorage();
  }

  public isLoggedIn(): Observable<boolean> {
    return this.getToken().pipe(map(token => !!token));
  }

  public getToken(): Observable<string> {
    if (!!this.tokenData) {
      if (this.validateTokenExp(this.tokenData.token)) {
        return of(this.tokenData.token);
      } else {
        return this.refreshToken()
          .pipe(
            map(tokenData => tokenData.token),
            catchError(_ => {
              this.logout();
              return of(undefined);
            })
          );
      }
    } else {
      return of(undefined);
    }
  }

  public setTokenData(token: string, refreshToken: string) {
    this.tokenData = {token, refreshToken};
    localStorage.tokenData = JSON.stringify(this.tokenData);
  }

  public logout() {
    this.tokenData = undefined;
    localStorage.removeItem('tokenData');
    this.router.navigate(['/login']);
  }

  private refreshToken(): Observable<TokenData> {
    const data = {refreshToken: this.tokenData.refreshToken};
    return this.http.post<TokenData>(AuthService.refreshUrl, data)
      .pipe(
        map(tokenData => {
          this.setTokenData(tokenData.token, tokenData.refreshToken);
          return tokenData;
        })
      );
  }

  private loadTokenFromLocalStorage() {
    const storedToken = localStorage.getItem('tokenData');
    if (!!storedToken) {
      this.tokenData = JSON.parse(storedToken);
    }
  }

  private validateTokenExp(token) {
    return (+this.getJwtData(token).exp * 1000) > (new Date()).getTime();
  }

  private getJwtData(token) {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }
}

interface TokenData {
  token: string;
  refreshToken: string;
}
