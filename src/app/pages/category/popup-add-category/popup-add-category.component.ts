import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { CategoryService } from '../../../core/services/category.service';
import { GeneralService } from '../../../core/services/general.service';

@Component({
  selector: 'ngx-popup-add-category',
  templateUrl: './popup-add-category.component.html',
  styleUrls: ['./popup-add-category.component.scss']
})
export class PopupAddCategoryComponent implements OnInit {

  checkOutForm: FormGroup;

  constructor(protected ref: NbDialogRef<PopupAddCategoryComponent>, private formBuilder: FormBuilder,
    private toastrService: GeneralService, private serviceCategory: CategoryService) {
    this.checkOutForm = this.formBuilder.group({
      description: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }
  cancel() {
    this.ref.close();
  }

  // getCategoryList() {
  //   this.serviceCategory.getCategories().subscribe(
  //     categories => {
  //       this.categories = categories;
  //     });
  // }

  onCreateConfirm(event): void {
    console.log(event)
    // if (event.description === '') {
    //     const type = 'danger';
    //     const quote = { title: null, body: 'La Categoría no puede ir vacia' };

    //     this.toastrService.showToast(type, quote.title, quote.body);
    // } else {

    //     if (window.confirm('¿Esta seguro de agregar la categoria?')) {
    //         this.serviceCategory.create(JSON.stringify(event)).subscribe(() => {
    //             const type = 'success';
    //             const quote = { title: null, body: 'Categoria agregada correctamente' };
    //             this.toastrService.showToast(type, quote.title, quote.body);
    //         },
    //             (err) => {
    //                 const type = 'danger';
    //                 const quote = { title: null, body: err.error.detailMessage };
    //                 this.toastrService.showToast(type, quote.title, quote.body);
    //             },
    //         );
    //     } else {
    //         event.confirm.reject();
    //     }
    // }
}
}
