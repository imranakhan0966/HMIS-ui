import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographicsListComponent } from './demographics-list.component';

describe('DemographicsListComponent', () => {
  let component: DemographicsListComponent;
  let fixture: ComponentFixture<DemographicsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemographicsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemographicsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
