import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTicketComponent } from './header-ticket.component';

describe('HeaderTicketComponent', () => {
  let component: HeaderTicketComponent;
  let fixture: ComponentFixture<HeaderTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
