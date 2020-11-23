import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { RequestUpdateUnit } from '../models/Request/product/RequestUpdateUnit';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  update(requestUpdateUnit:RequestUpdateUnit):Observable<RequestUpdateUnit>{
    return this.http.patch<RequestUpdateUnit>(`${endpoint.Units}/unit`, requestUpdateUnit, { headers: this.httpHeaders });
  }
}
