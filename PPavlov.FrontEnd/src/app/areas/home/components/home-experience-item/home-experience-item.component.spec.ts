import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeExperienceItemComponent } from './home-experience-item.component';

describe('HomeExperienceItemComponent', () => {
  let component: HomeExperienceItemComponent;
  let fixture: ComponentFixture<HomeExperienceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeExperienceItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeExperienceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
