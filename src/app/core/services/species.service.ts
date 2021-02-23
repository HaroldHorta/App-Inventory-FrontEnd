import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { RequestSpecies } from '../models/Request/species/RequestSpecies';
import { RequestUpdateSpecies } from '../models/Request/species/RequestUpdateSpecies';
import { ResponseSpecies } from '../models/Response/species/ResponseSpecies';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getSpecies(): Observable<ResponseSpecies[]> {
    return this.http.get(endpoint.Species).pipe(
      map(response => response as ResponseSpecies[]),
    );
  }

  getSpeciesById(id): Observable<ResponseSpecies> {
    return this.http.get<ResponseSpecies>(`${endpoint.Species}/${id}`);
  }

  create(species: RequestSpecies): Observable<RequestSpecies> {
    return this.http.post<RequestSpecies>(endpoint.Species, species, { headers: this.httpHeaders });
  }

  update(species: RequestUpdateSpecies): Observable<RequestUpdateSpecies> {
    return this.http.put<RequestUpdateSpecies>(endpoint.Species, species, { headers: this.httpHeaders });
  }

  delete(id: string): Observable<RequestUpdateSpecies> {
    return this.http.delete<RequestUpdateSpecies>(`${endpoint.Species}/${id}`);
  }
}
