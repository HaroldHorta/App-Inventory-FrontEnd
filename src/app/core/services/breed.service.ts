import { Injectable } from '@angular/core';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseBreed } from '../models/Response/breed/ResponseBreed';
import { ResponseBreedPagination } from '../models/Response/breed/ResponseBreedPagination';
import { RequestBreed } from '../models/Request/breed/RequestBreed';
import { RequestUpdateBreed } from '../models/Request/breed/RequestUpdateBreed';



@Injectable({
  providedIn: 'root',
})
export class BreedService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getBreed(): Observable<ResponseBreed[]> {
    return this.http.get(endpoint.breed).pipe(
      map(response => response as ResponseBreed[]),
    );
  }

  getBreedPage(page): Observable<ResponseBreedPagination> {
    return this.http.get(`${endpoint.breed}/page/?page=${page}`).pipe(
      map(response => response as ResponseBreedPagination),
    );
  }

  getBreedPageAll(): Observable<ResponseBreedPagination> {
    return this.http.get(`${endpoint.breed}/breedFilter`).pipe(
      map(response => response as ResponseBreedPagination),
    );
  }

  getBreedById(id): Observable<ResponseBreed> {
    return this.http.get<ResponseBreed>(`${endpoint.breed}/${id}`);
  }

  create(breed: RequestBreed): Observable<RequestBreed> {
    return this.http.post<RequestBreed>(endpoint.breed, breed, { headers: this.httpHeaders });
  }

  update(breed: RequestUpdateBreed): Observable<RequestUpdateBreed> {
    return this.http.put<RequestUpdateBreed>(endpoint.breed, breed, { headers: this.httpHeaders });
  }

  delete(id: string): Observable<RequestUpdateBreed> {
    return this.http.delete<RequestUpdateBreed>(`${endpoint.breed}/${id}`);
  }

}
