import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { RequestUpdateUnit } from '../../../core/models/Request/product/RequestUpdateUnit';
import { ResponseProduct } from '../../../core/models/Response/product/ResponseProduct.module';
import { GeneralService } from '../../../core/services/general.service';
import { InventoryService } from '../../../core/services/inventory.service';

@Component({
  selector: 'ngx-pop-update-units',
  templateUrl: './pop-update-units.component.html',
  styleUrls: ['./pop-update-units.component.scss']
})
export class PopUpdateUnitsComponent implements OnInit {

  units: ResponseProduct;
  checkOutForm: FormGroup;

  constructor(protected ref: NbDialogRef<PopUpdateUnitsComponent>, 
    private generalService: GeneralService,
    private serviceInventory: InventoryService,private formBuilder: FormBuilder) {
    this.checkOutForm = this.formBuilder.group({
      id: [''],
      priceBuy: [''],
      priceSell: [''],
      unit: [''],
    })
   }

  ngOnInit(): void {
    this.units;
    console.log("Estas son las unidades",this.units)
  }

  cancel(){
    this.ref.close();
  }
  updateUnit(unit:RequestUpdateUnit){
    console.log("Este es unit: ", unit);
    this.serviceInventory.update(unit).subscribe(
      () => {
        this.ref.close(unit);
        const type = 'success';
        const quote = {title: null, body: 'Unidades actualizadas correctamente'};
        this.generalService.showToast(type, quote.title, quote.body);
      },
    );
  }
}
