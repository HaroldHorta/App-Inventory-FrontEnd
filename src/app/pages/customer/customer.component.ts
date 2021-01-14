import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { ResponseCustomer } from '../../core/models/Response/customer/ResponseCustomer.module';
import { CustomerService } from '../../core/services/customer.service';
import { GeneralService } from '../../core/services/general.service';
import { CreateCustomerPopupComponent } from './create-customer-popup/create-customer-popup.component';
import { PaginationService } from '../../core/services/pagination.service';

@Component({
  selector: 'ngx-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {

  customers: ResponseCustomer[];
  customerFilter: ResponseCustomer[];
  originalDataProduct: any;
  hideFilters = false;
  searchCustomer;
  mainFilter: any;
  page: number = 0;
  changeDetectorRef: ChangeDetectorRef;
  connectionInternet = true;
  prueba = 1;
  cantidadTotalData;


  constructor(private dialog: NbDialogService, private serviceCustomer: CustomerService, private toastrService: GeneralService,
    private paginationService: PaginationService, changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;
    this.paginationService.paginatornumber$.subscribe(data => {
      this.page = data;
      this.changeDetectorRef.detectChanges();
      this.getCustomerList();
    });
    this.getCustomerList();
    this.getCustomerFilter();
  }

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*metodo que lista os clientes por paginacion*/
  getCustomerList(prueba?) {
    this.serviceCustomer.getCustomerPage(this.page).subscribe(
      customers => {
        this.customers = customers.customers;
        if (this.prueba === 1) {
          this.customers.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          });
          this.getCustomerFilter();
        } else if (this.prueba === 2) {
          this.customers.sort((a, b) => {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            return 0;
          });
          this.getCustomerFilter();
        } else {
          this.customers.sort((a, b) => {
            if (a.phone < b.phone) {
              return 1;
            }
            if (a.phone > b.phone) {
              return -1;
            }
            return 0;
          });
          this.getCustomerFilter();
        }
      },
      (err) => {
        if (err.status === 0) {
          this.connectionInternet = false;
        }
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.toastrService.showToast(type, quote.title, quote.body);
      });
  }
  /*<i>[fin][]</i>
    *@author [CadenaCristian]
    *@since 26/12/2020*/


  /*<i>[ini][EQUIDOG-6]</i>
*@author [HaroldHorta]
*@since 31/12/2020
*Metodo que permite listar todos los clientes para el filtro*/


  getCustomerFilter() {
    this.serviceCustomer.getCustomerPageAll().subscribe(
      customers => {
        this.originalDataProduct = customers;
        this.cantidadTotalData = customers.customers.length;
        this.paginationService.paginationCount(customers, this.cantidadTotalData);
        this.customerFilter = this.originalDataProduct.customers.slice(0);
      });
  }
  /*<i>[fin][]</i>
    *@author [HaroldHorta]
    *@since 31/12/2020*/

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*Este metodo se encarga de eliminar el registro que se elija, funciona llamando el metodo delete del serviceCustomer el cual recibe un ID
*que es un string y prosigue mostrando una ventana de pregunta si esta seguro de eliminar el dato y luego una alerta de confirmacion*/
  onDeleteConfirm(id): void {
    if (window.confirm('¿Seguro de eliminar este registro?')) {
      this.serviceCustomer.delete(id).subscribe(data => {
        const type = 'success';
        const quote = { title: null, body: 'Customer eliminado correctamente' };
        this.toastrService.showToast(type, quote.title, quote.body);
        this.getCustomerList();
      },
        (err) => {
          const type = 'danger';
          const quote = { title: null, body: err.error.detailMessage };
          this.toastrService.showToast(type, quote.title, quote.body);
        });
    }
  }

  /*<i>[fin][]</i>
        *@author [CadenaCristian]
        *@since 26/12/2020*/

  /*<i>[ini][EQUIDOG-6]</i>
*@author [HaroldHorta]
*@since 30/12/2020
*Metodo encargado de desplegar el popup para crear el cliente */
  openAddProduct() {
    this.dialog.open(CreateCustomerPopupComponent).onClose.subscribe(() => {
      this.customers = [];
      this.getCustomerList();
    });
  }
  /*<i>[fin][EQUIDOG-6]</i>
      *@author [HaroldHorta]
      *@since 30/12/2020*/

  /*<i>[ini][EQUIDOG-6]</i>
 *@author [HaroldHorta]
 *@since 31/12/2020
 *Medoto que abre el popup para editar el cliente */
  openModalEdit(item) {
    this.dialog.open(CreateCustomerPopupComponent, { context: { customerEdit: item } }).onClose.subscribe(() => {
      this.customers = [];
      this.getCustomerList();
    });
  }
  /*<i>[fin][EQUIDOG-6]</i>
       *@author [HaroldHorta]
       *@since 31/12/2020*/


  onSelectChange(event) {

    if (event === '') {
      this.hideFilters = false;
    }
    if (event !== '') {
      this.hideFilters = true;
    }

  }
}




