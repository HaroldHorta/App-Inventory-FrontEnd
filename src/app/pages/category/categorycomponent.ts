import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ResponseCategory } from '../../core/models/Response/category/ResponseCategory.module';
import { CategoryService } from '../../core/services/category.service';
import { GeneralService } from '../../core/services/general.service';


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
    categories: ResponseCategory[];
    searchProduct;

    settings = {
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmCreate: true,
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave: true,
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        filter: {
            type: 'Buscar',
        },
        columns: {
            description: {
                title: 'Descripción',
                type: 'string',
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(private router: Router, private serviceCategory: CategoryService, private toastrService: GeneralService) {
        this.getCategoryList();
    }

    /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*Este metodo permite obtener y listar todas las categorias que tenemos creadas*/
    getCategoryList() {
        this.serviceCategory.getCategories().subscribe(
            categories => {
                this.categories = categories;
                const data = this.categories;
                this.source.load(data);
            },
        );
    }
    /*<i>[fin][]</i>
      *@author [CadenaCristian]
      *@since 26/12/2020*/


    //   open3() {
    //     this.dialogService.open(DialogNamePromptComponent)
    //       .onClose.subscribe(name => name && this.names.push(name));
    //   }
    // cancel() {
    //     this.ref.close();
    //   }
    
    //   submit(name) {
    //     this.ref.close(name);
    //   }

    /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*Este metodo usa una tabla llamada smart Table, la cual deja alterar la fucnionalidad de los botones que el trae predeterminados y este
metodo se usa para agregar una categoria*/
    onCreateConfirm(event): void {
        if (event.newData.description === '') {
            const type = 'danger';
            const quote = { title: null, body: 'La Categoría no puede ir vacia' };

            this.toastrService.showToast(type, quote.title, quote.body);
        } else {

            if (window.confirm('¿Esta seguro de agregar la categoria?')) {
                this.serviceCategory.create(event.newData).subscribe(() => {
                    event.confirm.resolve();
                    const type = 'success';
                    const quote = { title: null, body: 'Categoria agregada correctamente' };
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
    }
    /*<i>[fin][]</i>
      *@author [CadenaCristian]
      *@since 26/12/2020*/

    /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*Este metodo usa una tabla llamada smart Table, la cual deja alterar la fucnionalidad de los botones que el trae predeterminados, este metodo 
se usa para eliminar una categoria existente*/
    onDeleteConfirm(event, id): void {
        console.log("si entro: ", id)
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

    /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*Este metodo usa una tabla llamada smart Table, la cual deja alterar la fucnionalidad de los botones que el trae predeterminados, este metodo 
se usa para editar una categoria existente*/
    onSaveConfirm(event): void {

        if (event.newData.description === '') {
            const type = 'danger';
            const quote = { title: null, body: 'La Categoría no puede ir vacia' };
            this.toastrService.showToast(type, quote.title, quote.body);
        } else {
            if (window.confirm('¿Esta seguro de actualizar la categoria?')) {
                this.serviceCategory.update(event.newData).subscribe(() => {
                    const type = 'success';
                    const quote = { title: null, body: 'Categoria actualizada correctamente' };
                    this.toastrService.showToast(type, quote.title, quote.body);
                    event.confirm.resolve();
                });

            } else {
                event.confirm.reject();
            }
        }
    }

}

    /*<i>[fin][]</i>
  *@author [CadenaCristian]
  *@since 26/12/2020*/
