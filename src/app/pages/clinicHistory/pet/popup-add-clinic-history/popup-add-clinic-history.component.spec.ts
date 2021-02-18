import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddClinicHistoryComponent } from './popup-add-clinic-history.component';

describe('PopupAddClinicHistoryComponent', () => {
  let component: PopupAddClinicHistoryComponent;
  let fixture: ComponentFixture<PopupAddClinicHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAddClinicHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAddClinicHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
