import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ResponseDiagnosticPlan } from '../../../core/models/Response/diagnosticplan/ResponseDiagnosticPlan';
import { DiagnosticPlanService } from '../../../core/services/diagnostic-plan.service';
import { GeneralService } from '../../../core/services/general.service';
import { PopupAddDianosticPlanComponent } from './popup-add-dianostic-plan/popup-add-dianostic-plan.component';

@Component({
  selector: 'ngx-diagnostic-plan',
  templateUrl: './diagnostic-plan.component.html',
  styleUrls: ['./diagnostic-plan.component.scss']
})
export class DiagnosticPlanComponent implements OnInit {

  hideFilters = false;
  diagnosticPlan: ResponseDiagnosticPlan[];
  searchDiagnosticPlan;
  changeDetectorRef: ChangeDetectorRef;
  connectionInternet = true;
  hiddenDiagnosticPlan = false;


  constructor(private serviceDiagnosticPlan: DiagnosticPlanService,
    private toastrService: GeneralService, private dialogService: NbDialogService,
    changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;

    this.getDiagnosticPlanList();
  }

  ngOnInit(): void {
  }

  getDiagnosticPlanList() {
    this.serviceDiagnosticPlan.getDiagnosticPlan().subscribe(
      diagnosticPlan => {
        this.diagnosticPlan = diagnosticPlan;

        if (this.diagnosticPlan.length === 0) {
          this.hiddenDiagnosticPlan = true;
        } else {
          this.hiddenDiagnosticPlan = false;
        }
      },
      (err) => {
        if (err.status === 0) {
          this.connectionInternet = false;
        }
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.toastrService.showToast(type, quote.title, quote.body);
      });
  }

  modalAdd() {
    this.dialogService.open(PopupAddDianosticPlanComponent).onClose.subscribe(() => {
      this.getDiagnosticPlanList();
    });
  }

  onDeleteConfirm(event, id): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.serviceDiagnosticPlan.delete(id).subscribe(data => {
        const type = 'success';
        const quote = { title: null, body: 'Vacuna eliminada correctamente' };
        this.toastrService.showToast(type, quote.title, quote.body);
        this.getDiagnosticPlanList();
      },
        (err) => {
          const type = 'danger';
          const quote = { title: null, body: err.error.detailMessage };
          this.toastrService.showToast(type, quote.title, quote.body);
        },
      );
    } else {
      event.confirm.reject();
    }
  }
  
  onSelectChange(event) {
    if (event === '') {
      this.hideFilters = false;
    }
    if (event !== '') {
      this.hideFilters = true;
    }
  }


}
