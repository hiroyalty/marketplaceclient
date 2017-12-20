import { TestBed, inject } from '@angular/core/testing';

import { MemberAuthGuardService } from './member-auth-guard.service';

describe('MemberAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberAuthGuardService]
    });
  });

  it('should be created', inject([MemberAuthGuardService], (service: MemberAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
