import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-header-ticket',
  templateUrl: './header-ticket.component.html',
  styleUrls: ['./header-ticket.component.scss'],
})
export class HeaderTicketComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    // Informacion de la empresa
    nit = 'NIT. 1075280901-5';
    nombre = 'Equi - Dog MV';
    leyenda = 'Medicina Veterinaria';
    telefono = '314 6058829 - 311 2578070';
    direccion = 'Bonanza manzana 22 lote 5';

}
