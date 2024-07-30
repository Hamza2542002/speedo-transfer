import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTranferComponent } from './money-tranfer.component';

describe('MoneyTranferComponent', () => {
  let component: MoneyTranferComponent;
  let fixture: ComponentFixture<MoneyTranferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyTranferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyTranferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
