import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponsePet } from '../../../core/models/Response/pet/ResponsePet';
import { PetService } from '../../../core/services/pet.service';

@Component({
  selector: 'ngx-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {

  checkOutForm: FormGroup;
  pet: ResponsePet[];
  loadingLargeGroup = false;
  disabledUpdate = false;
  petHidden = false;
  searchPet = false;
  constructor(private formBuilder: FormBuilder, private petService: PetService) {

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
    this.petService.getByCustomer(nroDocument.nroDocument).subscribe(pet => {
      this.searchPet = true;
      this.pet = pet;
      if (this.pet.length != 0) {
        console.log('pasa')
        this.petHidden = true;
      } else {
        this.petHidden = false;
      }
      console.log(this.pet)
      this.loadingLargeGroup = false;
      this.disabledUpdate = false;
    })
  }
  /*<i>[fin][]</i>
   *@author [CadenaCristian]
   *@since 27/12/2020*/



}
