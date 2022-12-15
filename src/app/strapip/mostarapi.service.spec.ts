import { TestBed } from '@angular/core/testing';

import { MostarapiService } from './mostarapi.service';

describe('MostarapiService', () => {
  let service: MostarapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostarapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
