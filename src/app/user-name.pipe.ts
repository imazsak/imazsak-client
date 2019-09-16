import {Pipe, PipeTransform} from '@angular/core';
import {GroupMemberListData} from './imazsak.service';

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  transform(id: string, users: GroupMemberListData[]): any {
    const maybeUser = users.find(u => u.id === id && !!u.name);
    return !!maybeUser ? maybeUser.name : 'Névtelen';
  }

}
