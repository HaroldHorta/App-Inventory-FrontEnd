import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ExpensesService } from '../../../core/services/expenses.service';

@Component({
  selector: 'ngx-pop-create-expenses',
  templateUrl: './pop-create-expenses.component.html',
  styleUrls: ['./pop-create-expenses.component.scss']
})
export class PopCreateExpensesComponent implements OnInit {

  checkOutForm: FormGroup;
  loadingLargeGroup = false;
  disabledUpdate = false;

  constructor(private formBuilder: FormBuilder, protected ref: NbDialogRef<PopCreateExpensesComponent>,
    private expensesService: ExpensesService) {
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
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.urls.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  addExpenses(expenses) {

    expenses.images = this.urls;
    console.log(this.urls);

    this.expensesService.create(expenses).subscribe(() => {

    })
  }

}
