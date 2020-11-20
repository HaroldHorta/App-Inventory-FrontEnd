import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogService, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Status } from '../../core/models/enum/Status.enum';
import { ResponseProduct } from '../../core/models/Response/product/ResponseProduct.module';
import { FileUploadService } from '../../core/services/file-upload.service';
import { GeneralService } from '../../core/services/general.service';
import { ProductService } from '../../core/services/product.service';
import { PopDetailsComponent } from './pop-details/pop-details.component';
import { PopUpdateImageComponent } from './pop-update-image/pop-update-image.component';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'ngx-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})

export class InventoryComponent implements OnInit {

  product: ResponseProduct[];
  changeDetectorRef: ChangeDetectorRef;
  hideListProduct = false;


  constructor(private serviceProduct: ProductService, changeDetectorRef: ChangeDetectorRef,
    private generalService: GeneralService,
    private dialog: NbDialogService,
    private fileUpload: FileUploadService) {
    this.changeDetectorRef = changeDetectorRef;
  }

  ngOnInit(): void {
    this.getProductList();
  }

  productList = [];
  searchProduct;
  getProductList() {
    this.serviceProduct.getProducts().subscribe(
      product => {
        this.product = product;
        this.product.forEach(p => {
          this.productList.push(p);
        });
        if (this.product.length === 0) {
          this.hideListProduct = true;
        }
        this.changeDetectorRef.reattach();
      },
    );
  }
  open() {
    this.dialog.open(PopupComponent).onClose.subscribe(() => {});
  }

  title: string;

  openModal(item) {
    this.dialog.open(PopupComponent, { context: { productEdit: item } });
  }
  openModalDetails(item) {
    this.dialog.open(PopDetailsComponent, { context: { idProduct: item } });
  }
  openModalImage(item) {
    this.dialog.open(PopUpdateImageComponent, { context: { photo: item } });
  }
  updateStatus(event, id) {
    let message;
    let status;
    if (event) {
      message = 'El producto se activo correctamente';
      status = Status.ACTIVE;
    } else {
      message = 'El producto se desactivo correctamente';
      status = Status.INACTIVE;
    }
    this.serviceProduct.updateStatus(id, status).subscribe(
      data => {
        this.product = data;
        const type = 'success';
        const quote = { title: null, body: message };
        this.generalService.showToast(type, quote.title, quote.body);
        // this.getProductList();
      },
    );
  }
  urls = [];
  onSelectFile(idProduct,event) {
    if (event.target.files && event.target.files[0]) {
      for (let i = 0; i < 1; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          
          this.urls.push(event.target.result);
         
          const obj = {idProduct: idProduct, dataPhoto: this.urls[0] }


          this.fileUpload.create(obj).subscribe(data => {
            console.log("Este es el data", data);
            
            this.urls = [];
          })
        }

        reader.readAsDataURL(event.target.files[0]);
      }
    }

  }
}
