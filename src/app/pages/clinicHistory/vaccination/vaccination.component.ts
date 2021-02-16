import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ResponseVaccinations } from '../../../core/models/Response/vaccination/ResponseVaccinations';
import { Vaccination } from '../../../core/models/Response/vaccination/vaccination';
import { GeneralService } from '../../../core/services/general.service';
import { VaccinationService } from '../../../core/services/vaccination.service';
import { PopupAddVaccinationComponent } from './popup-add-vaccination/popup-add-vaccination.component';

@Component({
  selector: 'ngx-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.scss']
})
export class VaccinationComponent implements OnInit {

  hideFilters = false;
  vaccination: Vaccination[] = [];
  searchVaccination;
  changeDetectorRef: ChangeDetectorRef;
  connectionInternet = true;
  hiddenvaccination = false;

  constructor(private serviceVaccionation: VaccinationService,
    private toastrService: GeneralService, private dialogService: NbDialogService,
    changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;

    this.getVaccinaList();
  }
  ngOnInit(): void {
  }

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*Este metodo permite obtener y listar todas las razas que tenemos creadas*/
  getVaccinaList(tipoDeordenList?) {
    this.serviceVaccionation.getVaccionation().subscribe(
      vaccination => {
        this.vaccination = vaccination;

        if (this.vaccination.length === 0) {
          this.hiddenvaccination = true;
        } else {
          this.hiddenvaccination = false;
        }
        if (tipoDeordenList === true) {
          this.OrdenListAlfabetico();
        } else {
          this.OrdenListNuevaAntiguo();
        }
      },
      (err) => {
        if (err.status === 0) {
          this.connectionInternet = false;
        }
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.toastrService.showToast(type, quote.title, quote.body);
      });
  }
  /*<i>[fin][]</i>
    *@author [CadenaCristian]
    *@since 26/12/2020*/

  /*<i>[ini][]</i>
        *@author [CadenaCristian]
        *@since 04/01/2021
        *Metodo que permite abrir el pop up de agregar e ingresar los datos a agregar*/
  modalAdd() {
    this.dialogService.open(PopupAddVaccinationComponent).onClose.subscribe(() => {
      this.getVaccinaList();
    });
  }
  /*<i>[fin][]</i>
*@author [CadenaCristian]
*@since 04/01/2021*/

  /*<i>[ini][]</i>
   *@author [CadenaCristian]
   *@since 04/01/2021
   *Metodo que permite abrir el pop up de editar y actualizar los datos*/
  modalEdit(item) {
    this.dialogService.open(PopupAddVaccinationComponent, { context: { vaccionationEdit: item } }).onClose.subscribe(() => {
      this.getVaccinaList();
    });
  }
  /*<i>[fin][]</i>
*@author [CadenaCristian]
*@since 04/01/2021*/

  /*<i>[ini][]</i>
  *@author [CadenaCristian]
  *@since 26/12/2020
  *Metodo que permite eliminar los registros creados*/
  onDeleteConfirm(event, id): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.serviceVaccionation.delete(id).subscribe(data => {
        const type = 'success';
        const quote = { title: null, body: 'Vacuna eliminada correctamente' };
        this.toastrService.showToast(type, quote.title, quote.body);
        this.getVaccinaList();
      },
        (err) => {
          const type = 'danger';
          const quote = { title: null, body: err.error.detailMessage };
          this.toastrService.showToast(type, quote.title, quote.body);
        },
      );
    } else {
      event.confirm.reject();
    }
  }
  /*<i>[fin][]</i>
    *@author [CadenaCristian]
    *@since 26/12/2020*/

  onSelectChange(event) {
    if (event === '') {
      this.hideFilters = false;
    }
    if (event !== '') {
      this.hideFilters = true;
    }
  }

  /*<i>[ini][EQUIDOG-6]</i>
  *@author [HaroldHorta]
  *@since 19/01/2021
  *Medoto que ordena del registro mas nuevo al mas antiguo*/
  OrdenListNuevaAntiguo() {
    this.vaccination.sort((a, b) => {
      if (a.createAt < b.createAt) {
        return 1;
      } if (a.createAt > b.createAt) {
        return -1;
      }
      return 0;
    });
  }
  /*<i>[fin][EQUIDOG-6]</i>
    *@author [HaroldHorta]
    *@since 19/01/2021*/

  /*<i>[ini][EQUIDOG-6]</i>
  *@author [HaroldHorta]
  *@since 19/01/2021
  *Medoto que ordena por orden alfabetico */
  OrdenListAlfabetico() {
    this.vaccination.sort((a, b) => {
      if (a.description > b.description) {
        return 1;
      } if (a.description < b.description) {
        return -1;
      }
      return 0;
    });
  }
  /*<i>[fin][EQUIDOG-6]</i>
    *@author [HaroldHorta]
    *@since 19/01/2021*/

}
