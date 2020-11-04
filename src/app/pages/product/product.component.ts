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

  originalDataProduct: ResponseProduct[] = new Array();
  categories: ResponseCategory[] = new Array();
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
    this.getCategoryList();

  }
  // metodo para llamar la lista de productos
  getProductsList() {
    this.serviceProduct.getProductsFilters().subscribe(
      product => {
        this.originalDataProduct = product;
        this.mainFilter = {
          search: '',
          categories: this.categories.slice(0),
        };
        this.originalDataProduct = this.originalDataProduct.slice(0);
        this.sortProducts('name');
      },
    );
  }

  getCategoryList() {
    this.serviceCategory.getCategories().subscribe(
      categories => {
        this.categories = categories;
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

  onFilterChange(data) {
    if (data.type === 'category') {
      if (data.isChecked) {
        this.mainFilter.categories.push(data.filter);
      } else {
        this.mainFilter.categories = this.mainFilter.categories.filter(
          category => {
            return category.id !== data.filter.id;
          });
      }
    } else if (data.type === 'custom') {
      this.mainFilter.customFilter = data.filter;
    } else if (data.type === 'price') {
      this.mainFilter.priceFilter = data.filter;
    }
    this.updateProducts({
      type: data.type,
      change: data.change,
    });
  }

  updateProducts(filter) {
    let productsSource = this.originalDataProduct;
    const prevProducts = this.originalDataProduct;
    let filterAllData = true;
    if ((filter.type === 'search' && filter.change === 1) || (filter.type === 'category' && filter.change === -1)) {
      productsSource = this.originalDataProduct;
      filterAllData = false;
    }
    // console.log('filtering ' + productsSource.length + ' products')

    this.originalDataProduct = productsSource.filter(product => {
      // Filter by search
      if (filterAllData || filter.type === 'search') {
        if (!product.name.match(new RegExp(this.mainFilter.search, 'i'))) {
          return false;
        }
      }

      // Filter by categories
      if (filterAllData || filter.type === 'category') {
        let passCategoryFilter = false;
        product.category.forEach(product_category => {
          if (!passCategoryFilter) {
            passCategoryFilter = this.mainFilter.categories.reduce((found, category) => {
              return found || product_category === category.id;
            }, false);
          }
        });
        if (!passCategoryFilter) {
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

    // These two types of filters usually add new data to the products showcase so a sort is necessary
    if (filter.type === 'custom' || filter.type === 'price') {
      this.sortProducts(this.currentSorting);
    }
  }

  sortProducts(criteria) {
    // console.log('sorting ' + this.products.length + ' products')
    this.originalDataProduct.sort((a, b) => {
      const priceComparison = a.priceSell - b.priceSell;
      if (criteria === 'priceDes') {
        return -priceComparison;
      } else if (criteria === 'priceAsc') {
        return priceComparison;
      } else if (criteria === 'name') {
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
