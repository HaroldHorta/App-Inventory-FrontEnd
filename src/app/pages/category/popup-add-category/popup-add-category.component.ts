import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ResponseCategory } from '../../../core/models/Response/category/ResponseCategory.module';
import { CategoryService } from '../../../core/services/category.service';
import { GeneralService } from '../../../core/services/general.service';

@Component({
  selector: 'ngx-popup-add-category',
  templateUrl: './popup-add-category.component.html',
  styleUrls: ['./popup-add-category.component.scss']
})
export class PopupAddCategoryComponent implements OnInit {

  checkOutForm: FormGroup;
  checkOutEdit: FormGroup;
  category: ResponseCategory[];
  categoryEdit: ResponseCategory;

  constructor(protected ref: NbDialogRef<PopupAddCategoryComponent>, private formBuilder: FormBuilder,
    private toastrService: GeneralService, private serviceCategory: CategoryService) {
    this.checkOutForm = this.formBuilder.group({
      description: ['', [Validators.required]]
    })
    this.checkOutEdit = this.formBuilder.group({
      description: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

/*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 03/01/2021
*Este metodo sirve para cerrar el pop up*/
  cancel() {
    this.ref.close();
  }
  /*<i>[fin][]</i>
  *@author [CadenaCristian]
  *@since 03/01/2021*/
  
  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 03/01/2021
*Este metodo usa una tabla llamada smart Table, la cual deja alterar la fucnionalidad de los botones que el trae predeterminados y este
metodo se usa para agregar una categoria*/
  onCreateConfirm(event) {
    if (event.description === '') {
      const type = 'danger';
      const quote = { title: null, body: 'La Categoría no puede ir vacia' };

      this.toastrService.showToast(type, quote.title, quote.body);
    } else {
      if (window.confirm('¿Esta seguro de agregar la categoria?')) {
        this.serviceCategory.create(event).subscribe(() => {
          const type = 'success';
          const quote = { title: null, body: 'Categoria agregada correctamente' };
          this.toastrService.showToast(type, quote.title, quote.body);
          this.ref.close(event)
        },
          (err) => {
            const type = 'danger';
            const quote = { title: null, body: err.error.detailMessage };
            this.toastrService.showToast(type, quote.title, quote.body);
          },
        );
      }
    }
  }
  /*<i>[fin][]</i>
  *@author [CadenaCristian]
  *@since 03/01/2021*/

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 03/01/2021
*Este metodo usa una tabla llamada smart Table, la cual deja alterar la fucnionalidad de los botones que el trae predeterminados, este metodo
se usa para editar una categoria existente*/
  onSaveConfirm(id, category): void {
    if (category.description === '') {
      const type = 'danger';
      const quote = { title: null, body: 'La Categoría no puede ir vacia' };
      this.toastrService.showToast(type, quote.title, quote.body);
    } else {
      if (window.confirm('¿Esta seguro de actualizar la categoria?')) {
        const categoria = { id: id, description: category.description };
        this.serviceCategory.update(categoria).subscribe(() => {
          const type = 'success';
          const quote = { title: null, body: 'Categoria actualizada correctamente' };
          this.toastrService.showToast(type, quote.title, quote.body);
          this.ref.close()
        }, (err) => {
          const type = 'danger';
          const quote = { title: null, body: err.error.detailMessage };
          this.toastrService.showToast(type, quote.title, quote.body);
        });
      }
    }
  }
  /*<i>[fin][]</i>
  *@author [CadenaCristian]
  *@since 03/01/2021*/
}
