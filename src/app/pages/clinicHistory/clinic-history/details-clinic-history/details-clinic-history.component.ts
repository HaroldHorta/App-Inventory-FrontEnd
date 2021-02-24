import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseClinicHistoryDTO } from '../../../../core/models/Response/clinichistory/ResponseClinicHistoryDTO';
import { ClinicHistoryService } from '../../../../core/services/clinic-history.service';

@Component({
  selector: 'ngx-details-clinic-history',
  templateUrl: './details-clinic-history.component.html',
  styleUrls: ['./details-clinic-history.component.scss']
})
export class DetailsClinicHistoryComponent implements OnInit {

  idClinicHistory: string;
  clinicHistory: ResponseClinicHistoryDTO
  constructor(private activeRouter: ActivatedRoute, private clinicHistoryService: ClinicHistoryService) { }

  ngOnInit(): void {
    this.idClinicHistory = this.activeRouter.snapshot.paramMap.get('idClinicHistory');
    console.log(this.idClinicHistory)

    this.getById(this.idClinicHistory);


  }

  getById(id) {
    this.clinicHistoryService.getById(id).subscribe(clinicHistory =>{
      this.clinicHistory = clinicHistory
      console.log(JSON.stringify(this.clinicHistory))

    }
    )

  }

}
