import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-pop-update-image',
  templateUrl: './pop-update-image.component.html',
  styleUrls: ['./pop-update-image.component.scss']
})
export class PopUpdateImageComponent implements OnInit {

  photo: string;
  constructor() { }

  ngOnInit(): void {
  }


}
