import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInterestComponent } from './project-interest.component';

describe('ProjectInterestComponent', () => {
  let component: ProjectInterestComponent;
  let fixture: ComponentFixture<ProjectInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
