import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {publishReplay, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImazsakService {

  private getMeCache: Observable<MeData>;
  private listGroupsCache: Observable<GroupListData[]>;
  private listMyPrayersCache: Observable<MyPrayerListData[]>;

  constructor(private http: HttpClient) {
  }

  public getMe(): Observable<MeData> {
    if (!this.getMeCache) {
      this.getMeCache = this.http.get<MeData>('/api/me').pipe(
        publishReplay(1),
        refCount()
      );
    }
    return this.getMeCache;
  }

  public saveMe(data: MeData): Observable<any> {
    this.getMeCache = null;
    return this.http.post('/api/me', data);
  }

  public listGroups(): Observable<GroupListData[]> {
    if (!this.listGroupsCache) {
      this.listGroupsCache = this.http.get<GroupListData[]>('/api/groups').pipe(
        publishReplay(1),
        refCount()
      );
    }
    return this.listGroupsCache;
  }

  public createPrayer(data: CreatePrayerData): Observable<any> {
    this.listGroupsCache = null;
    return this.http.post('/api/prayers', data);
  }

  public listMyPrayers(): Observable<MyPrayerListData[]> {
    if (!this.listMyPrayersCache) {
      this.listMyPrayersCache = this.http.get<MyPrayerListData[]>('/api/prayers').pipe(
        publishReplay(1),
        refCount()
      );
    }
    return this.listMyPrayersCache;
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

export interface MyPrayerListData {
  id: string;
  message: string;
  groupIds: string[];
}
