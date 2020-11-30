import { Component, OnInit } from '@angular/core';
import { ResponseCashRegister } from '../../../core/models/Response/finances/cashRegister/ResponseCashRegister';
import { CashRegisterBaseService } from '../../../core/services/cash-register-base.service';
import { GeneralService } from '../../../core/services/general.service';

@Component({
  selector: 'ngx-cash-register-daily',
  templateUrl: './cash-register-daily.component.html',
  styleUrls: ['./cash-register-daily.component.scss']
})
export class CashRegisterDailyComponent implements OnInit {

  cashRegister: ResponseCashRegister;

  constructor(private cashBaseService: CashRegisterBaseService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.cashBaseService.createCashRegister().subscribe(data => {
      this.cashRegister = data;
    }, (err) => {
      const type = 'danger';
      const quote = { title: null, body: err.error.detailMessage };
      this.generalService.showToast(type, quote.title, quote.body);
    });
  }

}
