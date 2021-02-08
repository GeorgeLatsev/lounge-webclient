import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let audience = undefined;

        if (req.url.startsWith(environment.apiUrls.notificationsApi)) {
            audience = environment.authAudiences.notificationsApi;
        }

        if (req.url.startsWith(environment.apiUrls.usersApi)) {
            audience = environment.authAudiences.usersApi;
        }

        if (!audience) {
            return next.handle(req);
        }

        return this.authService.getAccessTokenSilently({ audience })
            .pipe(
                mergeMap(token => {
                    req = req.clone({
                        headers: req.headers.set('Authorization', 'Bearer ' + token).set('Content-Type', 'application/json')
                    });
                    return next.handle(req);
                })
            );
    }
}
