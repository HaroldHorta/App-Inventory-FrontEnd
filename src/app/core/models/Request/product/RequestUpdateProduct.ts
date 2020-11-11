import { ResponseCategory } from '../../Response/category/ResponseCategory.module';
export class RequestUpdateProduct {
    name: string;
    description: string;
    categoryId: ResponseCategory[];
    priceBuy: string;
    priceSell: string;
    unit: number;
}
