import { LibraryNode } from '../models/library-node';
import { MediaOutputModel } from '../models/media-output-model';

export const mediaFeatureKey = 'mediaFeature';

export interface IMediaState {
    libraries: LibraryNode[],
    library: LibraryNode,
    media: MediaOutputModel[]
}

export const initialState: IMediaState = {
    libraries: null,
    library: null,
    media: null
}