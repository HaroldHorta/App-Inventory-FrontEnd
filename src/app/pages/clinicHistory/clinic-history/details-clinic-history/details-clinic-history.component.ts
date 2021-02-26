import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseClinicHistoryDTO } from '../../../../core/models/Response/clinichistory/ResponseClinicHistoryDTO';
import { ResponseDiagnosticPlan } from '../../../../core/models/Response/diagnosticplan/ResponseDiagnosticPlan';
import { ClinicHistoryService } from '../../../../core/services/clinic-history.service';
import { saveAs as fileSaverSave } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  loadingLargeGroup = false;
  disabledUpdate = false;

  downloadPDF() {

    this.loadingLargeGroup = true;
    this.disabledUpdate = true;
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const options = {
      background: 'white',
      scale: 3,
      scrollY: (window.pageYOffset * -1),
    };
    html2canvas(DATA, options).then((canvas) => {

      /*  
    
          // Add image Canvas to PDF
      
          const imgProps = (doc as any).getImageProperties(img);
          const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
          console.log(imgProps)
          console.log(pdfHeight)
          if (imgProps.height >= pdfHeight) {
            doc.addPage();
           // bufferY += 15;
            doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
          }
    
          return doc;
    */


      const imgData = canvas.toDataURL('image/PNG');

      /*
      Here are the numbers (paper width and height) that I found to work. 
      It still creates a little overlap part between the pages, but good enough for me.
      if you can find an official number from jsPDF, use them.
      */
      var imgWidth = 190;
      var pageHeight = 285;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      var doc = new jsPDF('p', 'mm');
      var position = 0;

      doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      return doc;
      //  doc.save('file.pdf');
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_facturacion_equi-dog.pdf`);
      this.loadingLargeGroup = false;
      this.disabledUpdate = false;
    });

  }
}
