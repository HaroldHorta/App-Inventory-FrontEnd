import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { RequestAddVeterinary } from '../models/Request/veterinary/RequestAddVeterinary';
import { ResponseVeterinary } from '../models/Response/veterinary/ResponseVeterinary';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getVeterinary(): Observable<ResponseVeterinary[]> {
    return this.http.get(endpoint.Veterinary).pipe(
      map(response => response as ResponseVeterinary[]),
    );
  }

  getVeterinaryById(id): Observable<ResponseVeterinary> {
    return this.http.get<ResponseVeterinary>(`${endpoint.Veterinary}/${id}`);
  }

  getVeterinaryByprofessionalCard(professionalCard:string): Observable<ResponseVeterinary> {
    return this.http.get<ResponseVeterinary>(`${endpoint.Veterinary}/professionalCard/${professionalCard}`);
  }
  
  create(veterinary: RequestAddVeterinary): Observable<RequestAddVeterinary> {
    return this.http.post<RequestAddVeterinary>(endpoint.Veterinary, veterinary, { headers: this.httpHeaders });
  }

  delete(id: string): Observable<RequestAddVeterinary> {
    return this.http.delete<RequestAddVeterinary>(`${endpoint.Veterinary}/${id}`);
  }

}
