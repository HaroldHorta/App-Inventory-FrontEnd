import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ResponseProduct } from '../../core/models/Response/product/ResponseProduct.module';
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

  constructor(private inventoryService: InventoryService, private serviceProduct: ProductService, changeDetectorRef: ChangeDetectorRef, private dialogService: NbDialogService) {
    this.changeDetectorRef = changeDetectorRef;
  }

  ngOnInit(): void {
    this.getProductList();
  
  }

  getProductList() {
    this.serviceProduct.getProducts().subscribe(
      product => {
        this.product = product;
        this.changeDetectorRef.detectChanges();
      },
    );
  }
  open() {
    this.dialogService.open(PopupComponent).onClose.subscribe(() => {
      this.getProductList();
    });
  }

  update(item){
    this.dialogService.open(PopupComponent);
    
  }
}
