import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NB_DOCUMENT } from '@nebular/theme';
import { ResponseCategory } from '../../../../core/models/Response/category/ResponseCategory.module';
import { ResponseProduct } from '../../../../core/models/Response/product/ResponseProduct.module';
import { CategoryService } from '../../../../core/services/category.service';
import { FileUploadService } from '../../../../core/services/file-upload.service';
import { GeneralService } from '../../../../core/services/general.service';
import { ProductService } from '../../../../core/services/product.service';


@Component({
  selector: 'ngx-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})

export class PopupComponent implements OnInit {

  products: ResponseProduct[];
  product: ResponseProduct;
  categoria: ResponseCategory[] = [];
  checkOutForm: FormGroup;
  checkOutFormEdit: FormGroup;
  checkOutCategory: FormGroup;
  productEdit: ResponseProduct;
  selectedItem;
  selectedItemEdit;
  loadingLargeGroup = false;
  disabledUpdate = false;

  ngOnInit(): void {
    this.getCategoryList();
    this.productEdit;
  }

  constructor(private serviceProduct: ProductService, private fileUpload: FileUploadService,
    private generalService: GeneralService, protected ref: NbDialogRef<PopupComponent>,
    private serviceCategory: CategoryService, private formBuilder: FormBuilder, private productService: ProductService) {
    this.checkOutForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      priceBuy: ['', [Validators.required]],
      priceSell: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      photo: [''],
    });
    this.checkOutFormEdit = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      priceBuy: ['', [Validators.required]],
      priceSell: ['', [Validators.required]],
      unit: ['', [Validators.required]],
    });
  }

  /*<i>[ini][]</i>
  *@author [CadenaCristian]
  *@since 24/12/2020
  *Este metodo permite obtener el campo que ya fue seleccionado previamente en el producto
  existen, este metodo se usa al momento de actualizar
  un producto y funciona comparando el dato que recibe la variable selectedItemEdit y listando las categorias que sean diferentes a la
  que viene en selectedItemEdit, tambien es inicializado en el ngOnInit ya que al momento de agregar necesitamos que las categorias esten
  disponibles al cargar ese pop up, por eso es lo primero al cargarse*/
  getCategoryList() {
    this.serviceCategory.getCategories().subscribe(
      categorias => {
        this.categoria = categorias;

        this.selectedItemEdit = this.productEdit.category[0];

        this.categoria = this.categoria.filter(c => c.id !== this.selectedItemEdit.id);

        this.categoria.push(this.productEdit.category[0]);
      },
    );
  }
  /*<i>[fin][]</i>
    *@author [CadenaCristian]
    *@since 24/12/2020*/


  /*<i>[ini][]</i>
 *@author [CadenaCristian]
 *@since 25/12/2020
 *Este metodo sirve para cerrar el POp up de agregar o cualquier otro pop up donde sea llamado, funciona llamando en el constructos a
 NbDialogRef el cual tiene un metodo especial llamado close, el cual cumple con la funcion ya descrita*/
  cancel() {
    this.ref.close();
  }
  /*<i>[fin][]</i>
    *@author [CadenaCristian]
    *@since 25/12/2020*/

  /*<i>[ini][]</i>
 *@author [CadenaCristian]
 *@since 25/12/2020
 *Este metodo se usa para poder seleccionar una foto desde el explorador de archivos,
  *este metodo recibe un evento, el cual obtiene el nombre
 de la imagen que se quiere agregar, en la ruta event.target.files*/
  urls = [];
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      for (let i = 0; i < 1; i++) {
        const reader = new FileReader();
        reader.onload = (events: any) => {
          this.urls.push(events.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }
  /*<i>[fin][]</i>
    *@author [CadenaCristian]
    *@since 25/12/2020*/

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 25/12/2020
*Este metodo recibe un checkOutForm que contiene todos los values de cada uno de los input que se usaron en el formulario y se
debe realizar un push a una constante para poder darle la forma que recibe el backend en forma de JSON*/
  addProduct(product) {
    product.photo = this.urls[0];
    this.loadingLargeGroup = true;
    this.disabledUpdate = true;
    const data = [];
    data.push({ id: product.categoryId.id, description: product.categoryId.description });
    product.categoryId = data;
    this.productService.create(JSON.stringify(product)).subscribe(
      () => {
        this.ref.close(product);
        this.loadingLargeGroup = false;
        this.disabledUpdate = false;
        const type = 'success';
        const quote = { title: null, body: 'Producto agregado correctamente' };
        this.generalService.showToast(type, quote.title, quote.body);
      },
      (err) => {
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.generalService.showToast(type, quote.body, quote.title);
        this.ref.close(product);
      });
  }

  /*<i>[fin][]</i>
    *@author [CadenaCristian]
    *@since 25/12/2020*/

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 25/12/2020
*Este metodo recibe el ID del producto y los datos del producto que se tienen, lo muestra en el pop up gracias al checkOutFormEdit
el cual trae los valores de los input y permite mostrarlos*/
  updateProduct(id, product) {
    if (product.categoryId[0] === undefined) {
      const obj = { id: this.selectedItemEdit.id, description: this.selectedItemEdit.description };
      product.categoryId = obj;
    }
    this.loadingLargeGroup = true;
    this.disabledUpdate = true;
    const data = [];
    data.push({ id: product.categoryId.id, description: product.categoryId.description });
    product.categoryId = data;
    this.productService.update(id, product).subscribe(
      () => {
        this.loadingLargeGroup = false;
        this.disabledUpdate = false;
        const type = 'success';
        const quote = { title: null, body: 'Producto actualizado correctamente' };
        this.generalService.showToast(type, quote.title, quote.body);
        this.ref.close();
      },
      (err) => {
        const type = 'danger';
        const quote = { title: null, body: 'error al actualizar' };
        this.generalService.showToast(type, quote.title, quote.body);
      },
    );
  }
  /*<i>[fin][]</i>
*@author [CadenaCristian]
*@since 25/12/2020*/
}

