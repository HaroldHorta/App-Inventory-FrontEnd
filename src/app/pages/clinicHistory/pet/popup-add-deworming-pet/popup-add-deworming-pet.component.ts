import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { option } from '../../../../core/models/enum/option';
import { RequestPatientHistoryDeworming } from '../../../../core/models/Request/pet/deworming/RequestPatientHistoryDeworming';
import { RequestPhysiologicalConstants } from '../../../../core/models/Request/pet/RequestPhysiologicalConstants/RequestPhysiologicalConstants';
import { ResponsePet } from '../../../../core/models/Response/pet/ResponsePet';
import { GeneralService } from '../../../../core/services/general.service';
import { PetService } from '../../../../core/services/pet.service';
import { PhysiologicalConstantsComponent } from '../physiological-constants/physiological-constants.component';

@Component({
  selector: 'ngx-popup-add-deworming-pet',
  templateUrl: './popup-add-deworming-pet.component.html',
  styleUrls: ['./popup-add-deworming-pet.component.scss']
})
export class PopupAddDewormingPetComponent implements OnInit {

  pet: ResponsePet = new ResponsePet;
  intorext: boolean;
  physiologicalConstants: RequestPhysiologicalConstants;
  hiddenDeworming = false;
  disableButton = false;
  loadingLargeGroup = false;
  checkOutFormInternal: FormGroup;
  dewormingDate;
  dewormingInternal: RequestPatientHistoryDeworming = new RequestPatientHistoryDeworming;
  constructor(private dialogService: NbDialogService, private toastrService: GeneralService,
    private formBuilder: FormBuilder, private servicePet: PetService, protected ref: NbDialogRef<PopupAddDewormingPetComponent>
  ) {
    this.checkOutFormInternal = this.formBuilder.group({
      option: [option.SI, [Validators.required]],
      description: ['', [Validators.required]],
      dewormingDate: [this.dewormingDate],
      product: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  displayDeworming() {
    this.dialogService.open(PhysiologicalConstantsComponent).onClose.subscribe(res => {
      this.physiologicalConstants = res;
      this.hiddenDeworming = true;
    });
  }

  cancel() {
    this.ref.close(this.pet);
  }


  onNgDateChange(date) {
    this.dewormingDate = date;
  }

  onCreateInternal(id, deworming) {
    this.disableButton = true;
    this.loadingLargeGroup = true;
    this.dewormingInternal.deworming = deworming;
    this.dewormingInternal.deworming.dewormingDate = this.dewormingDate;

    this.dewormingInternal.physiologicalConstants = this.physiologicalConstants;

    if (this.intorext) {
      this.servicePet.updateDewormingInternal(id, this.dewormingInternal).subscribe(() => {
        const type = 'success';
        const quote = { title: null, body: 'Especie agregada correctamente' };
        this.toastrService.showToast(type, quote.title, quote.body);

        this.servicePet.getById(id).subscribe(pet => {
          this.pet = pet;
        })
        this.hiddenDeworming = false;

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
    }else{
      this.servicePet.updateDewormingExternal(id, this.dewormingInternal).subscribe(() => {
        const type = 'success';
        const quote = { title: null, body: 'Especie agregada correctamente' };
        this.toastrService.showToast(type, quote.title, quote.body);

        this.servicePet.getById(id).subscribe(pet => {
          this.pet = pet;
        })
        this.hiddenDeworming = false;

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

}
