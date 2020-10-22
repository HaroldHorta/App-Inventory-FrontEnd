import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { ResponseCustomer } from '../../core/models/Response/customer/ResponseCustomer.module';
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'ngx-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  customers: ResponseCustomer[];

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
        title: 'NAME',
        type: 'string',
      },
      email: {
        title: 'EMAIL',
        type: 'string',
      },
      address: {
        title: 'ADDRESS',
        type: 'string',
      },
      phone: {
        title: 'PHONE',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private serviceCustomer: CustomerService, private toastrService: NbToastrService) {
    this.getCustomerList();
  }

  getCustomerList() {
    this.serviceCustomer.getCustomers().subscribe(
      customers => {
        this.customers = customers;
        const data = this.customers;
        this.source.load(data);
      },
    );
  }

  onCreateConfirm(event): void {
    if (event.newData.description === '') {
      const type = 'danger';
      const quote = { title: null, body: 'El customer no puede ir vacio' };

      this.showToast(type, quote.title, quote.body);
    } else {

      if (window.confirm('¿Esta seguro de agregar este customer?')) {
        this.serviceCustomer.create(event.newData).subscribe(() => { });
        event.confirm.resolve();
        const type = 'success';
        const quote = { title: null, body: 'Customer agregado correctamente' };
        this.showToast(type, quote.title, quote.body);
      } else {
        event.confirm.reject();
      }
    }
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';

    this.toastrService.show(
      body,
      `Alerta ${titleContent}`,
      config);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('¿Seguro de eliminar este registro?')) {
      this.serviceCustomer.delete(event.data.id).subscribe(data => {
        const type = 'success';
        const quote = { title: null, body: 'Customer eliminado correctamente' };
        this.showToast(type, quote.title, quote.body);
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
      this.showToast(type, quote.title, quote.body);
    } else {
      if (window.confirm('¿Esta seguro de actualizar el customer?')) {
        this.serviceCustomer.update(event.newData).subscribe(() => {
        });
        const type = 'success';
        const quote = { title: null, body: 'Categoria actualizada correctamente' };
        this.showToast(type, quote.title, quote.body);
        event.confirm.resolve();

      } else {
        event.confirm.reject();
      }
    }
  }
}
