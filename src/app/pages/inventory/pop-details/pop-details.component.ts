import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResponseCategory } from '../../../core/models/Response/category/ResponseCategory.module';
import { ResponseProduct } from '../../../core/models/Response/product/ResponseProduct.module';
import { CategoryService } from '../../../core/services/category.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'ngx-pop-details',
  templateUrl: './pop-details.component.html',
  styleUrls: ['./pop-details.component.scss']
})
export class PopDetailsComponent implements OnInit {

  product: ResponseProduct[];
  category: ResponseCategory[];
  productDetails:ResponseProduct;
  checkOutForm: FormGroup;
  selectedItem;
  @Input() products: ResponseProduct;

  constructor(private serviceProduct:ProductService, private serviceCategory:CategoryService,
    private formBuilder: FormBuilder) { 
    this.checkOutForm = this.formBuilder.group({
      id: [''],
      name: [''],    
      description: [''],    
      category: [''],    
      status: [''],
      createAt: [''],    
      updateAt: [''],    
      priceBuy: [''],    
      priceSell: [''],    
      unit: [''],    
      photo: ['']    
    });
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.productDetails;
    console.log('ESte es el nombre',this.productDetails);
    this.selectedItem = this.productDetails.category[0].description;
  }

  getProductList(){
    this.serviceProduct.getProducts().subscribe(
      product => {
        this.product = product;
      }
    )
  }

  getCategoryList(){
    this.serviceCategory.getCategories().subscribe(
      category => {
        this.category = category;
      }
    )
  }
}
