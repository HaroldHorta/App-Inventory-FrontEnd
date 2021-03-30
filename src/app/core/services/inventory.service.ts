import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { RequestUpdateUnit } from '../models/Request/product/RequestUpdateUnit';
import { ResponseProduct } from '../models/Response/product/ResponseProduct.module';
import { ResponseProductPagination } from '../models/Response/product/ResponseProductPagination';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  update(requestUpdateUnit: RequestUpdateUnit): Observable<RequestUpdateUnit> {
    return this.http.patch<RequestUpdateUnit>(`${endpoint.Units}/unit`, requestUpdateUnit, { headers: this.httpHeaders });
  }

  getProductsInventoryFilters(): Observable<ResponseProductPagination> {
    return this.http.get(`${endpoint.Units}/allProducts`).pipe(
      map(response => response as ResponseProductPagination),
    );
  }

  // getProductsInventoryPage(page): Observable<ResponseProductPagination> {
  //   return this.http.get(`${endpoint.Units}/page/?page=${page}`).pipe(
  //     map(response => response as ResponseProductPagination),
  //   );
  // }
}
