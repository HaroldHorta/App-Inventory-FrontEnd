import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { ResponseCustomer } from '../models/Response/customer/ResponseCustomer.module';
import { RequestCustomer } from '../models/Request/customer/RequestCustomer';
import { RequestUpdateCustomer } from '../models/Request/customer/RequestUpdateCustomer';
import { ResponseCustomerPagination } from '../models/Response/customer/ResponseCustomerPagination';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<ResponseCustomer[]> {
    return this.http.get(endpoint.customer).pipe(
      map(response => response as ResponseCustomer[]),
    );
  }

  getCustomerPageAll(): Observable<ResponseCustomerPagination> {
    return this.http.get(`${endpoint.customer}/customerFilter`).pipe(
      map(response => response as ResponseCustomerPagination),
    );
  }

  getCustomerPage(page): Observable<ResponseCustomerPagination> {
    return this.http.get(`${endpoint.customer}/page/?page=${page}`).pipe(
      map(response => response as ResponseCustomerPagination),
    );
  }

  findCustomerById(id: string): Observable<ResponseCustomer> {
    return this.http.get<ResponseCustomer>(`${endpoint.customer}/${id}`);
  }
  findCustomerByNroDocument(nroDocument: string): Observable<ResponseCustomer> {
    return this.http.get<ResponseCustomer>(`${endpoint.customer}/nroDocument/${nroDocument}`);
  }

  create(customer): Observable<RequestCustomer> {
    return this.http.post<RequestCustomer>(endpoint.customer, customer, { headers: this.httpHeaders });
  }

  update(id, customer): Observable<RequestUpdateCustomer> {
    return this.http.put<RequestUpdateCustomer>(`${endpoint.customer}/update/${id}`, customer, { headers: this.httpHeaders });
  }

  delete(id: string): Observable<RequestUpdateCustomer> {
    return this.http.delete<RequestUpdateCustomer>(`${endpoint.customer}/${id}`);
  }
}
