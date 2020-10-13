import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpHeaderResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { error } from 'console';


@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {

  constructor(protected _http: HttpClient) { }

  private formatErrors(error: any) {
    return throwError(error.error)
  }

  public get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this._http.get<any>(path, { params })
      .pipe(catchError(this.formatErrors));
  }

  public post(endpoint: string, payload = {}): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    return this._http.post(endpoint, payload, { headers });
  }
  
  public put(endpoint: string, payload = {}): Observable<any> {
    return this._http.put(endpoint, payload);
  }

  public delete(endpoint: string, payload = {}): Observable<any> {
    return this._http.delete(endpoint, payload);
  }

  public patch(endpoint: string, payload = {}): Observable<any> {
    return this._http.patch(endpoint, payload);
  }
}