import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseCashBase } from '../../../core/models/Response/finances/cashBase/ResponseCashBase';
import { CashRegisterBaseService } from '../../../core/services/cash-register-base.service';
import { GeneralService } from '../../../core/services/general.service';

@Component({
  selector: 'ngx-cash-register-base',
  templateUrl: './cash-register-base.component.html',
  styleUrls: ['./cash-register-base.component.scss'],
})
export class CashRegisterBaseComponent implements OnInit {

  cashBase: ResponseCashBase;
  checkOutForm: FormGroup;


  loadingLargeGroup = false;
  disabledUpdate = false;


  constructor(private formBuilder: FormBuilder, private cashBaseService: CashRegisterBaseService, private generalService: GeneralService) {
    this.checkOutForm = this.formBuilder.group({
      cashBase: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getCashBase();

  }

  /*<i>[ini][]</i>
 *@author [CadenaCristian]
 *@since 26/12/2020
 *Este metodo sirve para mostrar el dinero base que hay en caja diario, si se inserta mas de un dato va a mostrar solo el mar reciente*/
  getCashBase() {
    this.cashBaseService.getCashBase().subscribe(data => {
      this.cashBase = data;
    });
  }
  /*<i>[fin][]</i>
   *@author [CadenaCristian]
   *@since 26/12/2020*/

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*Este metodo sirve para agregar el dinero base que se va a tener, funciona agregando el valor que llega en el input y limpiando el input
*por si se va a ingresar un nuevo valor, el solo toma el ultimo valor ingresado*/
  addCashBase(cashBase) {

    this.cashBaseService.createCashBase(cashBase.cashBase).subscribe(data => {
      this.cashBase = data;
      this.checkOutForm.reset();
      const type = 'success';
      const quote = { title: null, body: 'Insertado correctamente' };
      this.generalService.showToast(type, quote.title, quote.body);
    },
      (err) => {
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.generalService.showToast(type, quote.title, quote.body);
      });

  }
  /*<i>[fin][]</i>
   *@author [CadenaCristian]
   *@since 26/12/2020*/

   
  /*<i>[ini][]</i>
*@author [HaroldHorta]
*@since 05/01/2021
*Metodo para ocultar cuando se quiera insertar base y no existan registros*/

  mostrarRegistros() {
    this.cashBase = { dailyCashBase: '0', createAt: '0' };
  }

    /*<i>[fin][]</i>
   *@author [HaroldHorta]
   *@since 05/01/2021*/
}

