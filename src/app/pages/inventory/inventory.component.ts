import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Status } from '../../core/models/Response/enum/Status.enum';
import { ResponseProduct } from '../../core/models/Response/product/ResponseProduct.module';
import { GeneralService } from '../../core/services/general.service';
import { InventoryService } from '../../core/services/inventory.service';
import { ProductService } from '../../core/services/product.service';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'ngx-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  product: ResponseProduct[];
  names: string[] = [];
  changeDetectorRef: ChangeDetectorRef;
  status: boolean;
  checked = false;

  constructor(private inventoryService: InventoryService, private serviceProduct: ProductService, changeDetectorRef: ChangeDetectorRef,
    private generalService: GeneralService,
    private dialogService: NbDialogService) {
    this.changeDetectorRef = changeDetectorRef;
  }

  ngOnInit(): void {
    this.getProductList();
    this.status;

  }

  toggle(checked: boolean) {
    this.checked = checked;
  }

  getProductList() {
    this.serviceProduct.getProducts().subscribe(
      product => {
        this.product = product;
        product.forEach(data => {
          if (data.status === 'INACTIVE') {
            this.status = false;
          } else {
            this.status = true;
          }
          console.log('Este es el this.status', this.status)
        })
        this.changeDetectorRef.detectChanges();
      },
    );
  }
  open() {
    this.dialogService.open(PopupComponent).onClose.subscribe(() => {
      this.getProductList();
    });
  }

  update(item) {
    this.dialogService.open(PopupComponent);
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
      }
    )
  }
}
