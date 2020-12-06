import { Injectable } from '@angular/core';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseProduct } from '../models/Response/product/ResponseProduct.module';
import { RequestAddProduct } from '../models/Request/product/RequestAddProduct';
import { RequestUpdateProduct } from '../models/Request/product/RequestUpdateProduct';
import { Status } from '../models/enum/Status.enum';
import { ResponseProductPagination } from '../models/Response/product/ResponseProductPagination';

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


  getProductsFilter(): Observable<ResponseProductPagination> {
    return this.http.get(`${endpoint.Product}/productsFilter`).pipe(
      map(response => response as ResponseProductPagination),
    );
  }


  getProductsFilters(page): Observable<ResponseProductPagination> {
    return this.http.get(`${endpoint.Product}/products/?page=${page}`).pipe(
      map(response => response as ResponseProductPagination),
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
