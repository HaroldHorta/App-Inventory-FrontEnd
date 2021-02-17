import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { RequestPhysiologicalConstants } from '../../../../core/models/Request/pet/RequestPhysiologicalConstants/RequestPhysiologicalConstants';
import { RequestPatientHistoryVaccinations } from '../../../../core/models/Request/pet/vaccination/RequestPatientHistoryVaccinations';
import { RequestVaccination } from '../../../../core/models/Request/pet/vaccination/RequestVaccination';
import { ResponsePet } from '../../../../core/models/Response/pet/ResponsePet';
import { Vaccination } from '../../../../core/models/Response/vaccination/vaccination';
import { GeneralService } from '../../../../core/services/general.service';
import { PetService } from '../../../../core/services/pet.service';
import { VaccinationService } from '../../../../core/services/vaccination.service';
import { PhysiologicalConstantsComponent } from '../physiological-constants/physiological-constants.component';

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
  physiologicalConstants: RequestPhysiologicalConstants;
  requestVaccinations: RequestPatientHistoryVaccinations = new RequestPatientHistoryVaccinations;
  dateVaccination;

  disableButton = false;
  loadingLargeGroup = false;

  constructor(private dialogService: NbDialogService, private toastrService: GeneralService,
    private formBuilder: FormBuilder, private servicePet: PetService,
    private serviceVaccination: VaccinationService, protected ref: NbDialogRef<PopupAddVaccinationPetComponent>) {
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
    this.dialogService.open(PhysiologicalConstantsComponent).onClose.subscribe(res => {
      this.physiologicalConstants = res;
      this.hiddenVaccination = true;
      this.getVaccination();
    });

  }


  getVaccination() {
    this.serviceVaccination.getVaccionation().subscribe(vaccination => {
      this.vaccination = vaccination;
      let pet = this.pet.vaccinations

      let petVaccination = [];
      let arrVaccination = vaccination;

      pet.forEach(el => {
        el.vaccinations.forEach(element => {
          let newdata = {
            id: element.vaccination.id, description: element.vaccination.description, status: element.vaccination.status,
            createAt: element.vaccination.createAt, lot: element.vaccination.lot
          }
          petVaccination.push(newdata);
        })
      });
      petVaccination.forEach(petVaccination => {

        arrVaccination.forEach(arr => {

          if (petVaccination.id === arr.id) {
            let indice = arrVaccination.findIndex(arr => arr.id === petVaccination.id);
            arrVaccination.splice(indice, 1);
          }
        })

      })

      this.vaccination = arrVaccination;

    });
  }

  onNgModelChange(vaccination, event) {
    if (event) {
      this.vaccinationsReques.push({ vaccination: vaccination, vaccinationDate: null });
    } else {
      let indice = this.vaccinationsReques.findIndex(pet => pet.vaccination.id === vaccination);
      this.vaccinationsReques.splice(indice, 1);
    }
  }

  onNgDateChange(vaccination, date) {
    this.dateVaccination = date;
    let indice = this.vaccinationsReques.findIndex(pet => pet.vaccination.id === vaccination);
    this.vaccinationsReques[indice].vaccinationDate = this.dateVaccination;

  }


  saveVaccination(id) {
    this.disableButton = true;
    this.loadingLargeGroup = true;

    this.requestVaccinations.vaccinations = this.vaccinationsReques;
    this.requestVaccinations.physiologicalConstants = this.physiologicalConstants;

    this.servicePet.updateVaccionation(id, this.requestVaccinations).subscribe(() => {

      const type = 'success';
      const quote = { title: null, body: 'Especie agregada correctamente' };
      this.toastrService.showToast(type, quote.title, quote.body);
      this.hiddenVaccination = false;

      this.servicePet.getById(id).subscribe(pet => {
        this.pet = pet;
      })

      this.disableButton = false;
      this.loadingLargeGroup = false;
    },
      (err) => {
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.toastrService.showToast(type, quote.title, quote.body);

        this.disableButton = false;
        this.loadingLargeGroup = false;
      });

  }
}
