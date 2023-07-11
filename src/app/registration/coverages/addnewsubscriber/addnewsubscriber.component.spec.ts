import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewsubscriberComponent } from './addnewsubscriber.component';

describe('AddnewsubscriberComponent', () => {
  let component: AddnewsubscriberComponent;
  let fixture: ComponentFixture<AddnewsubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewsubscriberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewsubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
