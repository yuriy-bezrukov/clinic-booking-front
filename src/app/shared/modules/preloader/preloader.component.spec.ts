import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderComponent } from './preloader.component';
import { clearAllCaches } from '../../../../testing/clearAllCaches';

describe('PreloaderComponent', () => {
  let component: PreloaderComponent;
  let fixture: ComponentFixture<PreloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    clearAllCaches();
    fixture = TestBed.createComponent(PreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
