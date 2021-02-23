import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ResponseSpecies } from '../../../../core/models/Response/species/ResponseSpecies';
import { GeneralService } from '../../../../core/services/general.service';
import { SpeciesService } from '../../../../core/services/species.service';

@Component({
  selector: 'ngx-popup-add-species',
  templateUrl: './popup-add-species.component.html',
  styleUrls: ['./popup-add-species.component.scss'],
})
export class PopupAddSpeciesComponent implements OnInit {


  speciesEdit: ResponseSpecies;
  checkOutForm: FormGroup;
  checkOutEdit: FormGroup;
  disableButton = false;
  loadingLargeGroup = false;

  constructor(protected ref: NbDialogRef<PopupAddSpeciesComponent>, private formBuilder: FormBuilder,
    private toastrService: GeneralService, private serviceSpecies: SpeciesService) {
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
metodo se usa para agregar una especie*/
  onCreateConfirm(event) {
    this.disableButton = true;
    this.loadingLargeGroup = true;
    if (event.description === '') {
      const type = 'danger';
      const quote = { title: null, body: 'La especie no puede ir vacia' };

      this.toastrService.showToast(type, quote.title, quote.body);
    } else {
      if (window.confirm('¿Esta seguro de agregar la especie?')) {
        this.serviceSpecies.create(event).subscribe(() => {
          const type = 'success';
          const quote = { title: null, body: 'Especie agregada correctamente' };
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
se usa para editar una especie existente*/
  onSaveConfirm(id, especie): void {
    this.loadingLargeGroup = true;
    if (especie.description === '') {
      const type = 'danger';
      const quote = { title: null, body: 'La especie no puede ir vacia' };
      this.toastrService.showToast(type, quote.title, quote.body);
    } else {
      if (window.confirm('¿Esta seguro de actualizar la especie?')) {
        const especies = { id: id, description: especie.description };
        this.serviceSpecies.update(especies).subscribe(() => {
          const type = 'success';
          const quote = { title: null, body: 'Especie actualizada correctamente' };
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
