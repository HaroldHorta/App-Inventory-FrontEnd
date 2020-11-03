import { Injectable } from '@angular/core';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseProduct } from '../models/Response/product/ResponseProduct.module';
import { RequestAddProduct } from '../models/Request/product/RequestAddProduct';
import { Status } from '../models/Response/enum/Status.enum';
import { RequestUpdateProduct } from '../models/Request/product/RequestUpdateProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getProducts(): Observable<ResponseProduct[]> {
    return this.http.get(endpoint.Product).pipe(
      map(response => response as ResponseProduct[]),
    );
  }

  getProductByid(id: string): Observable<ResponseProduct> {
    return this.http.get<ResponseProduct>(`${endpoint.Product}/${id}`);
  }
  getProductByCategory(id: string): Observable<ResponseProduct[]> {
    return this.http.get<ResponseProduct[]>(`${endpoint.Product}/category/${id}`);
  }

  create(product): Observable<RequestAddProduct> {
    return this.http.post<RequestAddProduct>(endpoint.Product, product, { headers: this.httpHeaders });
  }

  update(id, product: RequestUpdateProduct): Observable<RequestUpdateProduct> {
    return this.http.put<RequestUpdateProduct>(`${endpoint.Product}/${id}`, product, { headers: this.httpHeaders });
  }
  updateStatus(id: string, status: Status): Observable<any> {
    return this.http.patch<ResponseProduct>(`${endpoint.Product}/${id}/status/${status}`, { headers: this.httpHeaders });
  }
}
