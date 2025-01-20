import { TestBed } from '@angular/core/testing';

import { OnlinefoodService } from './onlinefood.service';

describe('OnlinefoodService', () => {
  let service: OnlinefoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlinefoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
