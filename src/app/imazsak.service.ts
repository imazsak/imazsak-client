import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, timer} from 'rxjs';
import {map, publishReplay, refCount, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImazsakService {

  readonly baseDomain = 'https://stage.imazsak.hu';

  private getMeCache: Observable<MeData>;
  private listGroupsCache: Observable<GroupListData[]>;
  private listMyPrayersCache: Observable<MyPrayerListData[]>;
  private listNotifications: BehaviorSubject<NotificationListData[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient, private auth: AuthService) {
    timer(0, 30000).subscribe(_ => this.refreshNotifications());
  }

  public getMe(): Observable<MeData> {
    if (!this.getMeCache) {
      this.getMeCache = this.http.get<MeData>(`${this.baseDomain}/api/me`).pipe(
        publishReplay(1),
        refCount()
      );
    }
    return this.getMeCache;
  }

  public saveMe(data: MeData): Observable<any> {
    this.getMeCache = null;
    return this.http.post(`${this.baseDomain}/api/me`, data);
  }

  public listGroups(): Observable<GroupListData[]> {
    if (!this.listGroupsCache) {
      this.listGroupsCache = this.http.get<GroupListData[]>(`${this.baseDomain}/api/groups`).pipe(
        publishReplay(1),
        refCount()
      );
    }
    return this.listGroupsCache;
  }

  public createPrayer(data: CreatePrayerData): Observable<any> {
    this.listMyPrayersCache = null;
    return this.http.post(`${this.baseDomain}/api/prayers`, data);
  }

  public listMyPrayers(): Observable<MyPrayerListData[]> {
    if (!this.listMyPrayersCache) {
      this.listMyPrayersCache = this.http.get<MyPrayerListData[]>(`${this.baseDomain}/api/prayers`).pipe(
        publishReplay(1),
        refCount()
      );
    }
    return this.listMyPrayersCache;
  }

  public createFeedback(data: CreateFeedbackData): Observable<any> {
    return this.http.post(`${this.baseDomain}/api/feedback`, data);
  }

  public listNotifications$(): Observable<NotificationListData[]> {
    return this.listNotifications.asObservable();
  }

  public deleteNotification(id: string): Observable<any> {
    return this.http.post<any>(`${this.baseDomain}/api/me/notifications/delete`, {ids: [id]})
      .pipe(tap(_ => this.refreshNotifications()));
  }

  public readNotification(id: string): Observable<any> {
    return this.http.post<any>(`${this.baseDomain}/api/me/notifications/read`, {ids: [id]})
      .pipe(tap(_ => this.refreshNotifications()));
  }

  public listGroupPrayers(groupId: string): Observable<GroupPrayerListData[]> {
    return this.http.get<GroupPrayerListData[]>(`${this.baseDomain}/api/groups/${groupId}/prayers`);
  }

  public listGroupMembers(groupId: string): Observable<GroupMemberListData[]> {
    return this.http.get<GroupMemberListData[]>(`${this.baseDomain}/api/groups/${groupId}/members`)
      .pipe(map(members => members.filter(member => !!member.name)));
  }

  public sendPray(groupId: string, prayerId: string): Observable<any> {
    return this.http.post(`${this.baseDomain}/api/groups/${groupId}/prayers/${prayerId}/pray`, {});
  }

  public loadNext10Prayer(groupIds: string[]) {
    return this.http.post<GroupPrayerListData[]>(`${this.baseDomain}/api/prayers/next-10`, {ids: groupIds});
  }

  public closePrayer(data: ClosePrayerRequest): Observable<any> {
    this.listMyPrayersCache = null;
    return this.http.post(`${this.baseDomain}/api/prayers/close`, data);
  }

  public getJoinToGroupToken(groupId: string): Observable<TokenData> {
    return this.http.post<TokenData>(`${this.baseDomain}/api/groups/${groupId}/create-join-token`, {});
  }

  public joinToGroup(token: string): Observable<any> {
    this.listGroupsCache = null;
    const data = {token} as TokenData;
    return this.http.post<any>(`${this.baseDomain}/api/groups/join`, data);
  }

  public pushSubscribe(deviceId: string, subscription: any): Observable<any> {
    return this.http.post<any>(`${this.baseDomain}/api/me/notifications/push/subscribe`, {deviceId, subscription});
  }

  public pushUnsubscribe(deviceId: string): Observable<any> {
    return this.http.post<any>(`${this.baseDomain}/api/me/notifications/push/unsubscribe`, {deviceId});
  }

  public pushTest(): Observable<any> {
    return this.http.post<any>(`${this.baseDomain}/api/me/notifications/push/test`, {});
  }

  private refreshNotifications() {
    this.auth.isLoggedIn().subscribe(isLoggenIn => {
      if (isLoggenIn) {
        this.http.get<NotificationListData[]>(`${this.baseDomain}/api/me/notifications`).subscribe(notifications => {
          this.listNotifications.next(notifications);
        });
      }
    });
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
  message: PrayerCloseFeedbackNotificationData | PrayerCreatedNotificationData;
  createdAt: number;
  meta: NotificationMeta;
}

export interface PrayerCloseFeedbackNotificationData {
  userName?: string;
  message: string;
  feedback: string;
}

export interface PrayerCreatedNotificationData {
  prayerId: string;
  userName?: string;
  message: string;
  groupIds: string[];
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
