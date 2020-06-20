import { LibraryOutputModel } from './library-output-model';

export interface MediaOutputModel {
    size: number;
    src: string;
    id: number;
    name: string;
    extension: string;
    url: string;
    width: number;
    height: number;
    libraryId: number;
    library?: LibraryOutputModel;
    createdAt: Date;
    updatedAt: Date;
}
