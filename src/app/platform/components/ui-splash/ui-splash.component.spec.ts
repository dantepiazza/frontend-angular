import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSplashComponent } from './ui-splash.component';

describe('UiSpinnerComponent', () => {
  let component: UiSplashComponent;
  let fixture: ComponentFixture<UiSplashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiSplashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
