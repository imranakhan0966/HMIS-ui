import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEmployeeLicenseEditComponent } from './hr-employee-license-edit.component';

describe('HrEmployeeLicenseEditComponent', () => {
  let component: HrEmployeeLicenseEditComponent;
  let fixture: ComponentFixture<HrEmployeeLicenseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrEmployeeLicenseEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrEmployeeLicenseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
