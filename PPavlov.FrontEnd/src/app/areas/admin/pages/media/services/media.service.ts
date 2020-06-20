import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MediaOutputModel } from '../models/media-output-model';

@Injectable()
export class MediaService {
    constructor(private _httpClient: HttpClient) { }

    public getAll(): Observable<MediaOutputModel[]> {
        return this._httpClient.get<MediaOutputModel[]>(`${environment.API_URL}/media`);
    }

    public getByLibraryId(libraryId: number): Observable<MediaOutputModel[]> {
        return this._httpClient.get<MediaOutputModel[]>(`${environment.API_URL}/media/library/${libraryId}`);
    }
}

