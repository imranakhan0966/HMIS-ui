import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEmployeeEditComponent } from './hr-employee-edit.component';

describe('HrEmployeeEditComponent', () => {
  let component: HrEmployeeEditComponent;
  let fixture: ComponentFixture<HrEmployeeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrEmployeeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrEmployeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
