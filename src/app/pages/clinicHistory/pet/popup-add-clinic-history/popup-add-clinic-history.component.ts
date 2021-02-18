import { Component, OnInit } from '@angular/core';
import { ResponsePet } from '../../../../core/models/Response/pet/ResponsePet';

@Component({
  selector: 'ngx-popup-add-clinic-history',
  templateUrl: './popup-add-clinic-history.component.html',
  styleUrls: ['./popup-add-clinic-history.component.scss']
})
export class PopupAddClinicHistoryComponent implements OnInit {

  pet: ResponsePet = new ResponsePet;

  constructor() { }

  ngOnInit(): void {
  }

}
