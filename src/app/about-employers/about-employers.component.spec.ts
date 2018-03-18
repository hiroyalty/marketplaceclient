import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutEmployersComponent } from './about-employers.component';

describe('AboutEmployersComponent', () => {
  let component: AboutEmployersComponent;
  let fixture: ComponentFixture<AboutEmployersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutEmployersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
