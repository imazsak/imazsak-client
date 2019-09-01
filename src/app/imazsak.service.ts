import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, publishReplay, refCount} from 'rxjs/operators';

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

  public createFeedback(data: CreateFeedbackData): Observable<any> {
    return this.http.post('/api/feedback', data);
  }

  public listNotifications(): Observable<NotificationListData[]> {
    const fakeData = [
      {id: '', message: 'Message 1', createdAt: 1566772198150, meta: {isRead: false}},
      {id: '', message: 'Message 2', createdAt: 1566772198150, meta: {isRead: false}},
      {id: '', message: 'Message 3', createdAt: 1566772198150, meta: {isRead: true}},
      {id: '', message: 'Message 4', createdAt: 1566772198150, meta: {isRead: true}},
      {id: '', message: 'Message 5', createdAt: 1566772198150, meta: {isRead: true}},
      {id: '', message: 'Message 6', createdAt: 1566772198150, meta: {isRead: true}}
    ];
    // return this.http.get<NotificationListData[]>('/api/me/notifications');
    return of(fakeData);
  }

  public listGroupPrayers(groupId: string): Observable<GroupPrayerListData[]> {
    return this.http.get<GroupPrayerListData[]>(`/api/groups/${groupId}/prayers`);
  }

  public listGroupMembers(groupId: string): Observable<GroupMemberListData[]> {
    return this.http.get<GroupMemberListData[]>(`/api/groups/${groupId}/members`)
      .pipe(map(members => members.filter(member => !!member.name)));
  }

  public sendPray(groupId: string, prayerId: string): Observable<any> {
    return this.http.post(`/api/groups/${groupId}/prayers/${prayerId}/pray`, {});
  }

  public loadNext10Prayer(groupIds: string[]) {
    return this.http.post<GroupPrayerListData[]>(`/api/prayers/next-10`, {ids: groupIds});
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

export interface CreateFeedbackData {
  message: string;
}

export interface NotificationMeta {
  isRead: boolean;
  notificationType?: string;
}

export interface NotificationListData {
  id: string;
  message: string;
  createdAt: number;
  meta: NotificationMeta;
}

export interface GroupPrayerListData {
  id: string;
  userId: string;
  message: string;
  groupId?: string;
}

export interface GroupMemberListData {
  id: string;
  name?: string;
}
