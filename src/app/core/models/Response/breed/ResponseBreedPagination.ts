import { ResponseBreed } from './ResponseBreed';

export class ResponseBreedPagination {
    limitMin: number;
    limitMax: number;
    totalData: number;
    size: number;
    breeds: ResponseBreed[];
}
