import { Injectable } from '@angular/core';
import { ApiBaseService } from '../infraestructure/api/api-base.service';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseCategory } from '../models/Response/category/ResponseCategory.module';
import { RequestCategory } from '../models/Request/category/RequestCategory';
import { RequestUpdateCategory } from '../models/Request/category/RequestUpdateCategory';
import { ResponseCategoryPagination } from '../models/Response/category/ResponseCategoryPagination';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getCategories(): Observable<ResponseCategory[]> {
    return this.http.get(endpoint.category).pipe(
      map(response => response as ResponseCategory[]),
    );
  }

  getCategoryPage(page): Observable<ResponseCategoryPagination> {
    return this.http.get(`${endpoint.category}/page/?page=${page}`).pipe(
      map(response => response as ResponseCategoryPagination),
    );
  }

  getCategoryPageAll(): Observable<ResponseCategoryPagination> {
    return this.http.get(`${endpoint.category}/categoryFilter`).pipe(
      map(response => response as ResponseCategoryPagination),
    );
  }

  getCategory(id): Observable<ResponseCategory> {
    return this.http.get<ResponseCategory>(`${endpoint.category}/${id}`);
  }

  create(categoria: RequestCategory): Observable<RequestCategory> {
    return this.http.post<RequestCategory>(endpoint.category, categoria, { headers: this.httpHeaders });
  }

  update(categoria: RequestUpdateCategory): Observable<RequestUpdateCategory> {
    return this.http.put<RequestUpdateCategory>(endpoint.category, categoria, { headers: this.httpHeaders });
  }

  delete(id: string): Observable<RequestUpdateCategory> {
    return this.http.delete<RequestUpdateCategory>(`${endpoint.category}/${id}`);
  }

}
