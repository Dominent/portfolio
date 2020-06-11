import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LibraryNode } from '../models/library-node';

@Injectable()
export class LibraryService {
    private readonly _url = `${environment.API_URL}/libraries`

    constructor(private _httpClient: HttpClient) {
    }

    public getAll(): Observable<LibraryNode[]> {
        return this._httpClient.get<LibraryNode[]>(this._url);
    }
}


