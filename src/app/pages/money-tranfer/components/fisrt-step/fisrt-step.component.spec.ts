import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FisrtStepComponent } from './fisrt-step.component';

describe('FisrtStepComponent', () => {
  let component: FisrtStepComponent;
  let fixture: ComponentFixture<FisrtStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FisrtStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FisrtStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
