import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { ResponseCashBase } from '../models/Response/finances/cashBase/ResponseCashBase';
import { ResponseCashRegister } from '../models/Response/finances/cashRegister/ResponseCashRegister';

@Injectable({
  providedIn: 'root',
})
export class CashRegisterBaseService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }


  getCashBase(): Observable<ResponseCashBase> {
    return this.http.get(endpoint.CashBase).pipe(
      map(response => response as ResponseCashBase),
    );
  }

  getCashRegister(): Observable<ResponseCashRegister[]> {
    return this.http.get(endpoint.CashRegister).pipe(
      map(response => response as ResponseCashRegister[]),
    );
  }

  createCashBase(cashBase): Observable<ResponseCashBase> {
    return this.http.post<ResponseCashBase>(`${endpoint.CashBase}/${cashBase}`, { headers: this.httpHeaders });
  }

  createCashRegister(): Observable<ResponseCashRegister> {
    return this.http.post<ResponseCashRegister>(`${endpoint.CashBase}/CashRegister`, { headers: this.httpHeaders });
  }


}