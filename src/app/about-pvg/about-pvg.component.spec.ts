import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPvgComponent } from './about-pvg.component';

describe('AboutPvgComponent', () => {
  let component: AboutPvgComponent;
  let fixture: ComponentFixture<AboutPvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
