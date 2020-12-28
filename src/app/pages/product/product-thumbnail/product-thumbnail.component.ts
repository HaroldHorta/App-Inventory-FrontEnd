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
  disableAdd: boolean = false;


  constructor(private serviceProduct: ProductService, private cartService: CartService) { }

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

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 27/12/2020
*Metodo que sirve para agregar producto al carrito de comprar*/
onAddToCart() {
  this.cantidad = 1;
  this.mostrarAgregarCarrito = false;
  this.cartService.addProductToCart(this.product);
  this.diableAdd();
}
/*<i>[fin][]</i>
*@author [CadenaCristian]
*@since 27/12/2020*/

/*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 27/12/2020
*Metodo que sirve para aumentar la cantidad de productos ya agregados en el carrito de comprar*/
aumentar(): number {
  this.cantidad = this.cantidad + 1;
    this.cartService.addProductToCart(this.product);
    this.diableAdd();
    return this.cantidad;
    
  }
  /*<i>[fin][]</i>
  *@author [CadenaCristian]
  *@since 27/12/2020*/
  
  /*<i>[ini][]</i>
  *@author [CadenaCristian]
  *@since 27/12/2020
  *Metodo que sirve para disminuir la cantidad de productos ya agregados en el carrito de comprar*/
 disminuir(): number {
   this.cantidad = this.cantidad - 1;
   this.cartService.deleteProductToCart(this.product);
   this.diableAdd();
   if (this.cantidad === 0) {
     this.mostrarAgregarCarrito = true;
     this.cartService.deleteProductFromCart(this.product);
     return this.cantidad = 1;
    } else {
      return this.cantidad;
    }
  }
  /*<i>[fin][]</i>
  *@author [CadenaCristian]
  *@since 27/12/2020*/
  
  /*<i>[ini][]</i>
  *@author [CadenaCristian]
  *@since 27/12/2020
  *Metodo que sirve para deshabilitar el boton de agregar productos, cuando ya no se tengan existencias
  *disponibles*/
  diableAdd() {
    if (this.cantidad >= this.product.unit) {
      this.disableAdd = true;
    } else {
      this.disableAdd = false;
    }
  }
}
/*<i>[fin][]</i>
*@author [CadenaCristian]
*@since 27/12/2020*/
