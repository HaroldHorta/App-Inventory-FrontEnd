import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogService,NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Status } from '../../core/models/Response/enum/Status.enum';
import { ResponseProduct } from '../../core/models/Response/product/ResponseProduct.module';
import { GeneralService } from '../../core/services/general.service';
import { ProductService } from '../../core/services/product.service';
import { PopDetailsComponent } from './pop-details/pop-details.component';
import { PopupComponent } from './popup/popup.component';

//
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  Nombre: string;
  Categoria: string;
  Estado: string;
  Descripcion: string;
  Existencias: number;
  
}

//

@Component({
  selector: 'ngx-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})

export class InventoryComponent {
  customColumn = 'Nombre';
  defaultColumns = [ 'Categoria', 'Estado', 'Descripcion', 'Existencias' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  product:ResponseProduct[];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private serviceProduct : ProductService, private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  getProductList() {
        this.serviceProduct.getProducts().subscribe(
          product => {
            this.product = product;
            if (this.product.length === 0) {
             // this.hideListProduct = true;
            }
           // this.changeDetectorRef.reattach();
          },
        );
      }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }



  private data: TreeNode<FSEntry>[] = [
    this.product.forEach ( p => {})
      data: { Nombre: 'Projects', Categoria: '1.8 MB', Estado: '5',Descripcion:'asd', Existencias: 5 },
    },
      {
      data: { Nombre: 'Haorld', Categoria: '7.2 MB', Estado: '4',Descripcion:'asd', Existencias : 5 },
    },
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}



// export class InventoryComponent implements OnInit {

//   @Input() receivedParentMessage: string;
//   @Input() products: ResponseProduct;
//   @Output() messageToEmit = new EventEmitter<string>();

//   messageToSendC: string = 'Hello Parent!';
//   product: ResponseProduct[];
//   names: string[] = [];
//   changeDetectorRef: ChangeDetectorRef;
//   checked = false;
//   hideListProduct = false;


//   constructor(private serviceProduct: ProductService, changeDetectorRef: ChangeDetectorRef,
//     private generalService: GeneralService,
//     private dialog: NbDialogService) {
//     this.changeDetectorRef = changeDetectorRef;
//   }

//   ngOnInit(): void {
//     this.getProductList();
//   }

//  
//   open() {
//     this.dialog.open(PopupComponent).onClose.subscribe(() => {
//       this.getProductList();
//     });
//   }

//   title: string;

//   openModal(item) {
//     this.dialog.open(PopupComponent, { context: { productEdit: item } });
//   }
//   openModalDetails(item) {
//     this.dialog.open(PopDetailsComponent, { context: { productDetails: item } });
//   }

//   updateStatus(event, id) {
//     let message;
//     let status;
//     if (event) {
//       message = 'El producto se activo correctamente';
//       status = Status.ACTIVE;
//     } else {
//       message = 'El producto se desactivo correctamente';
//       status = Status.INACTIVE;
//     }
//     this.serviceProduct.updateStatus(id, status).subscribe(
//       data => {
//         this.product = data;
//         const type = 'success';
//         const quote = { title: null, body: message };
//         this.generalService.showToast(type, quote.title, quote.body);
//         this.getProductList();
//       },
//     );
//   }
// }
