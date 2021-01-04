import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ResponseCategory } from '../../core/models/Response/category/ResponseCategory.module';
import { CategoryService } from '../../core/services/category.service';
import { GeneralService } from '../../core/services/general.service';
import { PaginationService } from '../../core/services/pagination.service';
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

    source: LocalDataSource = new LocalDataSource();

    constructor(private router: Router, private serviceCategory: CategoryService,
        private toastrService: GeneralService, private dialogService: NbDialogService, private paginationService: PaginationService,
        changeDetectorRef: ChangeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.paginationService.paginatornumber$.subscribe(data => {
            this.page = data;
            this.changeDetectorRef.detectChanges();
            this.getCategoryList();
        });
        this.getCategoryList();
        this.getCategoryFilter();
    }

    /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*Este metodo permite obtener y listar todas las categorias que tenemos creadas*/
    getCategoryList() {
        this.serviceCategory.getCategoryPage(this.page).subscribe(
            categories => {
                this.categories = categories.categories;
            },
        );
    }
    /*<i>[fin][]</i>
      *@author [CadenaCristian]
      *@since 26/12/2020*/

    getCategoryFilter() {
        this.serviceCategory.getCategoryPageAll().subscribe(
            category => {
                this.categoryFilter = category.categories;
                this.paginationService.paginationCount(category);
            }
        )
    }

    modalAdd() {
        this.dialogService.open(PopupAddCategoryComponent).onClose.subscribe(() => {
            this.getCategoryList();
            this.getCategoryFilter();
        })
    }

    modalEdit(item) {
        this.dialogService.open(PopupAddCategoryComponent, { context: { categoryEdit: item } }).onClose.subscribe(() => {
            this.getCategoryList();
        })
    }

    /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*Este metodo usa una tabla llamada smart Table, la cual deja alterar la fucnionalidad de los botones que el trae predeterminados, este metodo 
se usa para eliminar una categoria existente*/
    onDeleteConfirm(event, id): void {
        if (window.confirm('Are you sure you want to delete?')) {
            this.serviceCategory.delete(id).subscribe(data => {
                const type = 'success';
                const quote = { title: null, body: 'Categoria eliminada correctamente' };
                this.toastrService.showToast(type, quote.title, quote.body);
                this.getCategoryList();
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
}
