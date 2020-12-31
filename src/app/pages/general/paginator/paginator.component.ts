import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../../../core/services/pagination.service';

@Component({
  selector: 'ngx-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {

  pagination: any[];
  page: number = 0;
  constructor(private paginationService: PaginationService) { }

  ngOnInit(): void {
    this.paginationService.paginatorAdded$.subscribe(data => {
      this.pagination = data;
    });
  }

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 27/12/2020
*Metodo para saber la pagina actual en la cual se encuentra el usuario, o sea la pagina actual del paginador*/
  setPage(i) {
    this.page = i;
    this.paginationService.paginationNumber(this.page);

  }

  /*<i>[fin][]</i>
   *@author [CadenaCristian]
   *@since 27/12/2020*/
}
