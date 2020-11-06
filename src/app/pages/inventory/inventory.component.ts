import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Status } from '../../core/models/Response/enum/Status.enum';
import { ResponseProduct } from '../../core/models/Response/product/ResponseProduct.module';
import { GeneralService } from '../../core/services/general.service';
import { ProductService } from '../../core/services/product.service';
import { PopDetailsComponent } from './pop-details/pop-details.component';
import { PopupComponent } from './popup/popup.component';


@Component({
  selector: 'ngx-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {

  @Input() receivedParentMessage: string;
  @Input() products: ResponseProduct;
  @Output() messageToEmit = new EventEmitter<string>();

  messageToSendC: string = 'Hello Parent!';
  product: ResponseProduct[];
  names: string[] = [];
  changeDetectorRef: ChangeDetectorRef;
  checked = false;


  constructor(private serviceProduct: ProductService, changeDetectorRef: ChangeDetectorRef,
    private generalService: GeneralService,
    private dialog: NbDialogService) {
    this.changeDetectorRef = changeDetectorRef;
  }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.serviceProduct.getProducts().subscribe(
      product => {
        this.product = product;
        this.changeDetectorRef.reattach();
      },
    );
  }
  open() {
    this.dialog.open(PopupComponent).onClose.subscribe(() => {
      this.getProductList();
    });
  }

  title: string;

  openModal(item) {
    this.dialog.open(PopupComponent, { context: { productEdit: item } });
  }
  openModalDetails(item) {
    this.dialog.open(PopDetailsComponent, { context: { productDetails: item } });
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
        this.getProductList();
      },
    );
  }
}
