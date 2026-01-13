import {
    HttpEvent,
    HttpEventType,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        req: HttpRequest<any>,
        handler: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.url.startsWith('/api') && req.url !== '/api/login') {
            const authToken = this.authService.getAuthToken();
            if (authToken) {
                req = req.clone({
                    headers: req.headers.set(
                        'Authorization',
                        `Bearer ${authToken}`
                    ),
                });
            }
        }

        return handler.handle(req).pipe(
            tap((event) => {
                if (event.type === HttpEventType.Response) {
                    if (event.status === 403) {
                        this.authService.logout();
                    }
                }
            })
        );
    }
}
