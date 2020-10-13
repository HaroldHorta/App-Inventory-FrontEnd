import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseOrder } from '../models/Response/order/ResponseOrder.module';
import { map } from 'rxjs/operators';
import { endpoint } from '../infraestructure/endpoint/endpoint';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private httHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient) { }

  getOrders(): Observable<ResponseOrder[]> {
    return this.http.get(endpoint.Order).pipe(
      map(response => response as ResponseOrder[])
    );
  }
}
