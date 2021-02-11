import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { ResponsePet } from '../models/Response/pet/ResponsePet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getByCustomer(nroDocument): Observable<ResponsePet[]> {
    return this.http.get<ResponsePet[]>(`${endpoint.Pet}/customer/${nroDocument}`);

  }

}
