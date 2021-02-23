import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { RequestPhysiologicalConstants } from '../../../../core/models/Request/pet/RequestPhysiologicalConstants/RequestPhysiologicalConstants';

@Component({
  selector: 'ngx-physiological-constants',
  templateUrl: './physiological-constants.component.html',
  styleUrls: ['./physiological-constants.component.scss']
})
export class PhysiologicalConstantsComponent implements OnInit {

  physiologicalConstants: RequestPhysiologicalConstants;
  checkOutForm: FormGroup;

  disableButton = false;
  loadingLargeGroup = false;

  constructor(private formBuilder: FormBuilder, protected ref: NbDialogRef<PhysiologicalConstantsComponent>) {

    this.checkOutForm = this.formBuilder.group({
      capillaryFillTime: ['', [Validators.required]],
      heartRate: ['', [Validators.required]],
      respiratoryFrequency: ['', [Validators.required]],
      pulse: ['', [Validators.required]],
      temperature: ['', [Validators.required]],
      weight: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onCreateConfirm(physiologicalConstants) {
    this.physiologicalConstants = physiologicalConstants;
    this.ref.close(this.physiologicalConstants);

  }


  cancel() {
    this.ref.close();

  }


}
