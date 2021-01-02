import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ResponseExpenses } from '../../core/models/Response/expenses/ResponseExpenses';
import { ExpensesService } from '../../core/services/expenses.service';
import { PopCreateExpensesComponent } from './pop-create-expenses/pop-create-expenses.component';
import { PopDetailsExpensesComponent } from './pop-details-expenses/pop-details-expenses.component';

@Component({
  selector: 'ngx-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  expenses: ResponseExpenses[];
  searchExpenses;

  constructor(private dialog: NbDialogService, private expensesService: ExpensesService) { }

  ngOnInit(): void {

    this.getExpenses();

  }

  getExpenses() {
    this.expensesService.getCustomers().subscribe(data => {
      this.expenses = data;
    })
  }

  open() {
    this.dialog.open(PopCreateExpensesComponent).onClose.subscribe(() => {
      this.expenses = [];
      this.getExpenses();
    });
  }

  openModalDetails(item) {
    this.dialog.open(PopDetailsExpensesComponent, { context: { expense: item } });
  }



}
