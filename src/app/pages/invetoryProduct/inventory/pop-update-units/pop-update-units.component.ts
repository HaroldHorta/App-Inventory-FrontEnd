import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { RequestUpdateUnit } from '../../../../core/models/Request/product/RequestUpdateUnit';
import { ResponseProduct } from '../../../../core/models/Response/product/ResponseProduct.module';
import { GeneralService } from '../../../../core/services/general.service';
import { InventoryService } from '../../../../core/services/inventory.service';

@Component({
  selector: 'ngx-pop-update-units',
  templateUrl: './pop-update-units.component.html',
  styleUrls: ['./pop-update-units.component.scss'],
})
export class PopUpdateUnitsComponent implements OnInit {

  units: ResponseProduct;
  checkOutForm: FormGroup;
  prueba: FormGroup;

  constructor(protected ref: NbDialogRef<PopUpdateUnitsComponent>,
    private generalService: GeneralService,
    private serviceInventory: InventoryService, private formBuilder: FormBuilder) {
    this.checkOutForm = this.formBuilder.group({
      id: [''],
      priceBuy: [''],
      priceSell: [''],
      unit: [''],
    });
    this.prueba = this.formBuilder.group({
      unidades: [''],
    });
  }

  ngOnInit(): void {
    this.units;
  }

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
  *Este metodo permite editar las unidades recibiendo un objeto con los datos del producto y usando el service update de unidades*/
  updateUnit(unit: RequestUpdateUnit) {
    this.serviceInventory.update(unit).subscribe(
      () => {
        this.ref.close();
        const type = 'success';
        const quote = { title: null, body: 'Unidades actualizadas correctamente' };
        this.generalService.showToast(type, quote.title, quote.body);
      },
      (err) => {
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.generalService.showToast(type, quote.title, quote.body);
        this.ref.close();
      },
    );
  }
  /*<i>[fin][]</i>
  *@author [CadenaCristian]
  *@since 24/12/2020*/
}
