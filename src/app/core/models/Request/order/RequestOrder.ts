import { ResponseProduct } from '../../Response/product/ResponseProduct.module';
import { RequestOrderProductItems } from './RequestOrderProductItems';

export class RequestOrder {
    id: string;
    products:
        {
            product: ResponseProduct[],
            unit: number,
        };
}
