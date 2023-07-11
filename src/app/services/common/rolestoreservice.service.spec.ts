import { TestBed } from '@angular/core/testing';

import { RolestoreserviceService } from './rolestoreservice.service';

describe('RolestoreserviceService', () => {
  let service: RolestoreserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolestoreserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
