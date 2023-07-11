import { TestBed } from '@angular/core/testing';

import { TempdemographicsService } from './tempdemographics.service';

describe('TempdemographicsService', () => {
  let service: TempdemographicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempdemographicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
