import { TestBed, inject } from '@angular/core/testing';

import { UsercategoryService } from './usercategory.service';

describe('UsercategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsercategoryService]
    });
  });

  it('should be created', inject([UsercategoryService], (service: UsercategoryService) => {
    expect(service).toBeTruthy();
  }));
});
