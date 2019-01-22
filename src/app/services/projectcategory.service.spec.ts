import { TestBed, inject } from '@angular/core/testing';

import { ProjectCategoryService } from './projectcategory.service';

describe('ProjectcategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectCategoryService]
    });
  });

  it('should be created', inject([ProjectCategoryService], (service: ProjectCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
