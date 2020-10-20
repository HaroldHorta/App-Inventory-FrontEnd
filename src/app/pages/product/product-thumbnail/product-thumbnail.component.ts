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

  @Input() existencias: ResponseProduct;
  @Input() product: ResponseProduct;

  cantidad: number;
  mostrarAgregarCarrito: boolean;
  detailViewActive: boolean;

  constructor(private serviceProduct: ProductService, private cartService: CartService) { }

  products: ResponseProduct[];
  errores: string[];

  ngOnInit(): void {
    if (this.cantidad >= 1) {
      this.mostrarAgregarCarrito = false;
    } else {
      this.mostrarAgregarCarrito = true;
    }
  }

  onProductClick() {
    this.detailViewActive = !this.detailViewActive;
  }

  onAddToCart() {
    this.cantidad = 1;
    this.mostrarAgregarCarrito = false;
    this.cartService.addProductToCart(this.product);
  }


  aumentar(): number {
    this.cantidad = this.cantidad + 1;
    this.cartService.addProductToCart(this.product);
    return this.cantidad;

  }

  disminuir(): number {
    this.cantidad = this.cantidad - 1;
    this.cartService.deleteProductToCart(this.product);

    if (this.cantidad === 0) {
      this.mostrarAgregarCarrito = true;
      this.cartService.deleteProductFromCart(this.product);
      return this.cantidad = 1;
    } else {
      return this.cantidad;
    }
  }
}
