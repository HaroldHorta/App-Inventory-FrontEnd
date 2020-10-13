import { Component, Input, OnInit } from '@angular/core';
import { ResponseProduct } from '../../../core/models/Response/product/ResponseProduct.module';

@Component({
  selector: 'ngx-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent implements OnInit {

  @Input() products: ResponseProduct[];

  constructor() { }

  ngOnInit(): void {
  }

}
