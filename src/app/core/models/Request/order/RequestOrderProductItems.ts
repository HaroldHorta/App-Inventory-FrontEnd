import { ResponseProduct } from '../../Response/product/ResponseProduct.module';

export class RequestOrderProductItems {
    product: ResponseProduct;
    unit: number;
    total: number;

}
