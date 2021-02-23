import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { type } from 'jquery';
import { ResponseCustomer } from '../../../../core/models/Response/customer/ResponseCustomer.module';
import { CustomerService } from '../../../../core/services/customer.service';
import { GeneralService } from '../../../../core/services/general.service';

@Component({
  selector: 'ngx-create-customer-popup',
  templateUrl: './create-customer-popup.component.html',
  styleUrls: ['./create-customer-popup.component.scss'],
})
export class CreateCustomerPopupComponent implements OnInit {

  checkOutForm: FormGroup;
  checkOutFormEdit: FormGroup;
  typeDocument = [
    'CC',
    'TI',
    'CE',
    'PASSPORT',
  ];

  selectedOption;
  loadingLargeGroup = false;
  disabledUpdate = false;
  nroDocument: string;
  customerEdit: ResponseCustomer;
  selectedItemEdit;

  constructor(private formBuilder: FormBuilder, protected ref: NbDialogRef<CreateCustomerPopupComponent>
    , private customerService: CustomerService, private generalService: GeneralService) {
    /* Validacion para el crear del cliente */
    this.checkOutForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      typeDocument: ['', [Validators.required]],
      nroDocument: ['', [Validators.required]],
      email: '',
      address: '',
      phone: '',
    });
    /* Validacion para el editar del cliente */
    this.checkOutFormEdit = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: '',
      address: '',
      phone: '',
    });
  }

  ngOnInit(): void {

    if (this.customerEdit) {
      this.customerEdit;
      this.selectedOption = this.customerEdit.typeDocument;
    }
  }
  cancel() {
    this.ref.close();
  }

  /*<i>[ini][]</i>
*@author [HaroldHorta]
*@since 27/12/2020
*Metodo se encarga de agregar un nuevo usuario que haya sido consultado en ticket y no exista*/
  addCustomer(customer) {
    this.loadingLargeGroup = true;
    this.disabledUpdate = true;
    this.customerService.create(JSON.stringify(customer)).subscribe(
      () => {
        this.ref.close();
        this.loadingLargeGroup = false;
        this.disabledUpdate = false;
        const typeSuccess = 'success';
        const quote = { title: null, body: 'Producto agregado correctamente' };
        this.generalService.showToast(typeSuccess, quote.title, quote.body);
      },
      (err) => {
        const typeDanger = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.generalService.showToast(typeDanger, quote.title, quote.body);
        this.loadingLargeGroup = false;
        this.disabledUpdate = false;
      },
    );

  }
  /*<i>[fin][]</i>
     *@author [CadenaCristian]
     *@since 27/12/2020*/


  /*<i>[ini][EQUIDOG-6]</i>
*@author [HaroldHorta]
*@since 31/12/2020
*Metodo se encarga de actualiza informacion de un usuario*/
  updateCustomer(id, customer) {
    this.loadingLargeGroup = true;
    this.disabledUpdate = true;
    this.customerService.update(id, JSON.stringify(customer)).subscribe(
      () => {
        this.ref.close();
        this.loadingLargeGroup = false;
        this.disabledUpdate = false;
        const typeSuccess = 'success';
        const quote = { title: null, body: 'Producto actualizado correctamente' };
        this.generalService.showToast(typeSuccess, quote.title, quote.body);
      },
      (err) => {
        const typeDanger = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.generalService.showToast(typeDanger, quote.title, quote.body);
        this.loadingLargeGroup = false;
        this.disabledUpdate = false;
      },
    );

  }
  /*<i>[fin][EQUIDOG-6]</i>
     *@author [HaroldHorta]
     *@since 31/12/2020*/

}

