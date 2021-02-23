import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ResponseSpecies } from '../../../core/models/Response/species/ResponseSpecies';
import { GeneralService } from '../../../core/services/general.service';
import { SpeciesService } from '../../../core/services/species.service';
import { PopupAddSpeciesComponent } from './popup-add-species/popup-add-species.component';

@Component({
  selector: 'ngx-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss'],
})
export class SpeciesComponent implements OnInit {

  hideFilters = false;
  species: ResponseSpecies[] = [];
  searchSpecies;
  changeDetectorRef: ChangeDetectorRef;
  connectionInternet = true;
  paginatorSpecies;

  constructor(private serviceSpecies: SpeciesService,
    private toastrService: GeneralService, private dialogService: NbDialogService,
    changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;

    this.getSpeciesList();
  }
  ngOnInit(): void {
  }

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*Este metodo permite obtener y listar todas las razas que tenemos creadas*/
  getSpeciesList(tipoDeordenList?) {
    this.serviceSpecies.getSpecies().subscribe(
      species => {
        this.species = species;
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
    this.dialogService.open(PopupAddSpeciesComponent).onClose.subscribe(() => {
      this.getSpeciesList();
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
    this.dialogService.open(PopupAddSpeciesComponent, { context: { speciesEdit: item } }).onClose.subscribe(() => {
      this.getSpeciesList();
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
      this.serviceSpecies.delete(id).subscribe(data => {
        const type = 'success';
        const quote = { title: null, body: 'Especie eliminada correctamente' };
        this.toastrService.showToast(type, quote.title, quote.body);
        this.getSpeciesList();
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
    this.species.sort((a, b) => {
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
    this.species.sort((a, b) => {
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
