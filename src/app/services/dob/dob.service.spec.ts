import { TestBed } from '@angular/core/testing';

import { DobService } from './dob.service';

describe('DobService', () => {
  let service: DobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
