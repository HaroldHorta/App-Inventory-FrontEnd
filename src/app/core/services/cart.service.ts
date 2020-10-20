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
    console.log('llega al cart service');
    let exists = false;
    const parsedPrice = product.priceSell;
    this.cartTotal += parsedPrice;
    // Search this product on the cart and increment the quantity
    this.products = this.products.map(_product => {
      if (_product.product.id === product.id) {
        _product.quantity++;
        exists = true;
      }
      return _product;
    });
    // Add a new product to the cart if it's a new product
    if (!exists) {
      product.parsedPrice = parsedPrice;
      this.products.push({
        product: product,
        quantity: 1,
      });
    }
    this.productAddedSource.next({ products: this.products, cartTotal: this.cartTotal });
  }

  deleteProductToCart(product) {
    // tslint:disable-next-line:no-console
    console.log('llega al cart service');
    let exists = false;
    const parsedPrice = product.priceSell;
    this.cartTotal -= parsedPrice;
    // Search this product on the cart and increment the quantity
    this.products = this.products.map(_product => {
      if (_product.product.id === product.id) {
        _product.quantity--;
        exists = true;
      }
      return _product;
    });
    this.productAddedSource.next({ products: this.products, cartTotal: this.cartTotal });
  }


  deleteProductFromCart(product) {

    this.products = this.products.filter(_product => {
      if (_product.product.id === product.id) {
        this.cartTotal -= _product.product.parsedPrice * _product.quantity;
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
