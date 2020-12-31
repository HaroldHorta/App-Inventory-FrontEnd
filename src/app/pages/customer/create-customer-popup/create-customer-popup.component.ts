import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ResponseCustomer } from '../../../core/models/Response/customer/ResponseCustomer.module';
import { CustomerService } from '../../../core/services/customer.service';
import { GeneralService } from '../../../core/services/general.service';

@Component({
  selector: 'ngx-create-customer-popup',
  templateUrl: './create-customer-popup.component.html',
  styleUrls: ['./create-customer-popup.component.scss'],
})
export class CreateCustomerPopupComponent implements OnInit {

  checkOutForm: FormGroup;
  checkOutFormEdit: FormGroup;
  typeDocument = ['CC', 'TI', 'CE', 'PASSPORT'];
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
      typeDocument: ['', [Validators.required]],
      nroDocument: ['', [Validators.required]],
      email: '',
      address: '',
      phone: '',
    });
  }

  ngOnInit(): void {
    console.log(this.customerEdit);
    this.getTypeDocuementList();
  }

  getTypeDocuementList() {
    this.selectedItemEdit = this.customerEdit.typeDocument;
  }

  cancel() {
    this.ref.close();
  }

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 27/12/2020
*Metodo se encarga de agregar un nuevo usuario que haya sido consultado en ticket y no exista*/
  addCustomer(customer, nroDocument) {
    this.loadingLargeGroup = true;
    this.disabledUpdate = true;
    this.customerService.create(JSON.stringify(customer)).subscribe(
      () => {
        this.ref.close(nroDocument);
        this.loadingLargeGroup = false;
        this.disabledUpdate = false;
        const type = 'success';
        const quote = { title: null, body: 'Producto agregado correctamente' };
        this.generalService.showToast(type, quote.title, quote.body);
      },
      (err) => {
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.generalService.showToast(type, quote.title, quote.body);
        this.loadingLargeGroup = false;
        this.disabledUpdate = false;
      },
    );

  }
  /*<i>[fin][]</i>
     *@author [CadenaCristian]
     *@since 27/12/2020*/
}

