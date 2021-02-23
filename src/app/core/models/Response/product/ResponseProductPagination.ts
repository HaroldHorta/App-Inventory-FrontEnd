import { ResponseProduct } from './ResponseProduct.module';

export class ResponseProductPagination {
    limitMin: number;
    limitMax: number;
    totalData: number;
    size: number;
    products: ResponseProduct[];
}
