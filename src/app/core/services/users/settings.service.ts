import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ReadyMethod } from "../notifications/methods/ready.method";
import { SettingsUpdatedMethod } from "../notifications/methods/settings-updated.method";
import { NotificationsService } from "../notifications/notifications.service";
import { Settings } from "./models/settings.model";

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    state$: BehaviorSubject<State>;

    constructor(
        private http: HttpClient,
        private notificationsService: NotificationsService
    ) {
        this.state$ = new BehaviorSubject({ loaded: false } as State);

        this.notificationsService.on(ReadyMethod, ([data]) => {
            this.state$.next({ data: { theme: data.settings.theme }, loaded: true });
        });

        this.notificationsService.on(SettingsUpdatedMethod, ([data]) => {
            this.state$.next({ data: { theme: data.theme }, loaded: true });
        });
    }

    getSettings(): Observable<Settings> {
        return this.state$
            .pipe(
                filter(state => state.loaded),
                map(state => state.data)
            );
    }

    changeSettings(settings: Partial<Settings>): Observable<any> {
        const url = environment.apiUrls.usersApi + '/api/users/@me/settings';

        const operations = [];

        for (const [key, value] of Object.entries(settings)) {
            operations.push({ op: 'replace', path: `/${key}`, value });
        }

        return this.http.patch(url, operations);
    }
}

interface State {
    data: Settings;
    loaded: boolean;
}