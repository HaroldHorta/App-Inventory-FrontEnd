import { Component, OnInit } from '@angular/core';
import { ResponseBreed } from '../../../../core/models/Response/breed/ResponseBreed';

@Component({
  selector: 'ngx-popup-add-breed',
  templateUrl: './popup-add-breed.component.html',
  styleUrls: ['./popup-add-breed.component.scss']
})
export class PopupAddBreedComponent implements OnInit {

  breedEdit: ResponseBreed;

  constructor() { }

  ngOnInit(): void {
  }

}
