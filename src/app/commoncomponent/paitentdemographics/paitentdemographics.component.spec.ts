import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaitentdemographicsComponent } from './paitentdemographics.component';

describe('PaitentdemographicsComponent', () => {
  let component: PaitentdemographicsComponent;
  let fixture: ComponentFixture<PaitentdemographicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaitentdemographicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaitentdemographicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
