import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCardModalComponent } from './insurance-card-modal.component';

describe('InsuranceCardModalComponent', () => {
  let component: InsuranceCardModalComponent;
  let fixture: ComponentFixture<InsuranceCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceCardModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
