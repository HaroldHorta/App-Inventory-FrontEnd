import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Attitude } from '../../../../core/models/enum/Attitude';
import { BodyCondition } from '../../../../core/models/enum/BodyCondition';
import { FeedingOption } from '../../../../core/models/enum/feedingOption';
import { Habitat } from '../../../../core/models/enum/habitat';
import { ReproductiveStatus } from '../../../../core/models/enum/reproductiveStatus';
import { StateDehydration } from '../../../../core/models/enum/StateDehydration';
import { RequestFeeding } from '../../../../core/models/Request/feeding/RequestFeeding';
import { RequestHabitat } from '../../../../core/models/Request/habitat/RequestHabitat';
import { RequestReproductiveStatus } from '../../../../core/models/Request/pet/reproductiveStatus/RequestReproductiveStatus';
import { RequestPhysiologicalConstants } from '../../../../core/models/Request/pet/RequestPhysiologicalConstants/RequestPhysiologicalConstants';
import { ResponsePet } from '../../../../core/models/Response/pet/ResponsePet';
import { ResponseVeterinary } from '../../../../core/models/Response/veterinary/ResponseVeterinary';
import { GeneralService } from '../../../../core/services/general.service';
import { PetService } from '../../../../core/services/pet.service';
import { VeterinaryService } from '../../../../core/services/veterinary.service';
import { PopupAddDewormingPetComponent } from '../popup-add-deworming-pet/popup-add-deworming-pet.component';

@Component({
  selector: 'ngx-popup-add-clinic-history',
  templateUrl: './popup-add-clinic-history.component.html',
  styleUrls: ['./popup-add-clinic-history.component.scss']
})
export class PopupAddClinicHistoryComponent implements OnInit {

  pet: ResponsePet = new ResponsePet;
  veterinary: ResponseVeterinary;
  physiologicalConstants: RequestPhysiologicalConstants;
  infoVeterinary = false;
  infoFeeding = false;
  disableButton = false;
  loadingLargeGroup = false;
  hideDescription = false;
  hiddenAllergy = false;
  hiddenPreviousIllnesses = false;
  hiddenSurgeries = false;
  hiddenFamilyBackground = false;
  hideDescriptionHabitat = false;
  checkOutForm: FormGroup;
  checkOutFormConstantsPhy: FormGroup;
  feedingOption: Array<string> = [];
  reproductiveStatus: Array<string> = [];
  habitatOption: Array<string> = [];
  attitudeOption:Array<string>=[];
  bodyConditionOption:Array<string>=[];
  stateDehydrationOption:string[]=[];
  reproductive;
  habitat;
  feeding;
  attitude;
  bodyCondition;
  statusDehydration;
  search;
  descriptionFeedind: string = '';
  descriptionHabitat: string = '';
  requestFeeding: RequestFeeding;
  requestHabitat: RequestHabitat;
  requestReproductiveStatus: RequestReproductiveStatus;



