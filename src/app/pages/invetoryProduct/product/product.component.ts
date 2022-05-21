import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ResponseProduct } from '../../../core/models/Response/product/ResponseProduct.module';
import { PaginationService } from '../../../core/services/pagination.service';
import { ProductService } from '../../../core/services/product.service';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  productsFilters: ResponseProduct[];
  page: number = 0;
  preview = [1];
  hiddenFilters = false;
  originalDataProduct:  ResponseProduct[];
  dataPaginator;

  mainFilter: any;
  cp: number = 1;
  next = true;
  changeDetectorRef: ChangeDetectorRef;
  currentSorting: string;

  @ViewChild('searchComponent')
  searchComponent: SearchBarComponent;

  sortFilters: any[] = [
    { name: 'Nombre (A to Z)', value: 'name' },
    { name: 'Precio (low to high)', value: 'priceAsc' },
    { name: 'Precio (high to low)', value: 'priceDes' },
  ];

  constructor(private serviceProduct: ProductService, private paginationService: PaginationService, changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;
  }


  ngOnInit(): void {
   /* this.paginationService.paginatornumber$.subscribe(data => {
      this.page = data;
      this.changeDetectorRef.detectChanges();
      this.getProductsList();
    });*/
    this.getProductFilter();
  }

  /*<i>[ini][]</i>
 *@author [CadenaCristian]
 *@since 27/12/2020
 *Metodo para poder filtrar segun el numbre en orden alfabetico o el precio*/
  getProductFilter() {
    this.serviceProduct.getProductsFilter().subscribe(async data => {
      this.originalDataProduct = data;
      this.mainFilter = {
        search: '',
      };
      this.productsFilters = this.originalDataProduct;

      this.sortProducts('name');

    });
  }
  /*<i>[fin][]</i>
   *@author [CadenaCristian]
   *@since 27/12/2020*/


  /*<i>[ini][]</i>
  *@author [CadenaCristian]
  *@since 28/12/2020
  *Metodo para filtrar encargado de detectar algu caracter en el input de search*/
  onSearchChange(search) {
   /* if (search.search === '') {
      this.hiddenFilters = false;
    }*/
    this.mainFilter.search = search.search;

    this.updateProducts({
      type: 'search',
      change: search.change,
    });
  }
  /*<i>[fin][]</i>
   *@author [CadenaCristian]
   *@since 28/12/2020*/

  /*<i>[ini][]</i>
   *@author [CadenaCristian]
   *@since 28/12/2020
   *Metodo que actualiza la feed segun el producto que se va buscando, es decir va mostrando los productos que tengan coincidencia
   *con lo que se esta buscando*/
  updateProducts(filter) {

    let productsSource = this.originalDataProduct;
    const prevProducts = this.productsFilters;
    let filterAllData = true;
    if ((filter.type === 'search' && filter.change === 1)) {
     // this.hiddenFilters = true;
      productsSource = this.productsFilters;
      filterAllData = false;
    }
    /*<i>[fin][]</i>
     *@author [CadenaCristian]
     *@since 28/12/2020*/

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
    if (prevProducts.length <= this.originalDataProduct.length && this.originalDataProduct.length > 1) {
      this.sortProducts(this.currentSorting);
    }

  }

  /*<i>[ini][]</i>
   *@author [CadenaCristian]
   *@since 28/12/2020
   *Metodo que se encarga de convertir todo a minisculas y comparar si es lo que se esta buscando o no*/
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
      /*<i>[fin][]</i>
*@author [CadenaCristian]
*@since 28/12/2020*/
}
