import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MediaService } from '../services/media.service';
import { LibraryService } from '../services/library.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LibraryNode } from '../models/library-node';
import { MediaOutputModel } from '../models/media-output-model';

import * as fromActions from './media.actions';

@Injectable()
export class MediaEffects {
    constructor(
        private _actions$: Actions,
        private _mediaService: MediaService,
        private _libraryService: LibraryService
    ) { }

    @Effect()
    public getAllLibrariesEffect$: Observable<Action> = this._actions$.pipe(
        ofType<ReturnType<typeof fromActions.getAllLibrariesRequestAction>>(fromActions.getAllLibrariesRequestAction.type),
        switchMap(() => this._libraryService.getAll().pipe(
            map((libraries: LibraryNode[]) => fromActions.getAllLibrariesSuccessAction({ libraries })),
            catchError((error: HttpErrorResponse) => of(fromActions.getAllLibrariesFailureAction({ error })))
        ))
    )

    @Effect()
    public setDefaultLibraryEffect$: Observable<Action> = this._actions$.pipe(
        ofType<ReturnType<typeof fromActions.getAllLibrariesSuccessAction>>(fromActions.getAllLibrariesSuccessAction.type),
        map(({ libraries: [library] }) => fromActions.SetLibraryAction({ library }))
    )

    @Effect()
    public triggerGetAllMediaByLibraryIdEffect$: Observable<Action> = this._actions$.pipe(
        ofType<ReturnType<typeof fromActions.SetLibraryAction>>(fromActions.SetLibraryAction.type),
        map(({ library }) => fromActions.getMediaByLibraryIdRequestAction({ libraryId: library.value.id })));

    @Effect()
    public getAllMediaByLibraryIdEffect$: Observable<Action> = this._actions$.pipe(
        ofType<ReturnType<typeof fromActions.getMediaByLibraryIdRequestAction>>(fromActions.getMediaByLibraryIdRequestAction.type),
        switchMap(({ libraryId }) => this._mediaService.getByLibraryId(libraryId).pipe(
            map((media: MediaOutputModel[]) => fromActions.getMediaByLibraryIdSuccessAction({ media })),
            catchError((error: HttpErrorResponse) => of(fromActions.getMediaByLibraryIdFailureAction({ error })))
        ))
    );
}