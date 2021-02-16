import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { RequestPatientHistoryVaccinations } from '../../../../core/models/Request/pet/vaccination/RequestPatientHistoryVaccinations';
import { RequestVaccination } from '../../../../core/models/Request/pet/vaccination/RequestVaccination';
import { ResponsePet } from '../../../../core/models/Response/pet/ResponsePet';
import { ResponseVaccinations } from '../../../../core/models/Response/vaccination/ResponseVaccinations';
import { Vaccination } from '../../../../core/models/Response/vaccination/vaccination';
import { GeneralService } from '../../../../core/services/general.service';
import { PetService } from '../../../../core/services/pet.service';
import { VaccinationService } from '../../../../core/services/vaccination.service';

@Component({
  selector: 'ngx-popup-add-vaccination-pet',
  templateUrl: './popup-add-vaccination-pet.component.html',
  styleUrls: ['./popup-add-vaccination-pet.component.scss']
})
export class PopupAddVaccinationPetComponent implements OnInit {

  checkOutForm: FormGroup;
  pet: ResponsePet = new ResponsePet;
  hiddenVaccination = false;
  vaccination: Vaccination[];
  vaccinationsReques: RequestVaccination[] = [];
  requestVaccinations: RequestPatientHistoryVaccinations = new RequestPatientHistoryVaccinations;
  vaccinationId;
  dateVaccination;

  constructor(private toastrService: GeneralService, private formBuilder: FormBuilder, private servicePet: PetService, private serviceVaccination: VaccinationService, protected ref: NbDialogRef<PopupAddVaccinationPetComponent>) {
    this.checkOutForm = this.formBuilder.group({
      vaccinationDate: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }


  cancel() {
    this.ref.close(this.pet);
  }

  displayVaccination() {
    this.hiddenVaccination = true;
    this.getVaccination();
  }


  getVaccination() {
    this.serviceVaccination.getVaccionation().subscribe(vaccination => {
      this.vaccination = vaccination;
      let pet = this.pet.vaccinations

      let petVaccination = [];
      let arrVaccination = [];
      arrVaccination = vaccination

      pet.forEach(element => {
        console.log()
        let newdata = {
          id: element.vaccination.id, description: element.vaccination.description, status: element.vaccination.status,
          createAt: element.vaccination.createAt, lot: element.vaccination.lot
        }
        petVaccination.push(newdata);
      });
      console.log('petVaccination', petVaccination)
      console.log('arrVaccination', arrVaccination)

      petVaccination.forEach(petVaccination => {

        arrVaccination.forEach(arr => {

          if (petVaccination.id === arr.id) {
            let indice = arrVaccination.findIndex(arr => arr.id === petVaccination.id);
            console.log('indice', indice)
            arrVaccination.splice(indice, 1);
          }
        })

      })
      console.log('sinRepetidos', arrVaccination)

      this.vaccination = arrVaccination;

    });
  }

  onNgModelChange(vaccination, event) {
    this.vaccinationId = vaccination.id;
    if (event) {
      this.vaccinationsReques.push({ id: this.vaccinationId, vaccinationDate: null });
    } else {
      let indice = this.vaccinationsReques.findIndex(pet => pet.id === vaccination);
      this.vaccinationsReques.splice(indice, 1);
    }
  }

  onNgDateChange(vaccination, date) {
    this.dateVaccination = date;
    let indice = this.vaccinationsReques.findIndex(pet => pet.id === vaccination);
    this.vaccinationsReques[indice].vaccinationDate = this.dateVaccination;
  }

  saveVaccination(id) {
    this.requestVaccinations.vaccinations = this.vaccinationsReques;
    
    this.servicePet.updateVaccionation(id, this.requestVaccinations).subscribe(() => {
      const type = 'success';
      const quote = { title: null, body: 'Especie agregada correctamente' };
      this.toastrService.showToast(type, quote.title, quote.body);
      this.hiddenVaccination = false;

      this.servicePet.getById(id).subscribe(pet => {
        this.pet = pet;
      })
    },
      (err) => {
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.toastrService.showToast(type, quote.title, quote.body);
      });

  }
}
