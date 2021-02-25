import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseClinicHistoryDTO } from '../../../../core/models/Response/clinichistory/ResponseClinicHistoryDTO';
import { ResponseDiagnosticPlan } from '../../../../core/models/Response/diagnosticplan/ResponseDiagnosticPlan';
import { ClinicHistoryService } from '../../../../core/services/clinic-history.service';
import { saveAs as fileSaverSave } from 'file-saver';


@Component({
  selector: 'ngx-details-clinic-history',
  templateUrl: './details-clinic-history.component.html',
  styleUrls: ['./details-clinic-history.component.scss']
})
export class DetailsClinicHistoryComponent implements OnInit {

  idClinicHistory: string;
  clinicHistory: ResponseClinicHistoryDTO = new ResponseClinicHistoryDTO;
  diagnosticPlans: ResponseDiagnosticPlan[] = [];

  constructor(private activeRouter: ActivatedRoute, private clinicHistoryService: ClinicHistoryService) { }

  ngOnInit(): void {
    this.idClinicHistory = this.activeRouter.snapshot.paramMap.get('idClinicHistory');
    this.getById(this.idClinicHistory);


  }

  getById(id) {
    this.clinicHistoryService.getById(id).subscribe(clinicHistory => {
      this.clinicHistory = clinicHistory
      this.diagnosticPlans = this.clinicHistory.diagnosticPlans;
    })

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

}
