import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { RequestAddClinicHistoryDTO } from '../models/Request/clinichistory/RequestAddClinicHistoryDTO';
import { RequestDiagnosticPlanCLinicHistory } from '../models/Request/clinichistory/RequestDiagnosticPlanCLinicHistory';
import { RequestTherapeuticPlan } from '../models/Request/clinichistory/RequestTherapeuticPlan';
import { ResultClinic } from '../models/Request/clinichistory/ResultClinic';
import { ResponseClinicHistoryDTO } from '../models/Response/clinichistory/ResponseClinicHistoryDTO';

@Injectable({
  providedIn: 'root'
})
export class ClinicHistoryService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }


  getById(id): Observable<ResponseClinicHistoryDTO> {
    return this.http.get<ResponseClinicHistoryDTO>(`${endpoint.ClinicHistory}/${id}`);
  }

  getByCustomer(id): Observable<ResponseClinicHistoryDTO[]> {
    return this.http.get<ResponseClinicHistoryDTO[]>(`${endpoint.ClinicHistory}/customer/${id}`);
  }


  create(clinicHistory: RequestAddClinicHistoryDTO): Observable<ResponseClinicHistoryDTO> {
    return this.http.post<ResponseClinicHistoryDTO>(endpoint.ClinicHistory, clinicHistory, { headers: this.httpHeaders });
  }

  updateDiagnosticPlan(id: string, diagnosticplan: RequestDiagnosticPlanCLinicHistory): Observable<ResponseClinicHistoryDTO> {
    return this.http.patch<ResponseClinicHistoryDTO>(`${endpoint.ClinicHistory}/diagnosticPlan/${id}`, diagnosticplan, { headers: this.httpHeaders });
  }

  updateResult(id: string, resultClinic: ResultClinic): Observable<ResponseClinicHistoryDTO> {
    return this.http.patch<ResponseClinicHistoryDTO>(`${endpoint.ClinicHistory}/resultClinic/${id}`, resultClinic, { headers: this.httpHeaders });
  }

  updateTherapeuticPlan(id: string, therapeuticPlan: RequestTherapeuticPlan): Observable<ResponseClinicHistoryDTO> {
    return this.http.patch<ResponseClinicHistoryDTO>(`${endpoint.ClinicHistory}/therapeuticPlan/${id}`, therapeuticPlan, { headers: this.httpHeaders });
  }
}
