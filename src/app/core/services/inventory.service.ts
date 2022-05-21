import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { RequestUpdateUnit } from '../models/Request/product/RequestUpdateUnit';
import { ResponseProduct } from '../models/Response/product/ResponseProduct.module';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  update(requestUpdateUnit: RequestUpdateUnit): Observable<RequestUpdateUnit> {
    return this.http.patch<RequestUpdateUnit>(`${endpoint.inventory}/unit`, requestUpdateUnit, { headers: this.httpHeaders });
  }

  getProductsInventoryFilters(): Observable<ResponseProduct[]> {
    return this.http.get(`${endpoint.inventory}/inventory`).pipe(
      map(response => response as ResponseProduct[]),
    );
  }

}