  constructor(protected ref: NbDialogRef<PopupAddClinicHistoryComponent>, private serviceVeterinary: VeterinaryService,
    private toastrService: GeneralService, private formBuilder: FormBuilder, private dialogService: NbDialogService,
    private servicePet: PetService) {

    this.checkOutForm = this.formBuilder.group({
      veterinary: ['', [Validators.required]],
      pet: ['', [Validators.required]],
      reasonOfConsultation: ['', [Validators.required]],
      anamnesis: ['', [Validators.required]],
      recipeBook: ['', [Validators.required]],

    });

    this.checkOutFormConstantsPhy = this.formBuilder.group({
      capillaryFillTime: ['', [Validators.required]],
      heartRate: ['', [Validators.required]],
      respiratoryFrequency: ['', [Validators.required]],
      pulse: ['', [Validators.required]],
      temperature: ['', [Validators.required]],
      weight: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.preCarga();
    this.getFeeding();
    this.getReproductiveStatus();
    this.getHabitat();
    this.getAttitude();
    this.getBodyCondition();
    this.getStateDehydration();
  }

  preCarga() {
    if (this.pet.feeding != null) {
      this.feeding = this.pet.feeding.feedingOption;
    }
    if (this.pet.reproductiveStatus != null) {
      this.reproductive = this.pet.reproductiveStatus;
    }
    if (this.pet.habitat != null) {
      this.habitat = this.pet.habitat;
    }
  }
  getFeeding() {
    for (let value in FeedingOption) {
      if (typeof FeedingOption[value] === 'number') {
        this.feedingOption.push(value);
      }
    }
  }

  getHabitat() {
    for (let value in Habitat) {
      if (typeof Habitat[value] === 'number') {
        this.habitatOption.push(value);
      }
    }
  }

  getReproductiveStatus() {
    for (let value in ReproductiveStatus) {
      if (typeof ReproductiveStatus[value] === 'number') {
        this.reproductiveStatus.push(value);
      }
    }
  }

  getAttitude() {
    for (let value in Attitude) {
      if (typeof Attitude[value] === 'number') {
        this.attitudeOption.push(value);
      }
    }
  }

  getBodyCondition(){
    for(let value in BodyCondition){
      if(typeof BodyCondition[value]==='number'){
        this.bodyConditionOption.push(value)
      }
    }
  }

  getStateDehydration(){
        this.stateDehydrationOption.push(StateDehydration.NORMAL);
        this.stateDehydrationOption.push(StateDehydration.CEROACINCO);
        this.stateDehydrationOption.push(StateDehydration.SEISASIETE);
        this.stateDehydrationOption.push(StateDehydration.OCHOANUEVE);
        this.stateDehydrationOption.push(StateDehydration.MAS10);
    console.log(this.stateDehydrationOption)
  }

  cancel() {
    this.ref.close();
  }

  getVetrinaryByProfessionalCard(profesionalCard) {
    this.disableButton = true;
    this.loadingLargeGroup = true;
    this.serviceVeterinary.getVeterinaryByprofessionalCard(profesionalCard).subscribe(veterinary => {
      this.veterinary = veterinary;
      this.infoVeterinary = true;
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

  openModalDeworming(pet, intorext: boolean) {
    this.dialogService.open(PopupAddDewormingPetComponent, { context: { pet: pet, intorext: intorext } }).onClose.subscribe(res => {
      this.pet = res;
    });
  }

  changedValueFeeding() {
    const newVal = {
      fieldName: this.feeding,
    };
    if (this.feeding === 'OTRA') {
      this.hideDescription = true;
    }
    if (this.feeding !== 'OTRA') {
      this.hideDescription = false;
    }

    this.updateFeeding();

  }


  changedValueHabitat() {
    const newVal = {
      fieldName: this.feeding,
    };
    if (this.feeding === 'OTRO') {
      this.hideDescriptionHabitat = true;
    }
    if (this.feeding !== 'OTRO') {
      this.hideDescriptionHabitat = false;
    }

    this.updateHabitat();

  }


  updateHabitat() {
    this.requestHabitat = { habitat: this.habitat, description: this.descriptionHabitat }

    this.servicePet.updateHabitat(this.pet.id, this.requestHabitat).subscribe(pet => {
      this.pet = pet;
      const type = 'success';
      const quote = { title: null, body: 'Habitat agregada correctamente' };
      this.toastrService.showToast(type, quote.title, quote.body);
    },
      (err) => {
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.toastrService.showToast(type, quote.title, quote.body);

        this.disableButton = false;
        this.loadingLargeGroup = false;
      });
  }


  updateFeeding() {
    this.requestFeeding = { feedingOption: this.feeding, description: this.descriptionFeedind }

    this.servicePet.updateFeeding(this.pet.id, this.requestFeeding).subscribe(pet => {
      this.pet = pet;
      const type = 'success';
      const quote = { title: null, body: 'Alimentación agregada correctamente' };
      this.toastrService.showToast(type, quote.title, quote.body);
    },
      (err) => {
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.toastrService.showToast(type, quote.title, quote.body);

        this.disableButton = false;
        this.loadingLargeGroup = false;
      });
  }

  public onSelectChangeFeeding(event): void {
    this.descriptionFeedind = event;
    this.updateFeeding();

  }

  public onSelectChangeHabitat(event): void {
    this.descriptionFeedind = event;
    this.updateHabitat();

  }

  changedValueAttitude() {
    const newVal = {
      fieldName: this.attitude,
    };
  }

  changedValueBodyCondition(){
    const newVal = {
      fieldName: this.bodyCondition,
    };
  }

  changedValueStateDehydration(){
    const newVal = {
      fieldName: this.statusDehydration,
    };
  }


  changedValueReproductiveStatus() {
    const newVal = {
      fieldName: this.reproductive,
    };
    this.updateReproductiveStatus();
  }

  updateReproductiveStatus() {

    this.requestReproductiveStatus = { reproductiveStatus: this.reproductive };
    this.servicePet.updateReproductiveStatus(this.pet.id, this.requestReproductiveStatus).subscribe(
      pet => {
        this.pet = pet;

        const type = 'success';
        const quote = { title: null, body: 'Estado reproductivo agregado correctamente' };
        this.toastrService.showToast(type, quote.title, quote.body);
      },
      (err) => {
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.toastrService.showToast(type, quote.title, quote.body);

        this.disableButton = false;
        this.loadingLargeGroup = false;
      });
  }

  updateAllergy(description) {
    this.disableButton = true;
    this.loadingLargeGroup = true;
    this.servicePet.updateAllergy(this.pet.id, description).subscribe(
      pet => {
        this.pet = pet;
        const type = 'success';
        const quote = { title: null, body: 'Alergia agregada correctamente' };
        this.toastrService.showToast(type, quote.title, quote.body);
        this.hiddenAllergy = false;
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

  openAllergy() {
    this.hiddenAllergy = true;
  }

  openPreviousIllnesses() {
    this.hiddenPreviousIllnesses = true;
  }

  updatePreviousIllnesses(description) {
    this.disableButton = true;
    this.loadingLargeGroup = true;
    this.servicePet.updatePreviousIllnesses(this.pet.id, description).subscribe(
      pet => {
        this.pet = pet;
        const type = 'success';
        const quote = { title: null, body: 'Enfermedad previa agregada correctamente' };
        this.toastrService.showToast(type, quote.title, quote.body);
        this.hiddenPreviousIllnesses = false;
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

  openSurgeries() {
    this.hiddenSurgeries = true;
  }

  updateSurgeries(description) {
    this.disableButton = true;
    this.loadingLargeGroup = true;

    this.servicePet.updateSurgeries(this.pet.id, description).subscribe(
      pet => {
        this.pet = pet;
        const type = 'success';
        const quote = { title: null, body: 'Cirugía agregada correctamente' };
        this.toastrService.showToast(type, quote.title, quote.body);
        this.hiddenSurgeries = false;
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

  openFamilyBackground() {
    this.hiddenFamilyBackground = true;
  }

  updateFamilyBackground(description) {
    this.disableButton = true;
    this.loadingLargeGroup = true;
    this.servicePet.updateFamilyBackground(this.pet.id, description).subscribe(
      pet => {
        this.pet = pet;
        const type = 'success';
        const quote = { title: null, body: 'Antecedente familiar agregado correctamente' };
        this.toastrService.showToast(type, quote.title, quote.body);
        this.hiddenFamilyBackground = false;
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

  ConstantsPhy = false;

  saveConstantsPhy(physiologicalConstants) {
    this.physiologicalConstants = physiologicalConstants;
    this.ConstantsPhy = true;
  }

}
