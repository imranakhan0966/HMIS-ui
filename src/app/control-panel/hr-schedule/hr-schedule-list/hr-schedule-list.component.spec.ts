import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrScheduleListComponent } from './hr-schedule-list.component';

describe('HrScheduleListComponent', () => {
  let component: HrScheduleListComponent;
  let fixture: ComponentFixture<HrScheduleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrScheduleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
