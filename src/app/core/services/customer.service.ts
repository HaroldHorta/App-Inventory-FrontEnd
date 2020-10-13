import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { ResponseCustomer } from'../models/Response/customer/ResponseCustomer.module';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<ResponseCustomer[]> {  
    return this.http.get(endpoint.Customer).pipe(
      map(response => response as ResponseCustomer[])
    );
  }

}
