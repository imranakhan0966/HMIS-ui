import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchappointmentComponent } from './searchappointment.component';

describe('SearchappointmentComponent', () => {
  let component: SearchappointmentComponent;
  let fixture: ComponentFixture<SearchappointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchappointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
