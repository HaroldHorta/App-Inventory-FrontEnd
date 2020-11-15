import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseOrder } from '../models/Response/order/ResponseOrder.module';
import { map } from 'rxjs/operators';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { RequestOrder } from '../models/Request/order/RequestOrder';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  getOrders(): Observable<ResponseOrder[]> {
    return this.http.get<ResponseOrder[]>(endpoint.Order);
  }

  getOrder(id): Observable<ResponseOrder> {
    return this.http.get<ResponseOrder>(`${endpoint.Order}/${id}`);
  }

  create(order: any): Observable<RequestOrder> {
    return this.http.post<RequestOrder>(endpoint.Order, order, { headers: this.httpHeaders });
  }
}
