import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ResponseBreed } from '../../../../core/models/Response/breed/ResponseBreed';
import { BreedService } from '../../../../core/services/breed.service';
import { GeneralService } from '../../../../core/services/general.service';

@Component({
  selector: 'ngx-popup-add-breed',
  templateUrl: './popup-add-breed.component.html',
  styleUrls: ['./popup-add-breed.component.scss'],
})
export class PopupAddBreedComponent implements OnInit {

  checkOutForm: FormGroup;
  checkOutEdit: FormGroup;
  breed: ResponseBreed[];
  breedEdit: ResponseBreed;
  disableButton = false;
  loadingLargeGroup = false;

  constructor(protected ref: NbDialogRef<PopupAddBreedComponent>, private formBuilder: FormBuilder,
    private toastrService: GeneralService, private serviceBreed: BreedService) {
    this.checkOutForm = this.formBuilder.group({
      description: ['', [Validators.required]],
    });
    this.checkOutEdit = this.formBuilder.group({
      description: ['', [Validators.required]],
    });
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
metodo se usa para agregar una raza*/
  onCreateConfirm(event) {
    this.disableButton = true;
    this.loadingLargeGroup = true;
    if (event.description === '') {
      const type = 'danger';
      const quote = { title: null, body: 'La raza no puede ir vacia' };

      this.toastrService.showToast(type, quote.title, quote.body);
    } else {
      if (window.confirm('¿Esta seguro de agregar la raza?')) {
        this.serviceBreed.create(event).subscribe(() => {
          const type = 'success';
          const quote = { title: null, body: 'Raza agregada correctamente' };
          this.toastrService.showToast(type, quote.title, quote.body);
          this.ref.close(event);
        },
          (err) => {
            const type = 'danger';
            const quote = { title: null, body: err.error.detailMessage };
            this.toastrService.showToast(type, quote.title, quote.body);
            this.ref.close();
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
*Este metodo usa una tabla llamada smart Table, la cual deja alterar la fucnionalidad de los botones
que el trae predeterminados, este metodo
se usa para editar una categoria existente*/
  onSaveConfirm(id, breed): void {
    this.loadingLargeGroup = true;
    if (breed.description === '') {
      const type = 'danger';
      const quote = { title: null, body: 'La Categoría no puede ir vacia' };
      this.toastrService.showToast(type, quote.title, quote.body);
    } else {
      if (window.confirm('¿Esta seguro de actualizar la categoria?')) {
        const categoria = { id: id, description: breed.description };
        this.serviceBreed.update(categoria).subscribe(() => {
          const type = 'success';
          const quote = { title: null, body: 'Categoria actualizada correctamente' };
          this.toastrService.showToast(type, quote.title, quote.body);
          this.ref.close();
        }, (err) => {
          const type = 'danger';
          const quote = { title: null, body: err.error.detailMessage };
          this.toastrService.showToast(type, quote.title, quote.body);
          this.ref.close();
        });
      }
    }
  }
  /*<i>[fin][]</i>
  *@author [CadenaCristian]
  *@since 03/01/2021*/

}
