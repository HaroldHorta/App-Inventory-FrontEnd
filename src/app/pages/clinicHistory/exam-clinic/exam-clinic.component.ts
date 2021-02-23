import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ResponseClinicExam } from '../../../core/models/Response/examclinic/ResponseClinicExam';
import { ExamClinicService } from '../../../core/services/exam-clinic.service';
import { GeneralService } from '../../../core/services/general.service';
import { PopupAddExamclinicComponent } from './popup-add-examclinic/popup-add-examclinic.component';

@Component({
  selector: 'ngx-exam-clinic',
  templateUrl: './exam-clinic.component.html',
  styleUrls: ['./exam-clinic.component.scss']
})
export class ExamClinicComponent implements OnInit {


  hideFilters = false;
  examclinic: ResponseClinicExam[];
  searchExamclinic;
  changeDetectorRef: ChangeDetectorRef;
  connectionInternet = true;
  hiddenExamclinic = false;


  constructor(private serviceExamclinic: ExamClinicService,
    private toastrService: GeneralService, private dialogService: NbDialogService,
    changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;

    this.getExamclinicList();
  }

  ngOnInit(): void {
  }

  getExamclinicList() {
    this.serviceExamclinic.getClinicExam().subscribe(
      examclinic => {
        this.examclinic = examclinic;

        if (this.examclinic.length === 0) {
          this.hiddenExamclinic = true;
        } else {
          this.hiddenExamclinic = false;
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
    this.dialogService.open(PopupAddExamclinicComponent).onClose.subscribe(() => {
      this.getExamclinicList();
    });
  }

  onDeleteConfirm(event, id): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.serviceExamclinic.delete(id).subscribe(data => {
        const type = 'success';
        const quote = { title: null, body: 'Vacuna eliminada correctamente' };
        this.toastrService.showToast(type, quote.title, quote.body);
        this.getExamclinicList();
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
