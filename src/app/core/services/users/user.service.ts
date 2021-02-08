import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ReadyMethod } from "../notifications/methods/ready.method";
import { UserUpdatedMethod } from "../notifications/methods/user-updated.method";
import { NotificationsService } from "../notifications/notifications.service";
import { User } from "./models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    state$: BehaviorSubject<State>;

    constructor(
        private http: HttpClient,
        private notificationsService: NotificationsService
    ) {
        this.state$ = new BehaviorSubject({ loaded: false } as State);

        this.notificationsService.on(ReadyMethod, ([data]) => {
            this.state$.next({ data: { id: data.id, name: data.name, tag: data.tag, avatarUrl: data.avatarUrl }, loaded: true });
        });

        this.notificationsService.on(UserUpdatedMethod, ([data]) => {
            this.state$.next({ data: { id: data.id, name: data.name, tag: data.tag, avatarUrl: data.avatarUrl }, loaded: true });
        });
    }

    getUser(): Observable<User> {
        return this.state$
            .pipe(
                filter(state => state.loaded),
                map(state => state.data)
            );
    }

    changeUser(user: Partial<User>): Observable<any> {
        const url = environment.apiUrls.usersApi + '/api/users/@me';

        const operations = [];

        for (const [key, value] of Object.entries(user)) {
            operations.push({ op: 'replace', path: `/${key}`, value });
        }

        return this.http.patch(url, operations);
    }
}

interface State {
    data: User;
    loaded: boolean;
}