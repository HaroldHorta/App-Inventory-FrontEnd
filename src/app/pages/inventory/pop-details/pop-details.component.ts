import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ResponseCategory } from '../../../core/models/Response/category/ResponseCategory.module';
import { ResponseProduct } from '../../../core/models/Response/product/ResponseProduct.module';
import { CategoryService } from '../../../core/services/category.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'ngx-pop-details',
  templateUrl: './pop-details.component.html',
  styleUrls: ['./pop-details.component.scss'],
})
export class PopDetailsComponent implements OnInit {

  product: ResponseProduct[];
  category: ResponseCategory[];
  productDetails: ResponseProduct;
  idProduct: string;
  checkOutForm: FormGroup;
  selectedItem;
  @Input() products: ResponseProduct;

  constructor(private serviceProduct: ProductService, private serviceCategory: CategoryService,
    protected ref: NbDialogRef<PopDetailsComponent>,
  ) {

  }

  ngOnInit(): void {
    this.getCategoryList();
    this.idProduct;
    this.getProductById(this.idProduct);

  }

  getProductById(id) {
    this.serviceProduct.getProductByid(id).subscribe(
      product => {
        this.productDetails = product;
      });
  }
  cancel() {
    this.ref.close();
  }

  getCategoryList() {
    this.serviceCategory.getCategories().subscribe(
      category => {
        this.category = category;
      });
  }
}
