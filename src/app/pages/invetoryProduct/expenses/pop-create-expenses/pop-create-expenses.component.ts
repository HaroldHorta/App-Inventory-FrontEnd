import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ExpensesService } from '../../../../core/services/expenses.service';
import { GeneralService } from '../../../../core/services/general.service';

@Component({
  selector: 'ngx-pop-create-expenses',
  templateUrl: './pop-create-expenses.component.html',
  styleUrls: ['./pop-create-expenses.component.scss'],
})
export class PopCreateExpensesComponent implements OnInit {

  checkOutForm: FormGroup;
  loadingLargeGroup = false;
  disabledUpdate = false;

  constructor(private formBuilder: FormBuilder, protected ref: NbDialogRef<PopCreateExpensesComponent>,
    private generalService: GeneralService, private expensesService: ExpensesService) {
    this.checkOutForm = this.formBuilder.group({

      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      images: ['', [Validators.required]],

    });
  }

  ngOnInit(): void {
  }

  cancel() {
    this.ref.close();
  }

  urls = [];
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        reader.onload = (result: any) => {
          this.urls.push(result.target.result);
        },
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  addExpenses(expenses) {

    this.loadingLargeGroup = true;
    this.disabledUpdate = true;
    expenses.images = this.urls;
    this.expensesService.create(expenses).subscribe(() => {
      this.ref.close(expenses);
      this.loadingLargeGroup = false;
      this.disabledUpdate = false;
      const type = 'success';
      const quote = { title: null, body: 'Producto agregado correctamente' };
      this.generalService.showToast(type, quote.title, quote.body);

    });
  }

}
