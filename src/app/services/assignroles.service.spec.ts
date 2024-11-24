import { TestBed } from '@angular/core/testing';

import { AssignrolesService } from './assignroles.service';

describe('AssignrolesService', () => {
  let service: AssignrolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignrolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
