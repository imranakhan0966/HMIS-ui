import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEmployeeCreateComponent } from './hr-employee-create.component';

describe('HrEmployeeCreateComponent', () => {
  let component: HrEmployeeCreateComponent;
  let fixture: ComponentFixture<HrEmployeeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrEmployeeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrEmployeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
