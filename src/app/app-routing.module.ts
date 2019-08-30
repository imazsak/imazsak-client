import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {MyPrayersComponent} from './my-prayers/my-prayers.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {GroupComponent} from './group/group.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'groups', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'groups/:id', component: GroupComponent, canActivate: [AuthGuard]},
  {path: 'my-prayers', component: MyPrayersComponent, canActivate: [AuthGuard]},
  {path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
