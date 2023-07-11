import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporarydemographicsComponent } from './temporarydemographics.component';

describe('TemporarydemographicsComponent', () => {
  let component: TemporarydemographicsComponent;
  let fixture: ComponentFixture<TemporarydemographicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemporarydemographicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemporarydemographicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
