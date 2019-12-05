import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {GroupListComponent} from './group-list/group-list.component';
import {LoginComponent} from './login/login.component';
import {MyPrayersComponent} from './my-prayers/my-prayers.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {GroupComponent} from './group/group.component';
import {MembersComponent} from './members/members.component';
import {PrayersComponent} from './prayers/prayers.component';
import {HomeComponent} from './home/home.component';
import {NotificationDetailsComponent} from './notification-details/notification-details.component';
import {NotificationTestComponent} from './notification-test/notification-test.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'groups', component: GroupListComponent, canActivate: [AuthGuard]},
  {path: 'groups/:id', component: GroupComponent, canActivate: [AuthGuard]},
  {path: 'groups/:id/members', component: MembersComponent, canActivate: [AuthGuard]},
  {path: 'groups/:id/prayers', component: PrayersComponent, canActivate: [AuthGuard]},
  {path: 'my-prayers', component: MyPrayersComponent, canActivate: [AuthGuard]},
  {path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]},
  {path: 'notifications/:id', component: NotificationDetailsComponent, canActivate: [AuthGuard]},
  {path: 'notification-test', component: NotificationTestComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
