import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeDateInputComponent } from './custome-date-input.component';

describe('CustomeDateInputComponent', () => {
  let component: CustomeDateInputComponent;
  let fixture: ComponentFixture<CustomeDateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomeDateInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomeDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
