import { Component, OnInit, ViewChild } from '@angular/core';
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
  productsFilters: ResponseProduct[];
  pagination: any[];
  page: number = 0;
  preview = [1];
  hiddenFilters = false;


  originalDataProduct: any;

  mainFilter: any;
  cp: number = 1;
  next = true;

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
    this.pagination;
    this.getProductsList();
    this.getProductFilter();
  }
  // metodo para llamar la lista de productos
  getProductsList() {
    this.serviceProduct.getProductsFilters(this.page).subscribe(
      product => {
        this.pagination = new Array(Math.ceil(product.count / 10));
        this.products = product.products;

      },
    );
  }

  getProductFilter() {
    this.serviceProduct.getProductsFilter().subscribe(data => {
      this.originalDataProduct = data;
      this.pagination = new Array(Math.ceil(data.count / 10));
      this.mainFilter = {
        search: '',
      };
      this.productsFilters = this.originalDataProduct.products.slice(0);

      this.sortProducts('name');

    });
  }

  setPage(i) {
    this.hiddenFilters = false;
    this.page = i;
    this.getProductsList();
  }

  onSearchChange(search) {
    if (search.search === '') {
      this.hiddenFilters = false;
    }
    this.mainFilter.search = search.search;

    this.updateProducts({
      type: 'search',
      change: search.change,
    });
  }

  updateProducts(filter) {

    let productsSource = this.originalDataProduct.products;
    const prevProducts = this.productsFilters;
    let filterAllData = true;
    if ((filter.type === 'search' && filter.change === 1)) {
      this.hiddenFilters = true;
      productsSource = this.productsFilters;
      filterAllData = false;
    }

    this.productsFilters = productsSource.filter(product => {
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
    if (prevProducts.length <= this.originalDataProduct.products.length && this.originalDataProduct.products.length > 1) {
      this.sortProducts(this.currentSorting);
    }

  }

  sortProducts(criteria) {
    this.productsFilters.sort((a, b) => {
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
