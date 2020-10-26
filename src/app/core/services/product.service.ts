import { Injectable } from '@angular/core';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseProduct } from '../models/Response/product/ResponseProduct.module';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  getProducts(): Observable<ResponseProduct[]> {
    return this.http.get(endpoint.Product).pipe(
      map(response => response as ResponseProduct[]),
    );
  }

  getProductByid(id): Observable<ResponseProduct[]> {
    return this.http.get<ResponseProduct[]>(`${endpoint.Product}/${id}`);
  }
  getProductByCategory(id): Observable<ResponseProduct[]> {
    return this.http.get<ResponseProduct[]>(`${endpoint.Product}/category/${id}`);
  }

}
