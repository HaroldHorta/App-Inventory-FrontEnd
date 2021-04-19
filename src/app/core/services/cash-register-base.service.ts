import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { ResponseCashBase } from '../models/Response/finances/cashBase/ResponseCashBase';
import { ResponseCashRegister } from '../models/Response/finances/cashRegister/ResponseCashRegister';
import { ResponseCashRegisterPagination } from '../models/Response/finances/cashRegister/ResponseCashRegisterPagination';

@Injectable({
  providedIn: 'root',
})
export class CashRegisterBaseService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }


  getCashBase(): Observable<ResponseCashBase> {
    return this.http.get(endpoint.cashBase).pipe(
      map(response => response as ResponseCashBase),
    );
  }

  getProductsExpensesFilters(): Observable<ResponseCashRegisterPagination> {
    return this.http.get(`${endpoint.cashBase}/cashRegisterDailyFilter`).pipe(
      map(response => response as ResponseCashRegisterPagination),
    );
  }

  getProductsExpensesPage(page): Observable<ResponseCashRegisterPagination> {
    return this.http.get(`${endpoint.cashBase}/page/?page=${page}`).pipe(
      map(response => response as ResponseCashRegisterPagination),
    );
  }

  createCashBase(cashBase): Observable<ResponseCashBase> {
    return this.http.post<ResponseCashBase>(`${endpoint.cashBase}/${cashBase}`, { headers: this.httpHeaders });
  }

  createCashRegister(): Observable<ResponseCashRegister> {
    return this.http.post<ResponseCashRegister>(`${endpoint.cashBase}/cashRegister`, { headers: this.httpHeaders });
  }


}
