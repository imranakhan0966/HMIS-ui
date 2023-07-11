import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityVerificationComponent } from './eligibility-verification.component';

describe('EligibilityVerificationComponent', () => {
  let component: EligibilityVerificationComponent;
  let fixture: ComponentFixture<EligibilityVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EligibilityVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EligibilityVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
