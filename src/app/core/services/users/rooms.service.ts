import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { filter, map, switchMap, take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { NotificationsService } from "../notifications/notifications.service";

@Injectable({
    providedIn: 'root'
})
export class RoomsService {
    state$: BehaviorSubject<State>;

    constructor(
        private http: HttpClient,
        private notificationsService: NotificationsService
    ) {
        this.state$ = new BehaviorSubject({ loaded: false } as State);
    }

    getAll(): any {
        return this.state$
            .pipe(
                switchMap(s => {

                    if (!s.loaded && !s.loading) {
                        const url = environment.apiUrls.usersApi + '/api/users/@me/rooms';

                        this.setLoading();

                        this.http.get<RoomModel[]>(url)
                            .subscribe({
                                next: (rooms) => {
                                    this.setAll(rooms);
                                }
                            });
                    }

                    return of(s);
                }),
                filter(s => s.loaded),
                map(s => s.data)
            )
    }

    get(): any {

    }

    create(): any {

    }

    update(): any {

    }

    private setLoading(): void {
        this.state$
            .pipe(
                take(1)
            )
            .subscribe({
                next: (s) => {
                    this.state$.next({ data: s.data, loaded: s.loaded, loading: true });
                }
            });
    }

    private setAll(value: RoomModel[]): void {
        this.state$
            .pipe(
                take(1)
            )
            .subscribe({
                next: (s) => {
                    let data = value.map(rm => ({ id: rm.id, type: rm.type, members: rm.members.map(m => m.otherId) }));

                    this.state$.next({ data, loaded: true, loading: false });
                }
            });
    }
}

interface State {
    data: RoomState[];
    loading: boolean;
    loaded: boolean;
}

interface RoomState {
    id: number;
    type: number;
    members: string[];
}

interface RoomModel {
    id: number;
    type: number;
    members: UserModel[];
}

interface UserModel {
    otherId: string;
    name: string;
    tag: string;
    avatarUrl: string;
}