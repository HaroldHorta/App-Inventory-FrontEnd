import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { RequestCategory } from '../../core/models/Request/category/RequestCategory';
import { ResponseCategory } from '../../core/models/Response/category/ResponseCategory.module';
import { CategoryService } from '../../core/services/category.service';


@Component({
    selector: 'ngx-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
    categories: ResponseCategory[];

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

    constructor(private router: Router, private serviceCategory: CategoryService) {
        this.getCategoryList();
    }

    public caregory: RequestCategory = new RequestCategory();

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
        // tslint:disable-next-line:no-console
        console.log('enta aqu', event.newData);
        this.serviceCategory.create(event.newData).subscribe(() => {
            this.router.navigate(['/category']);
        });
    }

    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

}
