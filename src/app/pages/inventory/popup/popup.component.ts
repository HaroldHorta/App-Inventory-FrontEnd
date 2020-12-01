import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NB_DOCUMENT } from '@nebular/theme';
import { RequestAddProduct } from '../../../core/models/Request/product/RequestAddProduct';
import { ResponseCategory } from '../../../core/models/Response/category/ResponseCategory.module';
import { ResponseProduct } from '../../../core/models/Response/product/ResponseProduct.module';
import { CategoryService } from '../../../core/services/category.service';
import { FileUploadService } from '../../../core/services/file-upload.service';
import { GeneralService } from '../../../core/services/general.service';
import { ProductService } from '../../../core/services/product.service';
import { InventoryComponent } from '../inventory.component';

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

  getCategoryList() {
    this.serviceCategory.getCategories().subscribe(
      categorias => {
        this.categoria = categorias;
        this.categoria.push(this.productEdit.category[0]);
        this.selectedItemEdit = this.categoria[this.categoria.length - 1];
      },
    );
  }

  getProductList() {
    this.serviceProduct.getProducts().subscribe(
      product => {
        this.products = product;
      },
    );
  }

  cancel() {
    this.ref.close();
  }

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
    );
  }


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
}
