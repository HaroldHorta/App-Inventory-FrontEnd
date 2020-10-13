import { Component, Input, OnInit } from '@angular/core';
import { ResponseProduct } from '../../../core/models/Response/product/ResponseProduct.module';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'ngx-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.scss'],
})
export class ProductThumbnailComponent implements OnInit {

  @Input() product: ResponseProduct;

  detailViewActive: boolean;

  constructor(private serviceProduct: ProductService, private cartService: CartService) { }

  products: ResponseProduct[];
  errores: string[];

  ngOnInit(): void {
  }

  onProductClick() {
    this.detailViewActive = !this.detailViewActive;
  }


  onAddToCart() {
    this.cartService.addProductToCart(this.product);
  }

}
