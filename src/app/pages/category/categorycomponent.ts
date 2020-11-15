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
    errorMessage = '';

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
        columns: {
            description: {
                title: 'description',
                type: 'string',
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(private router: Router, private serviceCategory: CategoryService, private toastrService: GeneralService) {
        this.getCategoryList();
    }

    getCategoryList() {
        this.serviceCategory.getCategories().subscribe(
            categories => {
                this.categories = categories;
                const data = this.categories;
                this.source.load(data);
            },
        );
    }


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

    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            this.serviceCategory.delete(event.data.id).subscribe(data => {
                const type = 'success';
                const quote = { title: null, body: 'Categoria eliminada correctamente' };
                this.toastrService.showToast(type, quote.title, quote.body);
                event.confirm.resolve();
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

