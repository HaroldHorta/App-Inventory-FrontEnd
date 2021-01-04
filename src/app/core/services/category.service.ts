import { Injectable } from '@angular/core';
import { ApiBaseService } from '../infraestructure/api/api-base.service';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ResponseCategory } from '../models/Response/category/ResponseCategory.module';
import { RequestCategory } from '../models/Request/category/RequestCategory';
import { RequestUpdateCategory } from '../models/Request/category/RequestUpdateCategory';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { ResponseCustomerPagination } from '../models/Response/customer/ResponseCustomerPagination';
import { ResponseCategoryPagination } from '../models/Response/category/ResponseCategoryPagination';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getCategories(): Observable<ResponseCategory[]> {
    return this.http.get(endpoint.Category).pipe(
      map(response => response as ResponseCategory[]),
    );
  }

  getCategoryPage(page): Observable<ResponseCategoryPagination> {
    return this.http.get(`${endpoint.Category}/page/?page=${page}`).pipe(
      map(response => response as ResponseCategoryPagination),
    );
  }

  getCategoryPageAll(): Observable<ResponseCategoryPagination> {
    return this.http.get(`${endpoint.Category}/categoryFilter`).pipe(
      map(response => response as ResponseCategoryPagination),
    );
  }

  getCategory(id): Observable<ResponseCategory> {
    return this.http.get<ResponseCategory>(`${endpoint.Category}/${id}`);
  }

  create(categoria: RequestCategory): Observable<RequestCategory> {
    return this.http.post<RequestCategory>(endpoint.Category, categoria, { headers: this.httpHeaders });
  }

  update(categoria: RequestUpdateCategory): Observable<RequestUpdateCategory> {
    return this.http.put<RequestUpdateCategory>(endpoint.Category, categoria, { headers: this.httpHeaders });
  }

  delete(id: string): Observable<RequestUpdateCategory> {
    return this.http.delete<RequestUpdateCategory>(`${endpoint.Category}/${id}`);
  }

}
