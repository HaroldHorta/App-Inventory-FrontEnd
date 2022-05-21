import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { RequestUpdateVaccination } from '../models/Request/vaccination/RequestUpdateVaccination';
import { RequestVaccination } from '../models/Request/vaccination/RequestVaccination';
import { ResponseVaccinations } from '../models/Response/vaccination/ResponseVaccinations';
import { Vaccination } from '../models/Response/vaccination/vaccination';

@Injectable({
  providedIn: 'root',
})
export class VaccinationService {


  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getVaccionation(): Observable<Vaccination[]> {
    return this.http.get(endpoint.vaccinations).pipe(
      map(response => response as Vaccination[]),
    );
  }

  getVaccionationById(id): Observable<Vaccination> {
    return this.http.get<Vaccination>(`${endpoint.vaccinations}/${id}`);
  }

  create(vaccinations: RequestVaccination): Observable<RequestVaccination> {
    return this.http.post<RequestVaccination>(endpoint.vaccinations, vaccinations, { headers: this.httpHeaders });
  }

  update(vaccinations: RequestUpdateVaccination): Observable<RequestUpdateVaccination> {
    return this.http.put<RequestUpdateVaccination>(endpoint.vaccinations, vaccinations, { headers: this.httpHeaders });
  }

  delete(id: string): Observable<RequestUpdateVaccination> {
    return this.http.delete<RequestUpdateVaccination>(`${endpoint.vaccinations}/${id}`);
  }

}
