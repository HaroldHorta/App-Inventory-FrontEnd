import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from '../../../../core/services/general.service';
import { VeterinaryService } from '../../../../core/services/veterinary.service';

@Component({
  selector: 'ngx-popup-add-veterinary',
  templateUrl: './popup-add-veterinary.component.html',
  styleUrls: ['./popup-add-veterinary.component.scss']
})
export class PopupAddVeterinaryComponent implements OnInit {

  checkOutForm: FormGroup;
  disableButton = false;
  loadingLargeGroup = false;

  constructor(protected ref: NbDialogRef<PopupAddVeterinaryComponent>, private formBuilder: FormBuilder,
    private toastrService: GeneralService, private serviceVeterinary: VeterinaryService) {
    this.checkOutForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      professionalCard: ['', [Validators.required]],
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
      this.serviceVeterinary.create(event).subscribe(() => {
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
