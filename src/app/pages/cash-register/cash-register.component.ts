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

  loadingLargeGroup = false;
  disabledUpdate = false;
  checkOutForm: FormGroup;
  cashBase: ResponseCashBase;
  cashRegister: ResponseCashRegister;
  cashRegisters: ResponseCashRegister[];


  hideBase = false;
  hideArqueo = false;
  hideHistory = false;

  constructor(private formBuilder: FormBuilder, private cashBaseService: CashRegisterBaseService, private generalService: GeneralService) {

    this.checkOutForm = this.formBuilder.group({
      cashBase: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

  }

  hiddenBase() {

    this.hideBase = !this.hideBase;
    this.hideArqueo = false;
    this.hideHistory = false;
    this.getCashBase();
  }

  hiddenArqueo() {
    this.hideBase = false;
    this.hideHistory = false;
    this.cashBaseService.createCashRegister().subscribe(data => {
      this.cashRegister = data;
      this.hideArqueo = !this.hideArqueo;
    }, (err) => {
      const type = 'danger';
      const quote = { title: null, body: err.error.detailMessage };
      this.generalService.showToast(type, quote.title, quote.body);
    });
  }

  getCashBase() {
    this.cashBaseService.getCashBase().subscribe(data => {
      this.cashBase = data;
    });
  }

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

  hiddenHistory(){
    this.hideBase = false;
    this.hideArqueo = false;
    this.cashBaseService.getCashRegister().subscribe(data => {
      this.hideHistory = !this.hideHistory;
      this.cashRegisters = data
      console.log(this.cashRegisters)
    });
  }

}
