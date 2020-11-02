import { ResponseCategory } from '../../Response/category/ResponseCategory.module';
import { Status } from '../../Response/enum/Status.enum';
export class RequestUpdateProduct{
    name: string;
    description: string;
    categoryId: ResponseCategory[];
    status: Status;
    priceBuy: string;
    priceSell: string;
    unit: number;
}