import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {GroupListComponent} from './group-list/group-list.component';
import {AuthInterceptor} from './auth.interceptor';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

import {HeaderComponent} from './header/header.component';
import {SettingsButtonComponent} from './settings/settings-button.component';
import {SettingsDialogComponent} from './settings/settings-dialog.component';
import {CreatePrayerDialogComponent} from './create-prayer/create-prayer-dialog.component';
import {CreatePrayerButtonComponent} from './create-prayer/create-prayer-button.component';
import {MyPrayersComponent} from './my-prayers/my-prayers.component';
import {FeedbackButtonComponent} from './feedback/feedback-button.component';
import {FeedbackDialogComponent} from './feedback/feedback-dialog.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {GroupComponent} from './group/group.component';
import {MembersComponent} from './members/members.component';
import {PrayersComponent} from './prayers/prayers.component';
import {UserNamePipe} from './user-name.pipe';
import {PrayDialogComponent} from './pray-dialog/pray-dialog.component';
import {PrayButtonComponent} from './pray-button/pray-button.component';
import {AgoPipe} from './ago.pipe';
import {ClosePrayerDialogComponent} from './close-prayer-dialog/close-prayer-dialog.component';

const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GroupListComponent,
    HeaderComponent,
    SettingsButtonComponent,
    SettingsDialogComponent,
    CreatePrayerButtonComponent,
    CreatePrayerDialogComponent,
    MyPrayersComponent,
    FeedbackButtonComponent,
    FeedbackDialogComponent,
    NotificationsComponent,
    GroupComponent,
    MembersComponent,
    PrayersComponent,
    UserNamePipe,
    PrayDialogComponent,
    PrayButtonComponent,
    AgoPipe,
    ClosePrayerDialogComponent
  ],
  entryComponents: [
    SettingsDialogComponent,
    CreatePrayerDialogComponent,
    FeedbackDialogComponent,
    PrayDialogComponent,
    ClosePrayerDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
