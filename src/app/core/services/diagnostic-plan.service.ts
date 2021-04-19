import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { RequestDiagnosticPlan } from '../models/Request/diagnosticplan/RequestDiagnosticPlan';
import { ResponseDiagnosticPlan } from '../models/Response/diagnosticplan/ResponseDiagnosticPlan';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticPlanService {



  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getDiagnosticPlan(): Observable<ResponseDiagnosticPlan[]> {
    return this.http.get(endpoint.diagnosticPlan).pipe(
      map(response => response as ResponseDiagnosticPlan[]),
    );
  }

  getDiagnosticPlanById(id): Observable<ResponseDiagnosticPlan> {
    return this.http.get<ResponseDiagnosticPlan>(`${endpoint.diagnosticPlan}/${id}`);
  }

  create(exam: RequestDiagnosticPlan): Observable<RequestDiagnosticPlan> {
    return this.http.post<RequestDiagnosticPlan>(endpoint.diagnosticPlan, exam, { headers: this.httpHeaders });
  }

  delete(id: string): Observable<RequestDiagnosticPlan> {
    return this.http.delete<RequestDiagnosticPlan>(`${endpoint.diagnosticPlan}/${id}`);
  }

}
