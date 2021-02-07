import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ngx-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {

  previousSearch: string;

  animatePlop = false;

  showSearch = true;

  @Output()
  searchChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.previousSearch = '';
  }

  /*
    This event will emit an object indicating the new search term, and:
      -1 if the search term length has descreased
      1 if the search term length has increased
      0 if the search term remained equal
  */

 /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 27/12/2020
*Este metodo se encarga de buscar el nombre del producto escrito en el input*/
  public onSearchKeyup(search: string) {
    let change = 0;
    if (search.length > this.previousSearch.length) {
      change = 1;
    } else if (search.length < this.previousSearch.length) {
      change = -1;
    }
    this.previousSearch = search;
    if (change !== 0) {
      this.searchChange.emit({search, change});
    }
  }
/*<i>[fin][]</i>
   *@author [CadenaCristian]
   *@since 27/12/2020*/

  // Perform a plop animation on the search icon. This animation is executed on keydown just for visual reasons
  plop() {
    this.animatePlop = true;
    setTimeout(() => {
      this.animatePlop = false;
    }, 110);
  }

  reset() {
    this.showSearch = false;
    setTimeout(() => {
      this.showSearch = true;
    });
  }
}
