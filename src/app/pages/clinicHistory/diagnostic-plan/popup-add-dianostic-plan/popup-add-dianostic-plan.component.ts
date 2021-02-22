import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { DiagnosticPlanService } from '../../../../core/services/diagnostic-plan.service';
import { ExamClinicService } from '../../../../core/services/exam-clinic.service';
import { GeneralService } from '../../../../core/services/general.service';

@Component({
  selector: 'ngx-popup-add-dianostic-plan',
  templateUrl: './popup-add-dianostic-plan.component.html',
  styleUrls: ['./popup-add-dianostic-plan.component.scss']
})
export class PopupAddDianosticPlanComponent implements OnInit {

  checkOutForm: FormGroup;
  disableButton = false;
  loadingLargeGroup = false;

  constructor(protected ref: NbDialogRef<PopupAddDianosticPlanComponent>, private formBuilder: FormBuilder,
    private toastrService: GeneralService, private serviceDiagnosticService: DiagnosticPlanService) {
    this.checkOutForm = this.formBuilder.group({
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  cancel() {
    this.ref.close();
  }

  onCreateConfirm(event) {
    this.disableButton = true;
    this.loadingLargeGroup = true;

    if (window.confirm('¿Esta seguro de agregar?')) {
      this.serviceDiagnosticService.create(event).subscribe(() => {
        const type = 'success';
        const quote = { title: null, body: 'Agregado correctamente' };
        this.toastrService.showToast(type, quote.title, quote.body);
        this.ref.close(event);
      },
        (err) => {
          const type = 'danger';
          const quote = { title: null, body: err.error.detailMessage };
          this.toastrService.showToast(type, quote.title, quote.body);
          this.disableButton = false;
          this.loadingLargeGroup = false;
      
        },
      );
    }
  }
}
