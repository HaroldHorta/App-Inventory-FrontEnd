import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: any[] = [];
  cartTotal = 0;

  private productAddedSource = new Subject<any>();


  productAdded$ = this.productAddedSource.asObservable();
  constructor() { }

  addProductToCart(product) {
    // tslint:disable-next-line:no-console
    let exists = false;
    this.cartTotal += product.priceSell;
    // Search this product on the cart and increment the unit
    this.products = this.products.map(_product => {
      if (_product.product.id === product.id) {
        _product.unit++;
        exists = true;
      }
      return _product;
    });
    // Add a new product to the cart if it's a new product
    if (!exists) {
      this.products.push({
        product: product,
        unit: 1,
      });
    }
    this.productAddedSource.next({ products: this.products, cartTotal: this.cartTotal });
  }

  deleteProductToCart(product) {
    let exists = false;
    this.cartTotal -= product.priceSell;
    // Search this product on the cart and increment the unit
    this.products = this.products.map(_product => {
      if (_product.product.id === product.id) {
        _product.unit--;
        exists = true;
      }
      return _product;
    });
    this.productAddedSource.next({ products: this.products, cartTotal: this.cartTotal });
  }


  deleteProductFromCart(product) {

    this.products = this.products.filter(_product => {
      if (_product.product.id === product.id) {
        this.cartTotal = 0;
        return false;
      }
      return true;
    });
    this.productAddedSource.next({ products: this.products, cartTotal: this.cartTotal });
  }

  flushCart() {
    this.products = [];
    this.cartTotal = 0;
    this.productAddedSource.next({ products: this.products, cartTotal: this.cartTotal });
  }
}
