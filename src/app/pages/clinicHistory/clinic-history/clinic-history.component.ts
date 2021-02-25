import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ResponseClinicHistoryDTO } from '../../../core/models/Response/clinichistory/ResponseClinicHistoryDTO';
import { ClinicHistoryService } from '../../../core/services/clinic-history.service';
import { GeneralService } from '../../../core/services/general.service';
import { PopupEvidencesClinicHistoryComponent } from './popup-evidences-clinic-history/popup-evidences-clinic-history.component';

@Component({
  selector: 'ngx-clinic-history',
  templateUrl: './clinic-history.component.html',
  styleUrls: ['./clinic-history.component.scss']
})
export class ClinicHistoryComponent implements OnInit {

  checkOutForm: FormGroup;
  clinicHistory: ResponseClinicHistoryDTO[];
  idClinicHistory: string;
  loadingLargeGroup = false;
  disabledUpdate = false;
  clinicHistoryHidden = false;
  searchClinicHistory = false;
  constructor(private toastrService: GeneralService, private dialogService: NbDialogService, private router: Router,
    private formBuilder: FormBuilder, private clinicHistoryService: ClinicHistoryService) {

    this.checkOutForm = this.formBuilder.group({
      nroDocument: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 27/12/2020
*Metodo se encarga de buscar las mascotas asociadas al numero de documento del cliente*/
  findByNroDocument(nroDocument) {
    this.loadingLargeGroup = true;
    this.disabledUpdate = true;
    this.clinicHistoryService.getByCustomer(nroDocument.nroDocument).subscribe(clinicHistory => {
      this.searchClinicHistory = true;
      this.clinicHistory = clinicHistory;
      if (this.clinicHistory.length != 0) {
        this.clinicHistoryHidden = true;
      } else {
        this.clinicHistoryHidden = false;
      }
      this.loadingLargeGroup = false;
      this.disabledUpdate = false;
    }, (err) => {
      const type = 'danger';
      const quote = { title: null, body: err.error.detailMessage };
      this.toastrService.showToast(type, quote.title, quote.body);
      this.loadingLargeGroup = false;
      this.loadingLargeGroup = false;
      this.disabledUpdate = false;
    })
  }
  /*<i>[fin][]</i>
   *@author [CadenaCristian]
   *@since 27/12/2020*/

   openClinicHistory(idClinicHistory){
     this.idClinicHistory = idClinicHistory;
    this.router.navigate(['pages/clinic-history', this.idClinicHistory]);  

   }

   openModalEvidences(clinicHistory) {
    this.dialogService.open(PopupEvidencesClinicHistoryComponent, { context: { clinicHistory: clinicHistory } }).onClose.subscribe(res => {
      const nro = { nroDocument: res.customer.nroDocument }
      this.findByNroDocument(nro);
    });
  }
}
