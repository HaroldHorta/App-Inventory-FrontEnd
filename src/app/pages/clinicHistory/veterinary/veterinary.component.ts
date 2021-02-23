import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ResponseVeterinary } from '../../../core/models/Response/veterinary/ResponseVeterinary';
import { GeneralService } from '../../../core/services/general.service';
import { VeterinaryService } from '../../../core/services/veterinary.service';
import { PopupAddVeterinaryComponent } from './popup-add-veterinary/popup-add-veterinary.component';

@Component({
  selector: 'ngx-veterinary',
  templateUrl: './veterinary.component.html',
  styleUrls: ['./veterinary.component.scss']
})
export class VeterinaryComponent implements OnInit {


  hideFilters = false;
  veterinary: ResponseVeterinary[] = [];
  searchVeterinary;
  changeDetectorRef: ChangeDetectorRef;
  connectionInternet = true;
  hiddenVeterinary = false;


  constructor(private serviceVeterinary: VeterinaryService,
    private toastrService: GeneralService, private dialogService: NbDialogService,
    changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;

    this.getVeterinaryList();
  }

  ngOnInit(): void {
  }

  getVeterinaryList() {
    this.serviceVeterinary.getVeterinary().subscribe(
      veterinary => {
        this.veterinary = veterinary;

        if (this.veterinary.length === 0) {
          this.hiddenVeterinary = true;
        } else {
          this.hiddenVeterinary = false;
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
    this.dialogService.open(PopupAddVeterinaryComponent).onClose.subscribe(() => {
      this.getVeterinaryList();
    });
  }

  onDeleteConfirm(event, id): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.serviceVeterinary.delete(id).subscribe(data => {
        const type = 'success';
        const quote = { title: null, body: 'Vacuna eliminada correctamente' };
        this.toastrService.showToast(type, quote.title, quote.body);
        this.getVeterinaryList();
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
