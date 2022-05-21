import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { RequestDiagnosticPlanCLinicHistory } from '../../../../core/models/Request/clinichistory/RequestDiagnosticPlanCLinicHistory';
import { ResponseClinicHistoryDTO } from '../../../../core/models/Response/clinichistory/ResponseClinicHistoryDTO';
import { ResponseDiagnosticPlan } from '../../../../core/models/Response/diagnosticplan/ResponseDiagnosticPlan';
import { ClinicHistoryService } from '../../../../core/services/clinic-history.service';
import { GeneralService } from '../../../../core/services/general.service';
import { saveAs as fileSaverSave } from 'file-saver';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultClinic } from '../../../../core/models/Request/clinichistory/ResultClinic';
import { TherapeuticPlan } from '../../../../core/models/Request/clinichistory/TherapeuticPlan';
import { RequestTherapeuticPlan } from '../../../../core/models/Request/clinichistory/RequestTherapeuticPlan';
import { TherapeuticPlanOption } from '../../../../core/models/enum/TherapeuticPlanOption';

@Component({
  selector: 'ngx-popup-evidences-clinic-history',
  templateUrl: './popup-evidences-clinic-history.component.html',
  styleUrls: ['./popup-evidences-clinic-history.component.scss']
})
export class PopupEvidencesClinicHistoryComponent implements OnInit {

  clinicHistory: ResponseClinicHistoryDTO = new ResponseClinicHistoryDTO;
  result: ResultClinic;
  diagnostic: RequestDiagnosticPlanCLinicHistory;
  diagnosticPlans: ResponseDiagnosticPlan[] = [];
  responseDiagnosticPlan: ResponseDiagnosticPlan;
  therapeuticPlanOption: string[] = [];
  search;
  lab: string;
  loadingLargeGroup = false;
  disabledUpdate = false;
  examHidden = false;
  resultHidden = false;
  checkOutForm: FormGroup;
  checkOutFormTherapeutic: FormGroup;


  constructor(private formBuilder: FormBuilder, private toastrService: GeneralService, protected ref: NbDialogRef<PopupEvidencesClinicHistoryComponent>, private service: ClinicHistoryService) {

    this.checkOutForm = this.formBuilder.group({

      interpretationResults: ['', [Validators.required]],
      diagnosticImpression: ['', [Validators.required]],

    });

    this.checkOutFormTherapeutic = this.formBuilder.group({

      therapeuticPlanOption: ['', [Validators.required]],
      activePrincipleManage: ['', [Validators.required]],
      presentation: ['', [Validators.required]],
      posology: ['', [Validators.required]],
      totalDose: ['', [Validators.required]],
      via: ['', [Validators.required]],
      frequencyDuration: ['', [Validators.required]],

    });
  }

  ngOnInit(): void {
    this.diagnosticPlans = this.clinicHistory.diagnosticPlans;
    this.getTherapeuticPlanOption();
  }
  cancel() {
    this.ref.close();
  }

  getTherapeuticPlanOption() {
    this.therapeuticPlanOption.push(TherapeuticPlanOption.SUPPORT);
    this.therapeuticPlanOption.push(TherapeuticPlanOption.PREVENTIVE);
    this.therapeuticPlanOption.push(TherapeuticPlanOption.SYMPTOMATIC);
    this.therapeuticPlanOption.push(TherapeuticPlanOption.ETIOLOGICAL);

    console.log(this.therapeuticPlanOption)
  }


  public onSelectChange(event, i): void {
    this.lab = event;
    this.diagnosticPlans[i].labs = this.lab;
    console.log('insert labs', this.diagnosticPlans)
  }

  pdf;
  changeListener($event, i, history): void {
    this.readThis($event.target, i, history);
  }

  readThis(inputValue: any, i, history): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.pdf = myReader.result;
      this.diagnosticPlans[i].pdfs = this.pdf;
      console.log('insert pdf', this.diagnosticPlans)

    }
    myReader.readAsDataURL(file);
  }

  updateDiagnosticPlan() {
    this.diagnostic = { diagnosticPlans: this.diagnosticPlans }
    this.loadingLargeGroup = true;
    this.disabledUpdate = true;
    this.service.updateDiagnosticPlan(this.clinicHistory.id, this.diagnostic).subscribe(diagnostic => {
      this.clinicHistory = diagnostic;
      const type = 'success';
      const quote = { title: null, body: 'Agregado correctamente' };
      this.toastrService.showToast(type, quote.title, quote.body);
      this.loadingLargeGroup = false;
      this.disabledUpdate = false;
      this.examHidden = true;
    },
      (err) => {
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.toastrService.showToast(type, quote.title, quote.body);

        this.disabledUpdate = false;
        this.loadingLargeGroup = false;
      });

  }

  downloadPdf;
  filename;
  download(i) {

    this.downloadPdf = this.diagnosticPlans[i].pdfs;
    this.filename = this.diagnosticPlans[i].createAt;

    this.dataURLtoFile();
  }

  dataURLtoFile(dataurl = this.downloadPdf, filename = this.filename + '.pdf', format = 'pdf') {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    fileSaverSave(new File([u8arr], filename, { type: format }));
  }

  updateInterpretResult(result) {
    this.result = result;
    this.loadingLargeGroup = true;
    this.disabledUpdate = true;

    this.service.updateResult(this.clinicHistory.id, this.result).subscribe(clinicHistory => {
      this.clinicHistory = clinicHistory;
      const type = 'success';
      const quote = { title: null, body: 'Agregado correctamente' };
      this.toastrService.showToast(type, quote.title, quote.body);
      this.loadingLargeGroup = false;
      this.disabledUpdate = false;
      this.resultHidden = true;
    },
      (err) => {
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.toastrService.showToast(type, quote.title, quote.body);

        this.disabledUpdate = false;
        this.loadingLargeGroup = false;
      });
  }

  disableButton = false;
  hiddenTherapeuticPlan = false;
  therapeuticPlan: TherapeuticPlan[] = [];
  requestTherapeuticPlan: RequestTherapeuticPlan = new RequestTherapeuticPlan;
  addListTherapeuticPlan(therapeuticPlan) {
    this.hiddenTherapeuticPlan = true;
    this.therapeuticPlan.push(therapeuticPlan);
    this.checkOutFormTherapeutic.reset();
  }

  deleteTherapeuticPlan(i) {
    this.therapeuticPlan.splice(i, 1)
  }

  updateTherapeuticPlan() {
    this.loadingLargeGroup = true;
    this.disabledUpdate = true;
    this.requestTherapeuticPlan.therapeuticPlans = this.therapeuticPlan;
    this.service.updateTherapeuticPlan(this.clinicHistory.id, this.requestTherapeuticPlan).subscribe(clinicHistory => {
      this.clinicHistory = clinicHistory;
      const type = 'success';
      const quote = { title: null, body: 'Agregado correctamente' };
      this.toastrService.showToast(type, quote.title, quote.body);
      this.loadingLargeGroup = false;
      this.disabledUpdate = false;
      this.resultHidden = true;
      this.ref.close();

    },
      (err) => {
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.toastrService.showToast(type, quote.title, quote.body);

        this.disabledUpdate = false;
        this.loadingLargeGroup = false;
      });
  }
}
