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

  hiddenBase() {
    this.hideBase = !this.hideBase;
    this.hideArqueo = false;
    this.hideHistory = false;
  }

  hiddenArqueo() {
    this.hideBase = false;
    this.hideHistory = false;
    this.hideArqueo = !this.hideArqueo;
  }

  hiddenHistory() {
    this.hideBase = false;
    this.hideArqueo = false;
    this.hideHistory = !this.hideHistory;
  }

}
