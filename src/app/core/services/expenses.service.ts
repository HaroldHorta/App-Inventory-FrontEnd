import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { RequestExpenses } from '../models/Request/expenses/RequestExpenses';
import { ResponseExpenses } from '../models/Response/expenses/ResponseExpenses';
import { ResponseExpensesPagination } from '../models/Response/expenses/ResponseExpensesPagination';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }



  getProductsExpensesFilters(): Observable<ResponseExpensesPagination> {
    return this.http.get(`${endpoint.Expenses}/expensesFilter`).pipe(
      map(response => response as ResponseExpensesPagination),
    );
  }

  getProductsExpensesPage(page): Observable<ResponseExpensesPagination> {
    return this.http.get(`${endpoint.Expenses}/page/?page=${page}`).pipe(
      map(response => response as ResponseExpensesPagination),
    );
  }

  findExpensesById(id: string): Observable<ResponseExpenses> {
    return this.http.get<ResponseExpenses>(`${endpoint.Expenses}/${id}`);
  }
  create(expenses): Observable<RequestExpenses> {
    return this.http.post<RequestExpenses>(endpoint.Expenses, expenses, { headers: this.httpHeaders });
  }
}
