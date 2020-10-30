import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { NbWindowRef } from '@nebular/theme';
import { RequestAddProduct } from '../../../core/models/Request/product/RequestAddProduct';
import { ResponseCategory } from '../../../core/models/Response/category/ResponseCategory.module';
import { ResponseProduct } from '../../../core/models/Response/product/ResponseProduct.module';
import { CategoryService } from '../../../core/services/category.service';
import { GeneralService } from '../../../core/services/general.service';
import { InventoryService } from '../../../core/services/inventory.service';
import { ProductService } from '../../../core/services/product.service';
import { InventoryComponent } from '../inventory.component';

@Component({
  selector: 'ngx-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements OnInit {

  @Input() productEdit;
  product: ResponseProduct;
  categoria: ResponseCategory[];
  checkOutForm: FormGroup;
  checkOutCategory: FormGroup;

  constructor(private generalService:GeneralService, protected ref: NbDialogRef<PopupComponent>, 
    private serviceCategory: CategoryService, private formBuilder: FormBuilder, private productService: ProductService) {
    this.checkOutForm = this.formBuilder.group({
      name: '',
      description: '',
      categoryId: '',
      priceBuy: '',
      priceSell: '',
      unit: '',
    })
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this.serviceCategory.getCategories().subscribe(
      categorias => {
        this.categoria = categorias;
      },
    );
  }

  cancel(){
    this.ref.close();
  }

  addProduct(product) {
    const data = [];
    data.push({ id: product.categoryId.id, description: product.categoryId.description });
    product.categoryId = data;
    console.log('Esta es la variable que recibe', product);

    this.productService.create(JSON.stringify(product)).subscribe(
      newProduct => {
        const type = 'success';
        const quote = { title:null, body: 'Producto agregado correctamente' };
        this.generalService.showToast(type, quote.title, quote.body);
        this.ref.close(product);
      }
    )
  }

}
