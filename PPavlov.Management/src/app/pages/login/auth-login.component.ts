import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginInput } from 'src/app/models/input/login-input.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loginUserAction } from 'src/app/store/actions/auth.actions';

@Component({
    templateUrl: 'auth-login.component.html',
    styleUrls: ['auth-login.component.scss']
})
export class AuthLoginComponent {
    public formData: FormGroup;

    constructor(
        private store: Store<AppState>
    ) {
        this.formData = new FormGroup({
            username: new FormControl(),
            password: new FormControl()
        })        
    }

    public submitHandler(login: LoginInput) {
        this.store.dispatch(loginUserAction({ payload: login }))
    }
}

