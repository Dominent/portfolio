import { Injectable } from '@angular/core';
import { LoginInput } from 'src/app/models/input/login-input.model';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
    private readonly url = `${environment.API_URL}/authentication`
    
    constructor(
        private httpClient: HttpClient
    ) {}

    public login(login: LoginInput): Observable<Login> {
        return this.httpClient.post<Login>(`${this.url}/login`, login);
    }
}