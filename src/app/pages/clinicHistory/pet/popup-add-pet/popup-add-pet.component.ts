import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Sex } from '../../../../core/models/enum/sex';
import { Origin } from '../../../../core/models/enum/origin';
import { ResponseBreed } from '../../../../core/models/Response/breed/ResponseBreed';
import { ResponseSpecies } from '../../../../core/models/Response/species/ResponseSpecies';
import { BreedService } from '../../../../core/services/breed.service';
import { SpeciesService } from '../../../../core/services/species.service';
import { CustomerService } from '../../../../core/services/customer.service';
import { ResponseCustomer } from '../../../../core/models/Response/customer/ResponseCustomer.module';
import { CreateCustomerPopupComponent } from '../../../invetoryProduct/customer/create-customer-popup/create-customer-popup.component';
import { PetService } from '../../../../core/services/pet.service';
import { GeneralService } from '../../../../core/services/general.service';

@Component({
  selector: 'ngx-popup-add-pet',
  templateUrl: './popup-add-pet.component.html',
  styleUrls: ['./popup-add-pet.component.scss']
})
export class PopupAddPetComponent implements OnInit {

  nroDocument;
  checkOutForm: FormGroup;
  disableButton = false;
  loadingLargeGroup = false;
  sex = [];
  origin = [];
  species: ResponseSpecies[];
  breed: ResponseBreed[];
  customer: ResponseCustomer;
  infoCustomer = false;
  infoNoData = false;
  constructor(private toastrService: GeneralService, private dialog: NbDialogService, private serviceCustomer: CustomerService, private servicePet: PetService,
    private serviceBreed: BreedService, private serviceSpecies: SpeciesService, protected ref: NbDialogRef<PopupAddPetComponent>, private formBuilder: FormBuilder) {

    this.checkOutForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      species: ['', [Validators.required]],
      breed: ['', [Validators.required]],
      color: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      dateBirth: ['', [Validators.required]],
      particularSigns: ['', [Validators.required]],
      origin: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      photo: ['', [Validators.required]],

    });
  }

  ngOnInit(): void {
    this.getSpecies();
    this.getBreed();
    this.getSex();
    this.getOrigin();

    if (this.nroDocument) {
      console.log('pasa')
      this.getCustomerByNroDocument();
    }
  }

  getSpecies() {
    this.serviceSpecies.getSpecies().subscribe(species => {
      this.species = species;
    })
  }

  getBreed() {
    this.serviceBreed.getBreed().subscribe(breed => {
      this.breed = breed;
    })
  }

  getSex() {
    this.sex.push(Sex.FEMENINO);
    this.sex.push(Sex.MASCULINO);
  }

  getOrigin() {
    this.origin.push(Origin.RURAL);
    this.origin.push(Origin.URBANO);
  }

  getCustomerByNroDocument() {
    this.serviceCustomer.findCustomerByNroDocument(this.nroDocument).subscribe(customer => {
      this.infoCustomer = true;
      this.customer = customer;
    }
      ,
      (err) => {
        this.infoCustomer = false;
      },
    )
  }

  findByNroDocument(nroDocument) {
    this.loadingLargeGroup = true;
    this.serviceCustomer.findCustomerByNroDocument(nroDocument).subscribe(customer => {
      this.loadingLargeGroup = false;
      this.infoCustomer = true;
      this.infoNoData = false;
      this.customer = customer;
    }, (err) => {
      this.loadingLargeGroup = false;
      this.infoCustomer = false;
      this.infoNoData = true;
    },
    );

  }

  openAddCustomer() {
    this.dialog.open(CreateCustomerPopupComponent);
  }

  onCreateConfirm(pet) {
    pet.photo = this.urls[0];
    this.servicePet.create(pet).subscribe(() => {
      const type = 'success';
      const quote = { title: null, body: 'Categoria agregada correctamente' };
      this.toastrService.showToast(type, quote.title, quote.body);
      this.ref.close(pet);
    }, (err) => {
      const type = 'danger';
      const quote = { title: null, body: err.error.detailMessage };
      this.toastrService.showToast(type, quote.title, quote.body);
    });

  }

  /*<i>[ini][]</i>
  *@author [CadenaCristian]
  *@since 03/01/2021
  *Este metodo sirve para cerrar el pop up*/
  cancel() {
    this.ref.close();
  }
  /*<i>[fin][]</i>
  *@author [CadenaCristian]
  *@since 03/01/2021*/

  urls = [];
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      for (let i = 0; i < 1; i++) {
        const reader = new FileReader();
        reader.onload = (events: any) => {
          this.urls.push(events.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }
}

