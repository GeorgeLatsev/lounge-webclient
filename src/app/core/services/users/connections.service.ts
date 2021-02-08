import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map, take, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ConnectionCreatedMethod } from "../notifications/methods/connection-created.method";
import { ConnectionUpdatedMethod } from "../notifications/methods/connection-updated.method";
import { NotificationsService } from "../notifications/notifications.service";
import { Connection, RelationshipEnum } from "./models/connection.model";

@Injectable({
    providedIn: 'root'
})
export class ConnectionsService {
    state$: BehaviorSubject<State>;

    constructor(
        private http: HttpClient,
        private notificationsService: NotificationsService
    ) {
        this.state$ = new BehaviorSubject({ data: [], requestedNames: [], loaded: false, loading: false } as State);

        this.notificationsService.on(ConnectionCreatedMethod, ([data]) => {
            this.setSinglePartial({ ...data, notes: '', relationship: 0 });
        });

        this.notificationsService.on(ConnectionUpdatedMethod, ([data]) => {
            this.setSinglePartial({ otherId: data.otherId, notes: data.notes, relationship: data.relationship });
        });
    }

    getAll(): Observable<Connection[]> {
        return this.state$
            .pipe(
                tap(state => {
                    if (!state.loaded && !state.loading) {
                        this.loadState();
                    }
                }),
                filter(state => state.loaded),
                map(state => state.data)
            );
    }

    getWithRelation(relation: RelationshipEnum): Observable<Connection[]> {
        return this.getAll()
            .pipe(
                map(all => all.filter(c => c.relationship == relation))
            );
    }

    get(otherId: string): Observable<Connection | undefined> {
        return this.getAll()
            .pipe(
                map(conns => conns.find(c => c.otherId == otherId))
            );
    }
    // we can return notes: '' rel: 0 if not found tho

    getByName(displayName: string): Observable<Connection | undefined> {
        return this.state$
            .pipe(
                tap(state => {
                    if (!state.loaded && !state.loading) {
                        this.loadState();
                    }
                }),
                filter(state => state.loaded),
                tap(state => {
                    const index = state.data.findIndex(c => `${c.name}#${c.tag}` === displayName);

                    if (index === -1 && !state.requestedNames.includes(displayName)) {
                        const url = environment.apiUrls.usersApi + `/api/users/${encodeURIComponent(displayName)}`;

                        this.setRequestName(displayName);

                        this.http.get<Connection>(url)
                            .subscribe({
                                next: (conn) => {
                                    this.setSingle(conn);
                                    this.removeRequestName(displayName);
                                },
                                error: () => {
                                    this.removeRequestName(displayName);
                                }
                            });

                    }
                }),
                map(state => state.data.find(c => `${c.name}#${c.tag}` === displayName))
            )
    }

    update(connection: AtLeast<Connection, 'otherId'>): Observable<any> {
        const url = environment.apiUrls.usersApi + '/api/users/@me/connections/' + connection.otherId;

        const operations = [];

        for (const [key, value] of Object.entries(connection)) {
            if (key === 'notes' || key == 'relationship') {
                operations.push({ op: 'replace', path: `/${key}`, value });
            }
        }

        return this.http.patch(url, operations);
    }


    private loadState(): void {
        const url = environment.apiUrls.usersApi + '/api/users/@me/connections';

        this.setLoading();

        this.http.get<Connection[]>(url)
            .subscribe({
                next: (conns) => {
                    this.setAll(conns);
                }
            });
    }

    private setLoading(): void {
        this.state$
            .pipe(
                take(1)
            )
            .subscribe({
                next: (state) => {
                    this.state$.next({ ...state, loading: true });
                }
            });
    }

    private setRequestName(displayName: string): void {
        this.state$
            .pipe(
                take(1)
            )
            .subscribe({
                next: (state) => {
                    this.state$.next({ ...state, requestedNames: [...state.requestedNames, displayName] });
                }
            })
    }

    private removeRequestName(displayName: string): void {
        this.state$
            .pipe(
                take(1)
            )
            .subscribe({
                next: (state) => {
                    const requestedNames = state.requestedNames.filter(n => n !== displayName);
                    this.state$.next({ ...state, requestedNames });
                }
            })
    }


    private setAll(data: Connection[]): void {
        this.state$
            .pipe(
                take(1)
            )
            .subscribe({
                next: (state) => {
                    this.state$.next({ ...state, data, loaded: true, loading: false });
                }
            });
    }

    private setSingle(conn: Connection): void {
        this.state$
            .pipe(
                take(1)
            )
            .subscribe({
                next: (state) => {
                    this.state$.next({ ...state, data: [...state.data, conn] });
                }
            });
    }

    private setSinglePartial(conn: AtLeast<Connection, 'otherId'>): void {
        this.state$
            .pipe(
                take(1)
            )
            .subscribe({
                next: (state) => {
                    const index = state.data.findIndex(c => c.otherId === conn.otherId);

                    if (index === -1) { return; }

                    const connection = state.data[index];

                    if (conn.name) { connection.name = conn.name; }
                    if (conn.tag) { connection.tag = conn.tag; }
                    if (conn.avatarUrl) { connection.avatarUrl = conn.avatarUrl; }
                    if (conn.notes) { connection.notes = conn.notes; }
                    if (conn.relationship || conn.relationship === 0) { connection.relationship = conn.relationship; } // TODO MIGHT NOT WORKI TESTT
                    // TODO check in case 0 is flagged as null
                    //  if (value.status || value.status === UserStatusEnum.Unknown) { otherUser.status = value.status; }

                    state.data[index] = connection;

                    this.state$.next(state);
                }
            });
    }
}

interface State {
    data: Connection[];
    requestedNames: string[];
    loading: boolean;
    loaded: boolean;
}

type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
