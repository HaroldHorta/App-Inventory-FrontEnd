import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ResponseVaccinations } from '../../../../core/models/Response/vaccination/ResponseVaccinations';
import { GeneralService } from '../../../../core/services/general.service';
import { VaccinationService } from '../../../../core/services/vaccination.service';
import { VaccinationComponent } from '../vaccination.component';

@Component({
  selector: 'ngx-popup-add-vaccination',
  templateUrl: './popup-add-vaccination.component.html',
  styleUrls: ['./popup-add-vaccination.component.scss']
})
export class PopupAddVaccinationComponent implements OnInit {

  vaccionationEdit: ResponseVaccinations;

  checkOutForm: FormGroup;
  checkOutEdit: FormGroup;
  vaccionation: ResponseVaccinations[];
  disableButton = false;
  loadingLargeGroup = false;
  
  constructor(protected ref: NbDialogRef<PopupAddVaccinationComponent>, private formBuilder: FormBuilder,
    private toastrService: GeneralService, private serviceVaccination: VaccinationService) {
    this.checkOutForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      lot: ['', [Validators.required]],
      observation: ['', [Validators.required]],
    });
    this.checkOutEdit = this.formBuilder.group({
      description: ['', [Validators.required]],
      lot: ['', [Validators.required]],
      observation: ['', [Validators.required]],
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
        this.serviceVaccination.create(event).subscribe(() => {
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
  onSaveConfirm(id, vaccionation): void {
    this.loadingLargeGroup = true;
    if (vaccionation.description === '') {
      const type = 'danger';
      const quote = { title: null, body: 'La especie no puede ir vacia' };
      this.toastrService.showToast(type, quote.title, quote.body);
    } else {
      if (window.confirm('¿Esta seguro de actualizar la especie?')) {
        const vaccionations = { id: id, description: vaccionation.description, lot: vaccionation.lot, observation:vaccionation.observation };
        this.serviceVaccination.update(vaccionations).subscribe(() => {
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
