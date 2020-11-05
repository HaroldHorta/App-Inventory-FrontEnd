import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseProduct } from '../../../core/models/Response/product/ResponseProduct.module';
import { CartService } from '../../../core/services/cart.service';
import { GeneralService } from '../../../core/services/general.service';
import { OrderService } from '../../../core/services/order.service';

const OFFSET_HEIGHT = 170;
const PRODUCT_HEIGHT = 48;

@Component({
  selector: 'ngx-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  idOrder: string;
  products: ResponseProduct;
  cartTotal = 0;
  changeDetectorRef: ChangeDetectorRef;

  constructor(private cartService: CartService, changeDetectorRef: ChangeDetectorRef, private router: Router,
    private toastrService: GeneralService, private orderService: OrderService) {
    this.changeDetectorRef = changeDetectorRef;
  }

  ngOnInit(): void {
    this.cartService.productAdded$.subscribe(data => {
      this.products = data.products;
      this.cartTotal = data.cartTotal;
      this.changeDetectorRef.detectChanges();
    });

  }
  generaNss() {
    let result = '';
    const characters = 'FPQRSYZbclmwy012456789';
    const charactersLength = characters.length;
    for (let i = 0; i < charactersLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  getRandom(): number {
    return Math.random() * (1 - 100000) + 1;
  }

  deleteProduct(product) {
    this.cartService.deleteProductFromCart(product);

  }

  checkOut(productsF: ResponseProduct, cartTotal) {
    const data = [];
    this.idOrder = this.generaNss();
    data.push({ id: this.idOrder, products: productsF });
    if (cartTotal !== 0) {
      this.orderService.create(JSON.stringify(data[0])).subscribe(c => {
        this.router.navigate(['pages/checkout', this.idOrder]);
      },
        (err) => {
          const type = 'danger';
          const quote = { title: null, body: err.error.detailMessage };
          this.toastrService.showToast(type, quote.title, quote.body);
        });

    } else {

      const type = 'danger';
      const quote = { title: null, body: 'El carrito esta vacio' };
      this.toastrService.showToast(type, quote.title, quote.body);

    }
  }
}
