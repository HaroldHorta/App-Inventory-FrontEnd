import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseCashBase } from '../../core/models/Response/finances/cashBase/ResponseCashBase';
import { ResponseCashRegister } from '../../core/models/Response/finances/cashRegister/ResponseCashRegister';
import { CashRegisterBaseService } from '../../core/services/cash-register-base.service';
import { GeneralService } from '../../core/services/general.service';

@Component({
  selector: 'ngx-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrls: ['./cash-register.component.scss'],
})
export class CashRegisterComponent implements OnInit {

  hideBase = false;
  hideArqueo = false;
  hideHistory = false;

  constructor() {


  }

  ngOnInit(): void {
  }

  /*<i>[ini][]</i>
 *@author [CadenaCristian]
 *@since 26/12/2020
 *Este metodo sirve para mostrar la vista de hideBase y ocultar las vistas de hideArqueo y hideHistory*/
  hiddenBase() {
    this.hideBase = !this.hideBase;
    this.hideArqueo = false;
    this.hideHistory = false;
  }
  /*<i>[fin][]</i>
   *@author [CadenaCristian]
   *@since 26/12/2020*/

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*Este metodo sirve para mostrar la vista de hideArqueo y ocultar las vistas de hideBase y hideHistory*/
  hiddenArqueo() {
    this.hideBase = false;
    this.hideHistory = false;
    this.hideArqueo = !this.hideArqueo;
  }
  /*<i>[fin][]</i>
   *@author [CadenaCristian]
   *@since 26/12/2020*/

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*Este metodo sirve para mostrar la vista de hideHistory y ocultar las vistas de hideArqueo y hideBase*/
  hiddenHistory() {
    this.hideBase = false;
    this.hideArqueo = false;
    this.hideHistory = !this.hideHistory;
  }

  /*<i>[fin][]</i>
   *@author [CadenaCristian]
   *@since 26/12/2020*/
}
