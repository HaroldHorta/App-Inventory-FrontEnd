import { ResponseCategory } from '../../Response/category/ResponseCategory.module';
import { ResponseProduct } from'../../Response/product/ResponseProduct.module';

export class RequestAddProduct{
    name: string;
    description: string;
    categoryId: ResponseCategory[];
    priceBuy: string;
    priceSell: string;
    unit: number;
}