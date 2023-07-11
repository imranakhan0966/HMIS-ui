import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrScheduleCreateComponent } from './hr-schedule-create.component';

describe('HrScheduleCreateComponent', () => {
  let component: HrScheduleCreateComponent;
  let fixture: ComponentFixture<HrScheduleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrScheduleCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrScheduleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
