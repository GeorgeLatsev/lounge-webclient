import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HttpErrorService {
    handlers: Handler[];

    constructor() {
        this.handlers = [];
    }

    getHandlers(url: string): ((e: HttpErrorResponse) => void)[] {
        return this.handlers
            .filter(handler => {
                const pattern = new RegExp(handler.urlPattern);
                return pattern.test(url);
            })
            .map(handler => handler.func)
    }

    addHandler(urlPattern: string, func: (e: HttpErrorResponse) => void): void {
        const handler = { urlPattern, func };
        this.handlers.push(handler);
    }

}

export interface Handler {
    urlPattern: string;
    func: (e: HttpErrorResponse) => void;
}