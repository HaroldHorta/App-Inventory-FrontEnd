import { Component, OnInit } from '@angular/core';
import { ResponseCustomer } from '../../../../core/models/Response/customer/ResponseCustomer.module';
import { CustomerService } from '../../../../core/services/customer.service';

@Component({
  selector: 'ngx-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  customers: ResponseCustomer[];
  errores: string [];

  constructor(private serviceCustomer: CustomerService) { }

  ngOnInit(): void {
    this.getCustomersList();
  }

  getCustomersList(){
    this.serviceCustomer.getCustomers().subscribe(
      customers =>{
        this.customers = customers;
        console.log("Listado de customers", this.customers)
      }
    )
  }
}
