import { Injectable } from '@angular/core';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseTicket } from '../models/Response/ticket/ResponseTicket.module';
import { RequestAddTicket } from '../models/Request/ticket/RequestAddTicket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getTickets(): Observable<ResponseTicket[]> {
    return this.http.get(endpoint.ticket).pipe(
      map(response => response as ResponseTicket[]),
    );
  }

  getTicketById(id): Observable<ResponseTicket> {
    return this.http.get<ResponseTicket>(`${endpoint.ticket}/${id}`);
  }

  getTicketByNroDocument(nroDocument): Observable<ResponseTicket[]> {
    return this.http.get<ResponseTicket[]>(`${endpoint.ticket}/nroDocument/${nroDocument}`);
  }

  create(ticket): Observable<RequestAddTicket> {
    return this.http.post<RequestAddTicket>(endpoint.ticket, ticket, { headers: this.httpHeaders });
  }

  creditCapital(id, creditCapital, creditPayment): Observable<ResponseTicket> {
    return this.http.patch<ResponseTicket>(`${endpoint.ticket}/${id}/${creditCapital}/${creditPayment}`, { headers: this.httpHeaders });
  }
}
