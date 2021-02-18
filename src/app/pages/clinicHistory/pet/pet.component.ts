import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { ResponsePet } from '../../../core/models/Response/pet/ResponsePet';
import { GeneralService } from '../../../core/services/general.service';
import { PetService } from '../../../core/services/pet.service';
import { PopupAddClinicHistoryComponent } from './popup-add-clinic-history/popup-add-clinic-history.component';
import { PopupAddDewormingPetComponent } from './popup-add-deworming-pet/popup-add-deworming-pet.component';
import { PopupAddPetComponent } from './popup-add-pet/popup-add-pet.component';
import { PopupAddVaccinationPetComponent } from './popup-add-vaccination-pet/popup-add-vaccination-pet.component';
import { PopupDetailsPetComponent } from './popup-details-pet/popup-details-pet.component';

@Component({
  selector: 'ngx-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {

  checkOutForm: FormGroup;
  pet: ResponsePet[];
  loadingLargeGroup = false;
  disabledUpdate = false;
  petHidden = false;
  searchPet = false;
  constructor(private toastrService: GeneralService, private dialogService: NbDialogService,
    private formBuilder: FormBuilder, private petService: PetService) {

    this.checkOutForm = this.formBuilder.group({
      nroDocument: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 27/12/2020
*Metodo se encarga de buscar las mascotas asociadas al numero de documento del cliente*/
  findByNroDocument(nroDocument) {
    this.loadingLargeGroup = true;
    this.disabledUpdate = true;
    this.petService.getByCustomer(nroDocument.nroDocument).subscribe(pet => {
      this.searchPet = true;
      this.pet = pet;
      if (this.pet.length != 0) {
        this.petHidden = true;
      } else {
        this.petHidden = false;
      }
      this.loadingLargeGroup = false;
      this.disabledUpdate = false;
    }, (err) => {
      const type = 'danger';
      const quote = { title: null, body: err.error.detailMessage };
      this.toastrService.showToast(type, quote.title, quote.body);
      this.loadingLargeGroup = false;
      this.loadingLargeGroup = false;
      this.disabledUpdate = false;
    })
  }
  /*<i>[fin][]</i>
   *@author [CadenaCristian]
   *@since 27/12/2020*/

  /*<i>[ini][]</i>
         *@author [CadenaCristian]
         *@since 04/01/2021
         *Metodo que permite abrir el pop up de editar y actualizar los datos*/
  openModdalAdd(nroDocument) {
    this.dialogService.open(PopupAddPetComponent, { context: { nroDocument: nroDocument.nroDocument } }).onClose.subscribe(res => {
      const nro = { nroDocument: res.customer }
      this.findByNroDocument(nro);
    });
  }
  /*<i>[fin][]</i>
*@author [CadenaCristian]
*@since 04/01/2021*/
  openModalDetails(pet, hasScroll) {
    hasScroll = true;
    this.dialogService.open(PopupDetailsPetComponent, { context: { pet: pet }, hasScroll });
  }

  openModalVaccination(pet) {
    this.dialogService.open(PopupAddVaccinationPetComponent, { context: { pet: pet } }).onClose.subscribe(res => {
      const nro = { nroDocument: res.customer.nroDocument }
      this.findByNroDocument(nro);
    });
  }

  openModalClinicHistory(pet) {
    this.dialogService.open(PopupAddClinicHistoryComponent, { context: { pet: pet } }).onClose.subscribe(res => {
      const nro = { nroDocument: res.customer.nroDocument }
      this.findByNroDocument(nro);
    });
  }

  openModalDeworming(pet, intorext:boolean) {
    this.dialogService.open(PopupAddDewormingPetComponent, { context: { pet: pet, intorext: intorext } }).onClose.subscribe(res => {
      const nro = { nroDocument: res.customer.nroDocument }
      this.findByNroDocument(nro);
    });
  }
}
