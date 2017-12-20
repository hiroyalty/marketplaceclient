import { TestBed, inject } from '@angular/core/testing';

import { ProjectStatusService } from './project-status.service';

describe('ProjectStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectStatusService]
    });
  });

  it('should be created', inject([ProjectStatusService], (service: ProjectStatusService) => {
    expect(service).toBeTruthy();
  }));
});
