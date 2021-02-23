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
    return this.http.get(endpoint.Breed).pipe(
      map(response => response as ResponseBreed[]),
    );
  }

  getBreedPage(page): Observable<ResponseBreedPagination> {
    return this.http.get(`${endpoint.Breed}/page/?page=${page}`).pipe(
      map(response => response as ResponseBreedPagination),
    );
  }

  getBreedPageAll(): Observable<ResponseBreedPagination> {
    return this.http.get(`${endpoint.Breed}/breedFilter`).pipe(
      map(response => response as ResponseBreedPagination),
    );
  }

  getBreedById(id): Observable<ResponseBreed> {
    return this.http.get<ResponseBreed>(`${endpoint.Breed}/${id}`);
  }

  create(breed: RequestBreed): Observable<RequestBreed> {
    return this.http.post<RequestBreed>(endpoint.Breed, breed, { headers: this.httpHeaders });
  }

  update(breed: RequestUpdateBreed): Observable<RequestUpdateBreed> {
    return this.http.put<RequestUpdateBreed>(endpoint.Breed, breed, { headers: this.httpHeaders });
  }

  delete(id: string): Observable<RequestUpdateBreed> {
    return this.http.delete<RequestUpdateBreed>(`${endpoint.Breed}/${id}`);
  }

}
