import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotificationsService } from './notifications/notifications.service';

@Injectable()
export class ConectionIdInterceptor implements HttpInterceptor {

    constructor(private notificationsService: NotificationsService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let sendConnectionId = false;

        for (var apiUrl in environment.apiUrls) {
            if (req.url.startsWith(apiUrl)) {
                sendConnectionId = true;
                break;
            }
        }

        if (!sendConnectionId) {
            return next.handle(req);
        }

        return this.notificationsService.getConnectionId()
            .pipe(
                mergeMap(connectionId => {
                    req = req.clone({
                        headers: req.headers.set('notifications-connection-id', connectionId)
                    });

                    return next.handle(req);
                })
            );
    }
}
