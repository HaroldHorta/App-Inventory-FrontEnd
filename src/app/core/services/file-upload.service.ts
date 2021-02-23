import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { FileInfo } from '../models/Request/base/FileInfo.module';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  create(fileInfo): Observable<FileInfo> {
    return this.http.post<FileInfo>(endpoint.ProductoWhitPhoto, fileInfo, { headers: this.httpHeaders });
  }
}
