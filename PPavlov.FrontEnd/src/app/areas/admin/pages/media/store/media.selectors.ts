import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IMediaState, mediaFeatureKey } from "./media.state";

const selectMediaFeature = createFeatureSelector<IMediaState>(mediaFeatureKey);

export const selectLibraries = createSelector(
    selectMediaFeature,
    (state: IMediaState) => state.libraries
)

export const selectLibrary = createSelector(
    selectMediaFeature,
    (state: IMediaState) => state.library
)

export const selectMedia = createSelector(
    selectMediaFeature,
    (state: IMediaState) => state.media
)