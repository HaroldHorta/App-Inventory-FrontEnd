import { Component, OnInit } from '@angular/core';
import { ResponseCategory } from '../../../../core/models/Response/category/ResponseCategory.module';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'ngx-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  cate
  categories: ResponseCategory [];
  errores: string [];

  constructor(private serviceCategory: CategoryService) { }

  ngOnInit(): void {
    this.getCategoriesList();
  }

  getCategoriesList(){
    this.serviceCategory.getCategories().subscribe(
      categories => {
        this.categories = categories;
        console.log("Este es el listado de categorias", this.categories)
      }
    )
  }
}
