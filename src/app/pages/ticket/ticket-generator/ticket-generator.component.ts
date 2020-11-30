import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseCustomer } from '../../../core/models/Response/customer/ResponseCustomer.module';
import { ResponseTicket } from '../../../core/models/Response/ticket/ResponseTicket.module';
import { CustomerService } from '../../../core/services/customer.service';
import { TicketService } from '../../../core/services/ticket.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'ngx-ticket-generator',
  templateUrl: './ticket-generator.component.html',
  styleUrls: ['./ticket-generator.component.scss'],
})
export class TicketGeneratorComponent implements OnInit {

  idTicket: string;
  ticket: ResponseTicket;
  customer: ResponseCustomer;
  product: string;
  loadingLargeGroup = false;
  disabledUpdate = false;

  @ViewChild('htmlData', { static: false }) htmlData: ElementRef;

  constructor(private activeRouter: ActivatedRoute, private ticketService: TicketService, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.idTicket = this.activeRouter.snapshot.paramMap.get('idTicket');
    this.getTicketById(this.idTicket);
  }

  getTicketById(id) {
    this.ticketService.getTicketById(id).subscribe(data => {
      this.ticket = data;
    });
  }

  downloadPDF() {
    this.loadingLargeGroup = true;
    this.disabledUpdate = true;
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
      scrollY: (window.pageYOffset * -1),
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_facturacion_equi-dog.pdf`);
      this.loadingLargeGroup = false;
      this.disabledUpdate = false;
    });
  }

}
