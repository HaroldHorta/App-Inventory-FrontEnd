import { ResponseExpenses } from "./ResponseExpenses";

export class ResponseExpensesPagination {
    limitMin: number;
    limitMax: number;
    totalData: number;
    size: number;
    expenses: ResponseExpenses[];
}