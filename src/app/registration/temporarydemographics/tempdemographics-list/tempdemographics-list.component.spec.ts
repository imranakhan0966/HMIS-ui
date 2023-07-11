import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempdemographicsListComponent } from './tempdemographics-list.component';

describe('TempdemographicsListComponent', () => {
  let component: TempdemographicsListComponent;
  let fixture: ComponentFixture<TempdemographicsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempdemographicsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempdemographicsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
