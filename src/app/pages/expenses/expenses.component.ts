import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ResponseExpenses } from '../../core/models/Response/expenses/ResponseExpenses';
import { ExpensesService } from '../../core/services/expenses.service';
import { PaginationService } from '../../core/services/pagination.service';
import { PopCreateExpensesComponent } from './pop-create-expenses/pop-create-expenses.component';
import { PopDetailsExpensesComponent } from './pop-details-expenses/pop-details-expenses.component';

@Component({
  selector: 'ngx-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  expenses: ResponseExpenses[];
  expensesFilter: ResponseExpenses[];
  changeDetectorRef: ChangeDetectorRef;
  searchExpenses;
  page: number = 0;
  hideFilters = false;

  constructor(private dialog: NbDialogService, changeDetectorRef: ChangeDetectorRef, 
    private expensesService: ExpensesService,
    private paginationService: PaginationService,) {

    this.changeDetectorRef = changeDetectorRef;
    this.paginationService.paginatornumber$.subscribe(data => {
      this.page = data;
      this.changeDetectorRef.detectChanges();
      this.getExpensesList();
    });

    this.getExpensesList();
  }

  ngOnInit(): void {

    

  }

  getExpensesList() {
    this.expensesService.getProductsExpensesPage(this.page).subscribe(
      expenses => {
        this.expenses = expenses.expenses;
        this.getExpensesListFilter();
      },
    );
  }

  getExpensesListFilter() {
    this.expensesService.getProductsExpensesFilters().subscribe(
      expenses => {
        this.paginationService.paginationCount(expenses);
        this.expensesFilter = expenses.expenses;
      },
    );
  }

  open() {
    this.dialog.open(PopCreateExpensesComponent).onClose.subscribe(() => {
      this.expenses = [];
      this.getExpensesList();
    });
  }

  openModalDetails(item) {
    this.dialog.open(PopDetailsExpensesComponent, { context: { expense: item } });
  }


  onSelectChange(event) {

    if (event === '') {
      this.hideFilters = false;
    }
    if (event !== '') {
      this.hideFilters = true;
    }

  }



}
