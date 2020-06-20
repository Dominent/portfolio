import { createReducer, on } from '@ngrx/store';
import { initialState } from './media.state';

import * as fromActions from './media.actions';

export const mediaReducer = createReducer(initialState,
    on(fromActions.getAllLibrariesSuccessAction,
        (state, action) => ({ ...state, libraries: action.libraries })),
    on(fromActions.SetLibraryAction,
        (state, action) => ({ ...state, library: action.library })),
    on(fromActions.getMediaByLibraryIdSuccessAction,
        (state, action) => ({ ...state, media: action.media }))
)