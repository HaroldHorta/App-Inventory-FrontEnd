import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-sort-filters',
  templateUrl: './sort-filters.component.html',
  styleUrls: ['./sort-filters.component.scss'],
})
export class SortFiltersComponent implements OnInit {

  @Input()
  filters: any[];

  @Output()
  sortChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectChange($event) {
    this.sortChange.emit($event.target.value);
  }

}
