import { ResponseCustomer } from './ResponseCustomer.module';

export class ResponseCustomerPagination {
    limitMin: number;
    limitMax: number;
    totalData: number;
    size: number;
    customers: ResponseCustomer[];
}
