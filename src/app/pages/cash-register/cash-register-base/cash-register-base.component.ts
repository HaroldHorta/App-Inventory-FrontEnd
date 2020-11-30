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


  constructor(private formBuilder: FormBuilder, private cashBaseService: CashRegisterBaseService, private generalService: GeneralService) { 
    this.checkOutForm = this.formBuilder.group({
      cashBase: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getCashBase();

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
}
