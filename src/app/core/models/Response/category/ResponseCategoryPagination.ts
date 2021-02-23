import { ResponseCategory } from './ResponseCategory.module';

export class ResponseCategoryPagination {
    limitMin: number;
    limitMax: number;
    totalData: number;
    size: number;
    categories: ResponseCategory[];
}