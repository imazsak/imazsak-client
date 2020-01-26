import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static readonly refreshUrl = '/auth/core/refresh-token';
  private initFinishResolveF;
  private initFinished = new Promise(resolve => this.initFinishResolveF = resolve);
  private tokenData: TokenData = undefined;

  constructor(private http: HttpClient) {
    this.loadTokenFromLocalStorage();
    this.initFinishResolveF(true);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.getToken().pipe(map(token => !!token));
  }

  public isAdmin(): Observable<boolean> {
    return this.getToken().pipe(map(token => {
      return !!token && this.getJwtData(token).isAdmin === true;
    }));
  }

  public getToken(): Observable<string> {
    return from(this.initFinished).pipe(
      mergeMap(() => this.getTokenInternal())
    );
  }

  private getTokenInternal(): Observable<string> {
    if (!!this.tokenData) {
      if (this.validateTokenExp(this.tokenData.token) || !navigator.onLine) {
        return of(this.tokenData.token);
      } else if (this.validateTokenExp(this.tokenData.refreshToken)) {
        return this.refreshToken()
          .pipe(
            map(tokenData => tokenData.token),
            catchError(() => {
              this.logout();
              return of(undefined);
            })
          );
      } else {
        this.tokenData = undefined;
        localStorage.removeItem('tokenData');
        return of(undefined);
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
    window.location.replace('/login');
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
