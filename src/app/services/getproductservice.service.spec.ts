import { TestBed } from '@angular/core/testing';

import { GetproductserviceService } from './getproductservice.service';

describe('GetproductserviceService', () => {
  let service: GetproductserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetproductserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
