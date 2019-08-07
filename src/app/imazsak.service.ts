import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImazsakService {

  constructor(private http: HttpClient) {
  }

  public getMe(): Observable<MeData> {
    return this.http.get<MeData>('/api/me');
  }

  public saveMe(data: MeData): Observable<any> {
    return this.http.post('/api/me', data);
  }
}

export interface MeData {
  name?: string;
}
