import { Injectable } from '@angular/core';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { Observable } from'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseTicket } from '../models/Response/ticket/ResponseTicket.module';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient) { }

  getTickets(): Observable<ResponseTicket[]>{
    return this.http.get(endpoint.Ticket).pipe(
      map(response => response as ResponseTicket[])
    );
  }
}
