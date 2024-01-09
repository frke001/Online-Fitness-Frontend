import { TestBed } from '@angular/core/testing';

import { NinjaService } from './ninja.service';

describe('NinjaService', () => {
  let service: NinjaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NinjaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
