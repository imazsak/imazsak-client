import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }

  public listGroups(): Observable<GroupListData[]> {
    const url = '/api/groups';
    return this.http.get<GroupListData[]>(url);
  }
}

export interface GroupListData {
  id: string;
  name: string;
}
