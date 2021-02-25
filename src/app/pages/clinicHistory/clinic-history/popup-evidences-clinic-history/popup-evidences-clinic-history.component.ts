import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { RequestDiagnosticPlanCLinicHistory } from '../../../../core/models/Request/clinichistory/RequestDiagnosticPlanCLinicHistory';
import { ResponseClinicHistoryDTO } from '../../../../core/models/Response/clinichistory/ResponseClinicHistoryDTO';
import { ResponseDiagnosticPlan } from '../../../../core/models/Response/diagnosticplan/ResponseDiagnosticPlan';
import { ClinicHistoryService } from '../../../../core/services/clinic-history.service';
import { GeneralService } from '../../../../core/services/general.service';
import { saveAs as fileSaverSave } from 'file-saver';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-popup-evidences-clinic-history',
  templateUrl: './popup-evidences-clinic-history.component.html',
  styleUrls: ['./popup-evidences-clinic-history.component.scss']
})
export class PopupEvidencesClinicHistoryComponent implements OnInit {

  clinicHistory: ResponseClinicHistoryDTO;
  diagnostic: RequestDiagnosticPlanCLinicHistory;
  diagnosticPlans: ResponseDiagnosticPlan[] = [];
  responseDiagnosticPlan: ResponseDiagnosticPlan;
  search;
  lab: string;
  loadingLargeGroup = false;
  disabledUpdate = false;
  examHidden = false;
  resultHidden=false;
  checkOutForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private toastrService: GeneralService, protected ref: NbDialogRef<PopupEvidencesClinicHistoryComponent>, private service: ClinicHistoryService) {

    this.checkOutForm = this.formBuilder.group({

      interpretationResults: ['', [Validators.required]],
      diagnosticImpression: ['', [Validators.required]],

    });
  }

  ngOnInit(): void {
    this.diagnosticPlans = this.clinicHistory.diagnosticPlans;
  }
  cancel() {
    this.ref.close();
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

  updateInterpretResult(result){

  }

}
