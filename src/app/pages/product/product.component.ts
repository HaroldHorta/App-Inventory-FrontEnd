import { Component, OnInit, ViewChild } from '@angular/core';
import { ResponseCategory } from '../../core/models/Response/category/ResponseCategory.module';
import { ResponseProduct } from '../../core/models/Response/product/ResponseProduct.module';
import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  products: ResponseProduct[];
  originalDataProduct: any[];

  mainFilter: any;

  currentSorting: string;

  @ViewChild('searchComponent')
  searchComponent: SearchBarComponent;

  sortFilters: any[] = [
    { name: 'Nombre (A to Z)', value: 'name' },
    { name: 'Precio (low to high)', value: 'priceAsc' },
    { name: 'Precio (high to low)', value: 'priceDes' },
  ];

  constructor(private serviceProduct: ProductService, private serviceCategory: CategoryService) { }


  ngOnInit(): void {
    this.getProductsList();
  }
  // metodo para llamar la lista de productos
  getProductsList() {
    this.serviceProduct.getProductsFilters().subscribe(
      product => {
        this.originalDataProduct = product;
        this.mainFilter = {
          search: '',
        };
        this.products = this.originalDataProduct.slice(0);
        this.sortProducts('name');
      },
    );
  }

  onSearchChange(search) {
    this.mainFilter.search = search.search;

    this.updateProducts({
      type: 'search',
      change: search.change,
    });
  }

  updateProducts(filter) {

    let productsSource = this.originalDataProduct;
    const prevProducts = this.products;
    let filterAllData = true;
    if ((filter.type === 'search' && filter.change === 1)) {
      productsSource = this.products;
      filterAllData = false;
    }

    this.products = productsSource.filter(product => {
      // Filter by search
      if (filterAllData || filter.type === 'search') {
        if (!product.name.match(new RegExp(this.mainFilter.search, 'i'))) {
          return false;
        }
      }

      return true;
    });

   // If the number of products increased after the filter has been applied then sort again
   // If the number of products remained equal, there's a high chance that the items have been reordered.
    if (prevProducts.length <= this.originalDataProduct.length && this.originalDataProduct.length > 1) {
      this.sortProducts(this.currentSorting);
    }

  }

  sortProducts(criteria) {
    this.products.sort((a, b) => {
      const priceComparison = a.priceSell - b.priceSell;
      if (criteria === 'name') {
        const nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      } else {
        // Keep the same order in case of any unexpected sort criteria
        return -1;
      }
    });
    this.currentSorting = criteria;
  }
}
