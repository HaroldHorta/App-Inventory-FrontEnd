import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { ResponseCustomer } from '../../core/models/Response/customer/ResponseCustomer.module';
import { CustomerService } from '../../core/services/customer.service';
import { GeneralService } from '../../core/services/general.service';

@Component({
  selector: 'ngx-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  customers: ResponseCustomer[];
  hideError = false;

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
      name: {
        title: 'NOMBRE',
        type: 'string',
      },
      typeDocument: {
        title: 'TIPO DE DOCUMENTO',
        type: 'TypeDocument',
      },
      nroDocument: {
        title: 'NUMERO DE DOCUMENTO',
        type: 'string',
      },
      email: {
        title: 'EMAIL',
        type: 'string',
      },
      address: {
        title: 'DIRECCIÓN',
        type: 'string',
      },
      phone: {
        title: 'TELEFONO',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor( private dialog: NbDialogService, private serviceCustomer: CustomerService, private toastrService: GeneralService) {
    this.getCustomerList();
  }

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*Este metodo se encarga de listar los datos, llamando el metodo getCustomers del servicio serviceCustomer*/
  getCustomerList() {
    this.serviceCustomer.getCustomers().subscribe(
      customers => {
        this.customers = customers;
        this.source.load(this.customers);
      },
    );
  }
  /*<i>[fin][]</i>
    *@author [CadenaCristian]
    *@since 26/12/2020*/

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*Este metodo se encarga de crear nuevos usuarios y funciona evaluando que los campos no vengan vacios para poder ingresar el dato, 
*en tal caso se envia una alerta informando que el campo es obligatorio, tambien pregunta si esta seguro de crear el nuevo usuario
*que se quiere ingresar*/
  onCreateConfirm(event): void {
    console.log("Estes event: ", event);
    if (event.newData.description === '') {
      const type = 'danger';
      const quote = { title: null, body: 'El customer no puede ir vacio' };

      this.toastrService.showToast(type, quote.title, quote.body);
    } else {

      if (window.confirm('¿Esta seguro de agregar este customer?')) {
        this.serviceCustomer.create(event.newData).subscribe(() => {
          event.confirm.resolve();
          this.hideError = false;

          const type = 'success';
          const quote = { title: null, body: 'Customer agregado correctamente' };
          this.toastrService.showToast(type, quote.title, quote.body);
        },
          (err) => {
            const type = 'danger';
            if (err.error.status.code === '400') {
              this.hideError = true;
              const quotes = { title: null, body: 'Error en el tipo de documento' };
              this.toastrService.showToast(type, quotes.title, quotes.body);
            } else {
              const quote = { title: null, body: err.error.detailMessage };
              this.toastrService.showToast(type, quote.title, quote.body);
            }
          },
        );
      } else {
        event.confirm.reject();
      }
    }
  }
  /*<i>[fin][]</i>
      *@author [CadenaCristian]
      *@since 26/12/2020*/

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 26/12/2020
*Este metodo se encarga de eliminar el registro que se elija, funciona llamando el metodo delete del serviceCustomer el cual recibe un ID
*que es un string y prosigue mostrando una ventana de pregunta si esta seguro de eliminar el dato y luego una alerta de confirmacion*/
  onDeleteConfirm(event): void {
    if (window.confirm('¿Seguro de eliminar este registro?')) {
      this.serviceCustomer.delete(event.data.id).subscribe(data => {
        const type = 'success';
        const quote = { title: null, body: 'Customer eliminado correctamente' };
        this.toastrService.showToast(type, quote.title, quote.body);
      });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event): void {

    if (event.newData.description === '') {
      const type = 'danger';
      const quote = { title: null, body: 'Customer no puede ir vacio' };
      this.toastrService.showToast(type, quote.title, quote.body);
    } else {
      if (window.confirm('¿Esta seguro de actualizar el customer?')) {
        this.serviceCustomer.update(event.newData).subscribe(() => {
        });
        const type = 'success';
        const quote = { title: null, body: 'Categoria actualizada correctamente' };
        this.toastrService.showToast(type, quote.title, quote.body);
        event.confirm.resolve();

      } else {
        event.confirm.reject();
      }
    }
  }
}

/*<i>[fin][]</i>
      *@author [CadenaCristian]
      *@since 26/12/2020*/