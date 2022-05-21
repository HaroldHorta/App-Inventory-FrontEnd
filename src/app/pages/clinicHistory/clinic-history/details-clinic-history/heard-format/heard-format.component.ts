import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-heard-format',
  templateUrl: './heard-format.component.html',
  styleUrls: ['./heard-format.component.scss']
})
export class HeardFormatComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {

  }

  // Informacion de la empresa
  nit = 'NIT. 1075280901-5';
  nombre = 'Equi - Dog MV';
  leyenda = 'Medicina Veterinaria';
  telefono = '314 6058829 - 311 2578070';
  direccion = 'Bonanza manzana 22 lote 5';
  dateDay = new Date();
}
