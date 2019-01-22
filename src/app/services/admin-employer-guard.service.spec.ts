import { TestBed, inject } from '@angular/core/testing';

import { AdminEmployerGuardService } from './admin-employer-guard.service';

describe('AdminEmployerGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminEmployerGuardService]
    });
  });

  it('should be created', inject([AdminEmployerGuardService], (service: AdminEmployerGuardService) => {
    expect(service).toBeTruthy();
  }));
});
