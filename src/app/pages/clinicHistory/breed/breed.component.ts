import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition } from '@nebular/theme';
import { ResponseBreed } from '../../../core/models/Response/breed/ResponseBreed';
import { BreedService } from '../../../core/services/breed.service';
import { GeneralService } from '../../../core/services/general.service';
import { PaginationService } from '../../../core/services/pagination.service';
import { PopupAddBreedComponent } from './popup-add-breed/popup-add-breed.component';

@Component({
  selector: 'ngx-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss'],
})
export class BreedComponent implements OnInit {

  hideFilters = false;
  breed: ResponseBreed[];
  searchbreed;
  page: number = 0;
  changeDetectorRef: ChangeDetectorRef;
  breedFilter: ResponseBreed[];
  connectionInternet = true;
  paginatorBreed;

  constructor(private servicebreed: BreedService,
      private toastrService: GeneralService, private dialogService: NbDialogService, private paginationService: PaginationService,
      changeDetectorRef: ChangeDetectorRef) {
      this.changeDetectorRef = changeDetectorRef;
      this.paginationService.paginatornumber$.subscribe(data => {
          this.page = data;
          this.changeDetectorRef.detectChanges();
          this.getBreedList();
      });
      this.getBreedList();
  }
  ngOnInit(): void {
  }

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*Este metodo permite obtener y listar todas las razas que tenemos creadas*/
  getBreedList(tipoDeordenList?) {
      this.servicebreed.getBreedPage(this.page).subscribe(
          breed => {
              this.paginatorBreed = breed;
              this.breed = breed.breeds;
              if (tipoDeordenList === true) {
                  this.OrdenListAlfabetico();
              } else {
                  this.OrdenListNuevaAntiguo();
              }
              this.getBreedFilter();
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
   *Metodo que permite listar todos los clientes para el filtro*/
  getBreedFilter() {
      this.servicebreed.getBreedPageAll().subscribe(
          breed => {
              this.paginationService.paginationCount(this.paginatorBreed);

              this.breedFilter = breed.breeds;
          },
      );
  }
  /*<i>[fin][]</i>
*@author [CadenaCristian]
*@since 04/01/2021*/

  /*<i>[ini][]</i>
       *@author [CadenaCristian]
       *@since 04/01/2021
       *Metodo que permite abrir el pop up de agregar e ingresar los datos a agregar*/
  modalAdd() {
      this.dialogService.open(PopupAddBreedComponent).onClose.subscribe(() => {
          this.getBreedList();
          this.getBreedFilter();
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
      this.dialogService.open(PopupAddBreedComponent, { context: { breedEdit: item } }).onClose.subscribe(() => {
          this.getBreedList();
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
          this.servicebreed.delete(id).subscribe(data => {
              const type = 'success';
              const quote = { title: null, body: 'Raza eliminada correctamente' };
              this.toastrService.showToast(type, quote.title, quote.body);
              this.getBreedList();
              this.getBreedFilter();
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
      this.breed.sort((a, b) => {
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
      this.breed.sort((a, b) => {
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
