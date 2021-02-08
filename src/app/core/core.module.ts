
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../../environments/environment';
import { AuthorizationGuard } from './services/auth-guard.service';
import { ConectionIdInterceptor } from './services/connection-id.interceptor';
import { HttpErrorInterceptor } from './services/http-error.interceptor';
import { HttpErrorService } from './services/http-error.service';
import { HttpTokenInterceptor } from './services/http-token.interceptor';
import { NotificationsService } from './services/notifications/notifications.service';
import { ConnectionsService } from './services/users/connections.service';
import { RoomsService } from './services/users/rooms.service';
import { SettingsService } from './services/users/settings.service';
import { UserService } from './services/users/user.service';

@NgModule({
  providers: [
    AuthorizationGuard,
    HttpErrorService,
    NotificationsService,
    UserService,
    SettingsService,
    RoomsService,
    ConnectionsService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ConectionIdInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  imports: [
    HttpClientModule,
    AuthModule.forRoot({
      domain: environment.auth.domain,
      clientId: environment.auth.clientId
    })
  ]
})
export class CoreModule { }
