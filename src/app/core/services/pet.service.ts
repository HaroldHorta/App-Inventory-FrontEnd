import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from '../infraestructure/endpoint/endpoint';
import { ReproductiveStatus } from '../models/enum/reproductiveStatus';
import { RequestFeeding } from '../models/Request/feeding/RequestFeeding';
import { RequestHabitat } from '../models/Request/habitat/RequestHabitat';
import { RequestPatientHistoryDeworming } from '../models/Request/pet/deworming/RequestPatientHistoryDeworming';
import { RequestPet } from '../models/Request/pet/RequestPet';
import { RequestPatientHistoryVaccinations } from '../models/Request/pet/vaccination/RequestPatientHistoryVaccinations';
import { RequestReproductiveStatus } from '../models/Request/pet/reproductiveStatus/RequestReproductiveStatus';
import { ResponsePet } from '../models/Response/pet/ResponsePet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getByCustomer(nroDocument): Observable<ResponsePet[]> {
    return this.http.get<ResponsePet[]>(`${endpoint.Pet}/customer/${nroDocument}`);
  }

  getById(id: string): Observable<ResponsePet> {
    return this.http.get<ResponsePet>(`${endpoint.Pet}/${id}`);
  }

  create(pet: RequestPet): Observable<RequestPet> {
    return this.http.post<RequestPet>(endpoint.Pet, pet, { headers: this.httpHeaders });
  }

  updateVaccionation(id: string, pet: RequestPatientHistoryVaccinations): Observable<RequestPatientHistoryVaccinations> {
    return this.http.patch<RequestPatientHistoryVaccinations>(`${endpoint.Pet}/vaccination/${id}`, pet, { headers: this.httpHeaders });
  }


  updateDewormingInternal(id: string, pet: RequestPatientHistoryDeworming): Observable<RequestPatientHistoryDeworming> {
    return this.http.patch<RequestPatientHistoryDeworming>(`${endpoint.Pet}/dewormingInternal/${id}`, pet, { headers: this.httpHeaders });
  }

  updateDewormingExternal(id: string, pet: RequestPatientHistoryDeworming): Observable<RequestPatientHistoryDeworming> {
    return this.http.patch<RequestPatientHistoryDeworming>(`${endpoint.Pet}/dewormingExternal/${id}`, pet, { headers: this.httpHeaders });
  }

  updateFeeding(id: string, pet: RequestFeeding): Observable<ResponsePet> {
    return this.http.patch<ResponsePet>(`${endpoint.Pet}/feeding/${id}`, pet, { headers: this.httpHeaders });
  }

  updateHabitat(id: string, pet: RequestHabitat): Observable<ResponsePet> {
    return this.http.patch<ResponsePet>(`${endpoint.Pet}/habitat/${id}`, pet, { headers: this.httpHeaders });
  }
  
  updateReproductiveStatus(id: string, reproductiveStatus: RequestReproductiveStatus): Observable<ResponsePet> {
    return this.http.patch<ResponsePet>(`${endpoint.Pet}/reproductiveStatus/${id}`, reproductiveStatus, { headers: this.httpHeaders });
  }

  updateAllergy(id: string, description:string): Observable<ResponsePet> {
    return this.http.patch<ResponsePet>(`${endpoint.Pet}/allergy/${id}`, description, { headers: this.httpHeaders });
  }

  updatePreviousIllnesses(id: string, description:string): Observable<ResponsePet> {
    return this.http.patch<ResponsePet>(`${endpoint.Pet}/previousIllnesses/${id}`, description, { headers: this.httpHeaders });
  }

  updateSurgeries(id: string, description:string): Observable<ResponsePet> {
    return this.http.patch<ResponsePet>(`${endpoint.Pet}/surgeries/${id}`, description, { headers: this.httpHeaders });
  }

  updateFamilyBackground(id: string, description:string): Observable<ResponsePet> {
    return this.http.patch<ResponsePet>(`${endpoint.Pet}/familyBackground/${id}`, description, { headers: this.httpHeaders });
  }
}
