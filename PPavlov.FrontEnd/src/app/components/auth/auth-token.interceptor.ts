import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { logoutUserAction } from 'src/app/store/actions/auth.actions';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(
        private store: Store<AppState>
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('bearer_token')}`
            }
        });

        return next.handle(request).pipe(tap(() => { },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }

                    this.store.dispatch(logoutUserAction())
                }
            }));
    }
}