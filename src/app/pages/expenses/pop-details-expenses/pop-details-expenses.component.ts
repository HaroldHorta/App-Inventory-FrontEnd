import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ResponseExpenses } from '../../../core/models/Response/expenses/ResponseExpenses';
import { ExpensesService } from '../../../core/services/expenses.service';

@Component({
  selector: 'ngx-pop-details-expenses',
  templateUrl: './pop-details-expenses.component.html',
  styleUrls: ['./pop-details-expenses.component.scss']
})
export class PopDetailsExpensesComponent implements OnInit {

  idExpenses: string;
  expense: ResponseExpenses;
  event_list = [];
  constructor( protected ref: NbDialogRef<PopDetailsExpensesComponent>, private expensesService: ExpensesService) { }

  ngOnInit(): void {
    this.expense;
    this.event_list = this.expense.images;
    }

 


  cancel() {
    this.ref.close();
  }
}
