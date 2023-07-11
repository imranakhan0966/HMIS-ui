import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontdeskcollectionComponent } from './frontdeskcollection.component';

describe('FrontdeskcollectionComponent', () => {
  let component: FrontdeskcollectionComponent;
  let fixture: ComponentFixture<FrontdeskcollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontdeskcollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontdeskcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
