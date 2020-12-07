import { Component, OnInit } from '@angular/core';
import { ResponseCashRegister } from '../../../core/models/Response/finances/cashRegister/ResponseCashRegister';
import { CashRegisterBaseService } from '../../../core/services/cash-register-base.service';
import { GeneralService } from '../../../core/services/general.service';

@Component({
  selector: 'ngx-cash-register-historic',
  templateUrl: './cash-register-historic.component.html',
  styleUrls: ['./cash-register-historic.component.scss'],
})
export class CashRegisterHistoricComponent implements OnInit {

  cashRegisters: ResponseCashRegister[];

  constructor(private cashBaseService: CashRegisterBaseService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.cashBaseService.getCashRegister().subscribe(data => {
      this.cashRegisters = data;
    });
  }

}
