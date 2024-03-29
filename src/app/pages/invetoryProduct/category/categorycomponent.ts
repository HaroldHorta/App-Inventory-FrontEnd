import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ResponseCategory } from '../../../core/models/Response/category/ResponseCategory.module';
import { CategoryService } from '../../../core/services/category.service';
import { GeneralService } from '../../../core/services/general.service';
import { PaginationService } from '../../../core/services/pagination.service';
import { PopupAddCategoryComponent } from './popup-add-category/popup-add-category.component';


@Component({
    selector: 'ngx-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {

    index = 1;
    destroyByClick = true;
    duration = 2000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
    hideFilters = false;
    categories: ResponseCategory[];
    searchCategoria;
    page: number = 0;
    changeDetectorRef: ChangeDetectorRef;
    categoryFilter: ResponseCategory[];
    connectionInternet = true;
    paginatorCategories;

    constructor(private serviceCategory: CategoryService,
        private toastrService: GeneralService, private dialogService: NbDialogService, private paginationService: PaginationService,
        changeDetectorRef: ChangeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.paginationService.paginatornumber$.subscribe(data => {
            this.page = data;
            this.changeDetectorRef.detectChanges();
            this.getCategoryList();
        });
        this.getCategoryList();
    }

    /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*Este metodo permite obtener y listar todas las categorias que tenemos creadas*/
    getCategoryList(tipoDeordenList?) {
        this.serviceCategory.getCategoryPage(this.page).subscribe(
            categories => {
                this.paginatorCategories = categories;
                this.categories = categories.categories;
                if (tipoDeordenList === true) {
                    this.OrdenListAlfabetico();
                } else {
                    this.OrdenListNuevaAntiguo();
                }
                this.getCategoryFilter();
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
    getCategoryFilter() {
        this.serviceCategory.getCategoryPageAll().subscribe(
            category => {
                this.paginationService.paginationCount(this.paginatorCategories);

                this.categoryFilter = category.categories;
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
        this.dialogService.open(PopupAddCategoryComponent).onClose.subscribe(() => {
            this.getCategoryList();
            this.getCategoryFilter();
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
        this.dialogService.open(PopupAddCategoryComponent, { context: { categoryEdit: item } }).onClose.subscribe(() => {
            this.getCategoryList();
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
            this.serviceCategory.delete(id).subscribe(data => {
                const type = 'success';
                const quote = { title: null, body: 'Categoria eliminada correctamente' };
                this.toastrService.showToast(type, quote.title, quote.body);
                this.getCategoryList();
                this.getCategoryFilter();
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
        this.categories.sort((a, b) => {
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
        this.categories.sort((a, b) => {
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
