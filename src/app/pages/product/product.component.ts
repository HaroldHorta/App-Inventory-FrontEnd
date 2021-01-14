import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ResponseProduct } from '../../core/models/Response/product/ResponseProduct.module';
import { PaginationService } from '../../core/services/pagination.service';
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
  page: number = 0;
  preview = [1];
  hiddenFilters = false;
  originalDataProduct: any;
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
    this.paginationService.paginatornumber$.subscribe(data => {
      this.page = data;
      this.changeDetectorRef.detectChanges();
      this.getProductsList();
    });
    this.getProductsList();
  }

  /*<i>[ini][]</i>
  *@author [CadenaCristian]
  *@since 27/12/2020
  *Metodo para llamar la lista de productos, con un listado de maximo 10 por pagina*/
  getProductsList() {
    this.serviceProduct.getProductsFilters(this.page).subscribe(async product => {
      this.dataPaginator = product;
      this.products = product.products;
      this.getProductFilter();

    },
    );
  }
  /*<i>[fin][]</i>
    *@author [CadenaCristian]
    *@since 27/12/2020*/

  /*<i>[ini][]</i>
 *@author [CadenaCristian]
 *@since 27/12/2020
 *Metodo para poder filtrar segun el numbre en orden alfabetico o el precio*/
  getProductFilter() {
    this.serviceProduct.getProductsFilter().subscribe(async data => {
      this.originalDataProduct = data;
      //  this.pagination = new Array(Math.ceil(data.count / 10));
      this.paginationService.paginationCount(this.dataPaginator);
      this.mainFilter = {
        search: '',
      };
      this.productsFilters = this.originalDataProduct.products.slice(0);

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
    if (search.search === '') {
      this.hiddenFilters = false;
    }
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

    let productsSource = this.originalDataProduct.products;
    const prevProducts = this.productsFilters;
    let filterAllData = true;
    if ((filter.type === 'search' && filter.change === 1)) {
      this.hiddenFilters = true;
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
    if (prevProducts.length <= this.originalDataProduct.products.length && this.originalDataProduct.products.length > 1) {
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
