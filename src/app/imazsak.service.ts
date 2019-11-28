import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
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
    this.listMyPrayersCache = null;
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
    return this.http.get<NotificationListData[]>('/api/me/notifications');
  }

  public deleteNotification(id: string): Observable<any> {
    return this.http.post<any>('/api/me/notifications/delete', {ids: [id]});
  }

  public readNotification(id: string): Observable<any> {
    return this.http.post<any>('/api/me/notifications/read', {ids: [id]});
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

  public closePrayer(data: ClosePrayerRequest): Observable<any> {
    this.listMyPrayersCache = null;
    return this.http.post('/api/prayers/close', data);
  }

  public getJoinToGroupToken(groupId: string): Observable<TokenData> {
    return this.http.post<TokenData>(`/api/groups/${groupId}/create-join-token`, {});
  }

  public joinToGroup(token: string): Observable<any> {
    this.listGroupsCache = null;
    const data = {token} as TokenData;
    return this.http.post<any>(`/api/groups/join`, data);
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
  prayCount: number;
  createdAt: number;
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
  message: object;
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

export interface ClosePrayerRequest {
  id: string;
  message?: string;
}

export interface TokenData {
  token: string;
}
