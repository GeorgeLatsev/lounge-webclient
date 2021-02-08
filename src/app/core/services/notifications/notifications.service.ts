import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseMethod } from './methods/base-method';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    private hubConnection: HubConnection;
    private connectionId: ReplaySubject<string>;

    constructor(
        private authService: AuthService
    ) {
        const hubUrl = environment.apiUrls.notificationsApi + '/notifications';

        const builder = new HubConnectionBuilder()
            .withUrl(hubUrl, {
                accessTokenFactory: () => this.authService.getAccessTokenSilently({
                    audience: environment.authAudiences.notificationsApi
                }).toPromise()
            })
            .withAutomaticReconnect();

        this.hubConnection = builder.build();

        this.connectionId = new ReplaySubject(1);

        this.authService.isAuthenticated$
            .pipe(
                filter(isAuth => isAuth)
            )
            .subscribe({
                next: _ => this.hubConnection.start()
                    .then(_ => this.connectionId.next(this.hubConnection.connectionId?.valueOf()))
            });
    }

    public on<T extends typeof BaseMethod>(type: T, func: (args: ConstructorParameters<T>) => void): void {
        const eventName = type.name;

        this.hubConnection.on(eventName, func);
    }

    public getConnection(): HubConnection {
        return this.hubConnection;
    }

    public getConnectionId(): Observable<string> {
        return this.connectionId.asObservable();
    }
}
