import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { RequestExpenses } from '../models/Request/expenses/RequestExpenses';
import { ResponseExpenses } from '../models/Response/expenses/ResponseExpenses';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }


  getCustomers(): Observable<ResponseExpenses[]> {
    return this.http.get(endpoint.Expenses).pipe(
      map(response => response as ResponseExpenses[]),
    );
  }

  findExpensesById(id: string): Observable<ResponseExpenses> {
    return this.http.get<ResponseExpenses>(`${endpoint.Expenses}/${id}`);
  }
  create(expenses): Observable<RequestExpenses> {
    return this.http.post<RequestExpenses>(endpoint.Expenses, expenses, { headers: this.httpHeaders });
  }
}
