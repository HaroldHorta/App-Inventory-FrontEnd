import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ResponseCategory } from '../../../core/models/Response/category/ResponseCategory.module';
import { ResponseProduct } from '../../../core/models/Response/product/ResponseProduct.module';
import { CategoryService } from '../../../core/services/category.service';
import { GeneralService } from '../../../core/services/general.service';
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
    private generalService: GeneralService,
    protected ref: NbDialogRef<PopDetailsComponent>,
  ) {

  }

  ngOnInit(): void {
    this.getCategoryList();
    this.idProduct;
    this.getProductById(this.idProduct);

  }

  /*<i>[ini][]</i>
 *@author [CadenaCristian]
 *@since 24/12/2020
 *Este metodo recibe un ID que se envia desde el inventory.component.ts el cual permite usar el sevicio getProductByid, el cual permite
 listar por el ID deseado */
  getProductById(id) {
    this.serviceProduct.getProductByid(id).subscribe(
      product => {
        this.productDetails = product;
      },
      (err) => {
        const type = 'danger';
        const quote = {title: null, body: err.error.detailMessage};
        this.generalService.showToast(type, quote.title, quote.body);
        this.cancel();
      });
  }
  /*<i>[fin][]</i>
*@author [CadenaCristian]
*@since 24/12/2020*/

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 24/12/2020
*Este metodo permite llamar el metodo close del componente NbDialogRef, el cual se usas para cerrar los pop us*/
  cancel() {
    this.ref.close();
  }
  /*<i>[fin][]</i>
*@author [CadenaCristian]
*@since 24/12/2020*/

/*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 24/12/2020
*Este metodo se usa para listar la categoria actual que tiene el producto*/
  getCategoryList() {
    this.serviceCategory.getCategories().subscribe(
      category => {
        this.category = category;
      });
  }
}

  /*<i>[fin][]</i>
*@author [CadenaCristian]
*@since 24/12/2020*/