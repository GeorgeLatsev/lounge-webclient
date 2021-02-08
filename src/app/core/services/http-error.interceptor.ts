import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorService } from './http-error.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private httpErrorService: HttpErrorService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {

                    const handlers = this.httpErrorService.getHandlers(error.url ?? '');

                    handlers.forEach(handler => {
                        handler(error);
                    });

                    return throwError(error);
                })
            );
    }
}
