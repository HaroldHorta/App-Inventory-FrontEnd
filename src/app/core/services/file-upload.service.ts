import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { FileInfo } from '../models/Request/base/FileInfo.module';


@Injectable({
  providedIn: 'root',
})
export class FileUploadService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  create(fileInfo): Observable<FileInfo> {
    return this.http.post<FileInfo>(endpoint.productoWhitPhoto, fileInfo, { headers: this.httpHeaders });
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    const req = new HttpRequest('POST', `${endpoint.productPhoto}/upload`, formData, {
      responseType: 'json',
    });

    return this.http.request(req);
  }
}
