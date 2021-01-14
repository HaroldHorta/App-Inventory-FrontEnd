import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PaginationService {

  private paginatorAddedSource = new Subject<any>();
  private paginatorNumberSource = new Subject<any>();
  paginatorAdded$ = this.paginatorAddedSource.asObservable();
  paginatornumber$ = this.paginatorNumberSource.asObservable();
  pagination: any[] = [];
  numberPag: any[] = [];
  cantidadTotalData;
  constructor() { }

  paginationCount(cantidad, cantidadTotalData) {
    this.cantidadTotalData = cantidadTotalData;
    const numeroPaginas = Math.ceil(cantidad.count / 10);
    this.pagination = [];
    for (let i = 1; i <= numeroPaginas; i++) {
      this.pagination.push(i);
    }
    this.paginatorAddedSource.next({ pag: this.pagination, cant: this.cantidadTotalData });
  }

  paginationNumber(pag) {
    this.numberPag = pag;
    this.paginatorNumberSource.next(this.numberPag);
  }
}
