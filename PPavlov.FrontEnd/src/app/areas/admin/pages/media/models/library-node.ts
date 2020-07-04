import { LibraryOutputModel } from './library-output-model';

export interface LibraryNode {
    value: LibraryOutputModel;
    children: LibraryNode[];
}
