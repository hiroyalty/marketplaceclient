import { TestBed, inject } from '@angular/core/testing';

import { EmployerAuthGuardService } from './employer-auth-guard.service';

describe('EmployerAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployerAuthGuardService]
    });
  });

  it('should be created', inject([EmployerAuthGuardService], (service: EmployerAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
