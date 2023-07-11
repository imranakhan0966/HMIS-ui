import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempdemographicsEditComponent } from './tempdemographics-edit.component';

describe('TempdemographicsEditComponent', () => {
  let component: TempdemographicsEditComponent;
  let fixture: ComponentFixture<TempdemographicsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempdemographicsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempdemographicsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
