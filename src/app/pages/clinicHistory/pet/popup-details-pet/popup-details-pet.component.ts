import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ResponsePet } from '../../../../core/models/Response/pet/ResponsePet';

@Component({
  selector: 'ngx-popup-details-pet',
  templateUrl: './popup-details-pet.component.html',
  styleUrls: ['./popup-details-pet.component.scss']
})
export class PopupDetailsPetComponent implements OnInit {

  pet: ResponsePet;
  constructor(protected ref: NbDialogRef<PopupDetailsPetComponent>) { }

  ngOnInit(): void {
  }

  cancel() {
    this.ref.close();
  }
}
