import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginInput } from 'src/app/models/input/login-input.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loginUserAction } from 'src/app/store/actions/auth.actions';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { selectAuthenticated } from 'src/app/store/selectors/auth.selector';
import { filter, tap } from 'rxjs/operators';

@Component({
    templateUrl: 'auth-login.component.html',
    styleUrls: ['auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit, OnDestroy {
    public formData: FormGroup;

    private subscription: Subscription = new Subscription();
    private authenticated$: Observable<boolean> = this.store.pipe(select(selectAuthenticated))

    constructor(
        private store: Store<AppState>,
        private router: Router
    ) {
        this.formData = new FormGroup({
            username: new FormControl(),
            password: new FormControl()
        })
    }

    ngOnInit(): void {
        this.subscription.add(this.authenticated$.pipe(
            filter(Boolean),
            tap(() => this.router.navigate(['/admin'])))
            .subscribe());
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public submitHandler(login: LoginInput) {
        this.store.dispatch(loginUserAction({ payload: login }))
    }
}

