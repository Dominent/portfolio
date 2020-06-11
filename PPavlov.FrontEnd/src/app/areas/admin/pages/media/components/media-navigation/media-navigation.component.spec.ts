import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaNavigationComponent } from './media-navigation.component';

describe('MediaNavigationComponent', () => {
  let component: MediaNavigationComponent;
  let fixture: ComponentFixture<MediaNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
