import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { LibraryNode } from '../models/library-node';
import { MediaOutputModel } from '../models/media-output-model';

export const getAllLibrariesRequestAction = createAction('GET_ALL_LIBRARIES_REQUEST');
export const getAllLibrariesSuccessAction = createAction('GET_ALL_LIBRARIES_SUCCESS', props<{ libraries: LibraryNode[] }>());
export const getAllLibrariesFailureAction = createAction('GET_ALL_LIBRARIES_FAILURE', props<{ error: HttpErrorResponse }>());

export const SetLibraryAction = createAction('SET_LIBRARY', props<{ library: LibraryNode }>());
export const UnsetLibraryAction = createAction('UNSET_LIBRARY');

export const getMediaByLibraryIdRequestAction = createAction('GET_ALL_MEDIA_BY_LIBRARY_ID_REQUEST', props<{ libraryId: number }>());
export const getMediaByLibraryIdSuccessAction = createAction('GET_ALL_MEDIA_BY_LIBRARY_ID_SUCCESS', props<{ media: MediaOutputModel[] }>());
export const getMediaByLibraryIdFailureAction = createAction('GET_ALL_MEDIA_BY_LIBRARY_ID_FAILURE', props<{ error: HttpErrorResponse }>());
