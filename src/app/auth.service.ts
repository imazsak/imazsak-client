import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static readonly refreshUrl = '/auth/core/refresh-token';
  private tokenData: TokenData = undefined;

  constructor(private http: HttpClient) {
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
        this.refreshToken().pipe(map(tokenData => tokenData.token));
      }
    } else {
      return of(undefined);
    }
  }

  public setTokenData(token: string, refreshToken: string) {
    this.tokenData = {token, refreshToken};
    localStorage.tokenData = JSON.stringify(this.tokenData);
  }

  public removeTokenData() {
    this.tokenData = undefined;
    localStorage.removeItem('tokenData');
  }

  private refreshToken(): Observable<TokenData> {
    const data = {refreshToken: this.tokenData.refreshToken};
    return this.http.post<TokenData>(AuthService.refreshUrl, data)
      .pipe(
        map(tokenData => {
          this.tokenData = tokenData;
          return tokenData;
        }) // todo error handler
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
