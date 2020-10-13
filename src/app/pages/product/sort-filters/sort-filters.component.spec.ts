import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortFiltersComponent } from './sort-filters.component';

describe('SortFiltersComponent', () => {
  let component: SortFiltersComponent;
  let fixture: ComponentFixture<SortFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
