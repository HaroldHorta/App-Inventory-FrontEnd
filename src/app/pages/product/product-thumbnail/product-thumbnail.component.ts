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

  agregarOdisminuir: boolean = true;
  cantidad: number = 0;
  mostrarAgregarCarrito: boolean;
  detailViewActive: boolean;

  constructor(private serviceProduct: ProductService, private cartService: CartService) { }

  products: ResponseProduct[];
  errores: string[];

  ngOnInit(): void {
    if (this.cantidad === 0) {
      this.mostrarAgregarCarrito = true;
    } else {
      this.mostrarAgregarCarrito = false;
    }
  }

  onProductClick() {
    this.detailViewActive = !this.detailViewActive;
  }

  onAddToCart() {
    this.mostrarAgregarCarrito = false;
    this.cartService.addProductToCart(this.product, this.agregarOdisminuir, this.cantidad);
  }


  aumentar(): number {
    this.cantidad = this.cantidad++;
    this.cartService.addProductToCart(this.product, this.agregarOdisminuir, this.cantidad);
    return this.cantidad;

  }

  disminuir(): number {
    this.cantidad = this.cantidad--;
    this.agregarOdisminuir = false;
    this.cartService.addProductToCart(this.product, this.agregarOdisminuir, this.cantidad);

    if (this.cantidad === 0) {
      this.mostrarAgregarCarrito = true;
      return this.cantidad = 0;

    } else {

      return this.cantidad;
    }
  }
}
