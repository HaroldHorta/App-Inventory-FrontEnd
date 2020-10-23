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

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private toastrService: NbToastrService) { }

  getCategories(): Observable<ResponseCategory[]> {
    return this.http.get(endpoint.Category).pipe(
      map(response => response as ResponseCategory[]),
    );
  }

  getCategory(id): Observable<ResponseCategory> {
    return this.http.get<ResponseCategory>(`${endpoint.Category}/${id}`);
  }

  create(category: RequestCategory): Observable<RequestCategory> {
    return this.http.post<RequestCategory>(endpoint.Category, category, { headers: this.httpHeaders });
  }

  update(category: RequestUpdateCategory): Observable<RequestUpdateCategory> {
    return this.http.put<RequestUpdateCategory>(endpoint.Category, category, { headers: this.httpHeaders });
  }

  delete(id: string): Observable<RequestUpdateCategory> {
    return this.http.delete<RequestUpdateCategory>(`${endpoint.Category}/${id}`);
  }

  showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';

    this.toastrService.show(
      body,
      `Alerta ${titleContent}`,
      config);
  }

}
