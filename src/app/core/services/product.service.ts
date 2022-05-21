import { Injectable } from '@angular/core';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseProduct } from '../models/Response/product/ResponseProduct.module';
import { RequestAddProduct } from '../models/Request/product/RequestAddProduct';
import { RequestUpdateProduct } from '../models/Request/product/RequestUpdateProduct';
import { Status } from '../models/enum/Status.enum';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getProductsFilter(): Observable<ResponseProduct[]> {
    return this.http.get(`${endpoint.product}/products`).pipe(
      map(response => response as ResponseProduct[]),
    );
  }

  getProductByid(id: string): Observable<ResponseProduct> {
    return this.http.get<ResponseProduct>(`${endpoint.product}/${id}`);
  }
  getProductByCategory(id: string): Observable<ResponseProduct[]> {
    return this.http.get<ResponseProduct[]>(`${endpoint.product}/category/${id}`);
  }

  create(product): Observable<RequestAddProduct> {
    return this.http.post<RequestAddProduct>(endpoint.product, product, { headers: this.httpHeaders });
  }

  update(id, product: RequestUpdateProduct): Observable<RequestUpdateProduct> {
    return this.http.put<RequestUpdateProduct>(`${endpoint.product}/${id}`, product, { headers: this.httpHeaders });
  }
  updateStatus(id: string, status: Status): Observable<any> {
    return this.http.patch<ResponseProduct>(`${endpoint.product}/${id}/status/${status}`, { headers: this.httpHeaders });
  }
}
