import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NbDialogService, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Status } from '../../../core/models/enum/Status.enum';
import { ResponseProduct } from '../../../core/models/Response/product/ResponseProduct.module';
import { FileUploadService } from '../../../core/services/file-upload.service';
import { GeneralService } from '../../../core/services/general.service';
import { ProductService } from '../../../core/services/product.service';
import { PopDetailsComponent } from './pop-details/pop-details.component';
import { PopupComponent } from './popup/popup.component';
import { PopUpdateUnitsComponent } from './pop-update-units/pop-update-units.component';
import { InventoryService } from '../../../core/services/inventory.service';
import { PaginationService } from '../../../core/services/pagination.service';

@Component({
  selector: 'ngx-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})

export class InventoryComponent implements OnInit {

  product: ResponseProduct[];
  changeDetectorRef: ChangeDetectorRef;
  urls = [];
  productList = [];
  productListFilter = [];
  searchProduct;
  total: number = 0;
  hideFilters = false;
  page: number = 0;
  dataPaginator;

  constructor(private serviceProduct: ProductService, private inventoryService: InventoryService,
    changeDetectorRef: ChangeDetectorRef,
    private generalService: GeneralService,
    private dialog: NbDialogService,
    private fileUpload: FileUploadService,
    private paginationService: PaginationService) {
    this.changeDetectorRef = changeDetectorRef;

    this.paginationService.paginatornumber$.subscribe(data => {
      this.page = data;
      this.changeDetectorRef.detectChanges();
      this.getProductList();
    });
    this.getProductList();
  }

  ngOnInit(): void {
  }

  /*<i>[ini][]</i>
  *@author [CadenaCristian]
  *@since 23/12/2020
  *Metodo que permite obtener y listar todos los datos correspondientes a los productos, por medio de un service getProducts que es
  *invocado desde el serviceProduct */
  getProductList(ordenList?) {
    this.inventoryService.getProductsInventoryFilters().subscribe(
      product => {
        this.dataPaginator = product;
        this.productList = [];
        this.product = product.products;
        if (ordenList) {
          this.ordenAlfabetico();
        } else {
          this.ordenMasNuevoMasAntiguo();
        }
        this.total = product.products.length;
        this.product.forEach(p => {
          this.productList.push(p);
        });
      //  this.getProductListFilter();
      },
    );
  }
  /*<i>[fin][]</i>
  *@author [CadenaCristian]
  *@since 23/12/2020*/

  /*<i>[ini][]</i>
   *@author [CadenaCristian]
   *@since 04/01/2021
   *Metodo que permite listar todos los clientes para el filtro*/
  // getProductListFilter() {
  //   this.inventoryService.getProductsInventoryFilters().subscribe(
  //     product => {
  //       this.paginationService.paginationCount(this.dataPaginator);
  //       this.productListFilter = [];
  //       this.product = product.products;
  //       this.total = product.products.length;
  //       this.product.forEach(p => {
  //         this.productListFilter.push(p);
  //       });
  //     },
  //   );
  // }
  /*<i>[fin][]</i>
  *@author [CadenaCristian]
  *@since 04/01/2021

  /*<i>[ini][]</i>
  *@author [CadenaCristian]
  *@since 23/12/2020
  *Metodo que permite abrir un pop-up que se encuentra en pop-up.componet.ts, el cual nos permite agregar
  *un producto nuevo y tambien permite
  *recargar el listado de productos despues de haber terminado de registrar los datos del nuevo producto*/
  open() {
    this.dialog.open(PopupComponent).onClose.subscribe(() => {
      this.productList = [];
      this.getProductList();
    });
  }
  /*<i>[fin][]</i>
  *@author [CadenaCristian]
  *@since 23/12/2020*/

  /*<i>[ini][]</i>
  *@author [CadenaCristian]
  *@since 23/12/2020
  *Metodo que permite abrir un pop-up que se encuentra en pop-up.componet.ts, el cual nos permite editar un producto existente en el cual
  *se le pasa un arreglo que contiene un objeto y tambien permite recargar el listado de productos despues de haber terminado de editar*/
  openModal(item) {
    this.dialog.open(PopupComponent, { context: { productEdit: item } }).onClose.subscribe(() => {
      this.productList = [];
      this.getProductList();
    });
  }
  /*<i>[fin][]</i>
    *@author [CadenaCristian]
    *@since 23/12/2020*/

  /*<i>[ini][]</i>
  *@author [CadenaCristian]
  *@since 22/12/2020
  *Metodo que abre el Pop Up con los detaller del producto, recibe el ID del producto
  *y va al componente pop-details.component.ts y ejecuta el metodo getProductById */
  openModalDetails(item) {
    this.dialog.open(PopDetailsComponent, { context: { idProduct: item } });
  }
  /*<i>[fin][]</i>
  *@author [CadenaCristian]
  *@since 22/12/2020*/

  /*<i>[ini][]</i>
  *@author [CadenaCristian]
  *@since 23/12/2020
  *Metodo que abre el Pop Up que permite agregar unidades en las existencias de los productos ya creados, el cual recibe el ID del producto
  *con el cual tenemos acceso a la informacion de ese producto, pero solo se altera y se muestra la cantidad de unidades disponibles*/
  unitModal(item) {
    this.dialog.open(PopUpdateUnitsComponent, { context: { units: item } }).onClose.subscribe(() => {
      this.productList = [];
      this.getProductList();

    });
  }
  /*<i>[fin][]</i>
   *@author [CadenaCristian]
   *@since 23/12/2020*/

  /*<i>[ini][]</i>
  *@author [CadenaCristian]
  *@since 23/12/2020
  *Metodo que permite cambiar el estado del producto de ACTIVO a DESACTIVADO y viceversa, el cual recibe
  *el cual recibe un evento y el ID del
  *producto del cual se quiere cambiar el status y evalua si product.status === 'ACTIVE' o 'INACTIVE'*/
  updateStatus(event, id) {
    let message;
    let status;
    if (event) {
      message = 'El producto se activo correctamente';
      status = Status.ACTIVE;
    } else {
      message = 'El producto se desactivo correctamente';
      status = Status.INACTIVE;
    }
    this.serviceProduct.updateStatus(id, status).subscribe(
      data => {
        this.product = data;
        const type = 'success';
        const quote = { title: null, body: message };
        this.generalService.showToast(type, quote.title, quote.body);
        this.productList = [];
        this.getProductList();
      },
    );
  }
  /*<i>[fin][]</i>
   *@author [CadenaCristian]
   *@since 23/12/2020*/

  /*<i>[ini][]</i>
 *@author [CadenaCristian]
 *@since 23/12/2020
 *Metodo que recibe un evento y un ID del producto especifico, el cual abre el explorador de archivos del pc en el cual se este usando y
 *permite subir la imagen que se desea cargar a ese producto, este o no este vacia la imagen del producto*/
  onSelectFile(idProduct, event) {
    if (event.target.files && event.target.files[0]) {
      for (let i = 0; i < 1; i++) {
        const reader = new FileReader();
        reader.onload = (events: any) => {
          this.urls.push(events.target.result);
          const obj = { idProduct: idProduct, dataPhoto: this.urls[0] };
          this.fileUpload.create(obj).subscribe(() => {
            this.urls = [];
            this.productList = [];
            const type = 'success';
            const quote = { title: null, body: 'Imagen actualizado correctamente' };
            this.generalService.showToast(type, quote.title, quote.body);
            this.getProductList();
          },
            (err) => {
              const type = 'danger';
              const quote = { title: null, body: err.error.detailMessage };
              this.generalService.showToast(type, quote.title, quote.body);
            });
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  /*<i>[fin][]</i>
  *@author [CadenaCristian]
  *@since 23/12/2020*/


  onSelectChange(event) {

    if (event === '') {
      this.hideFilters = false;
    }
    if (event !== '') {
      this.hideFilters = true;
    }
  }

  ordenAlfabetico() {
    this.product.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }
  ordenMasNuevoMasAntiguo() {
    this.product.reverse();
  }

}
