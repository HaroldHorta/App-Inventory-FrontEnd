import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { RequestAddClinicExam } from '../models/Request/examclinic/RequestAddClinicExam';
import { ResponseClinicExam } from '../models/Response/examclinic/ResponseClinicExam';

@Injectable({
  providedIn: 'root'
})
export class ExamClinicService {

  
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }
  
  getClinicExam(): Observable<ResponseClinicExam[]> {
    return this.http.get(endpoint.ClinicExam).pipe(
      map(response => response as ResponseClinicExam[]),
    );
  }

  getClinicExamById(id): Observable<ResponseClinicExam> {
    return this.http.get<ResponseClinicExam>(`${endpoint.ClinicExam}/${id}`);
  }

  create(exam: RequestAddClinicExam): Observable<RequestAddClinicExam> {
    return this.http.post<RequestAddClinicExam>(endpoint.ClinicExam, exam, { headers: this.httpHeaders });
  }

  delete(id: string): Observable<RequestAddClinicExam> {
    return this.http.delete<RequestAddClinicExam>(`${endpoint.ClinicExam}/${id}`);
  }

}
