import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ResponseCashRegister } from '../../../core/models/Response/finances/cashRegister/ResponseCashRegister';
import { CashRegisterBaseService } from '../../../core/services/cash-register-base.service';
import { GeneralService } from '../../../core/services/general.service';
import { PaginationService } from '../../../core/services/pagination.service';

@Component({
  selector: 'ngx-cash-register-historic',
  templateUrl: './cash-register-historic.component.html',
  styleUrls: ['./cash-register-historic.component.scss'],
})
export class CashRegisterHistoricComponent implements OnInit {

  cashRegisters: ResponseCashRegister[];
  cashRegistersFilters: ResponseCashRegister[];
  changeDetectorRef: ChangeDetectorRef;
  page: number = 0;
  dataPaginator;


  constructor(private cashBaseService: CashRegisterBaseService,
    private paginationService: PaginationService,
    changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;

    this.paginationService.paginatornumber$.subscribe(data => {
      this.page = data;
      this.changeDetectorRef.detectChanges();
      this.getCashRegisterList();
    });
    this.getCashRegisterList();

  }

  ngOnInit(): void {

  }

  /*<i>[ini][]</i>
  *@author [HaroldHorta]
  *@since 05/01/2021
  *Metodo que permite obtener y listar todos los datos correspondientes al hostorico de la caja registradora */
  getCashRegisterList() {
    this.cashBaseService.getProductsExpensesPage(this.page).subscribe(
      cashRegisters => {
        this.dataPaginator = cashRegisters;
        this.cashRegisters = cashRegisters.cashRegisters;
        this.getCashRegisterListFilter();
      },
    );
  }
  /*<i>[fin][]</i>
   *@author [HaroldHorta]
    *@since 05/01/2021*/

  /*<i>[ini][]</i>
  *@author [HaroldHorta]
  *@since 05/01/2021
  *Metodo que permite listar todos los el historico de la caja registradora para el filtro*/
  getCashRegisterListFilter() {
    this.cashBaseService.getProductsExpensesFilters().subscribe(
      cashRegisters => {
        this.paginationService.paginationCount( this.dataPaginator);
        this.cashRegistersFilters = cashRegisters.cashRegisters;
      },
    );
  }
  /*<i>[fin][]</i>
   *@author [HaroldHorta]
    *@since 05/01/2021*/

}
