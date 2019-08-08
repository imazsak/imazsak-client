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

  public listGroups(): Observable<GroupListData[]> {
    const url = '/api/groups';
    return this.http.get<GroupListData[]>(url);
  }

  public createPrayer(data: CreatePrayerData): Observable<any> {
    return this.http.post('/api/prayers', data);
  }
}

export interface MeData {
  name?: string;
}

export interface GroupListData {
  id: string;
  name: string;
}

export interface CreatePrayerData {
  message: string;
  groupIds: string[];
}
