import { TestBed, inject } from '@angular/core/testing';

import { EnumDataService } from './enum-data.service';

describe('EnumDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnumDataService]
    });
  });

  it('should be created', inject([EnumDataService], (service: EnumDataService) => {
    expect(service).toBeTruthy();
  }));
});
