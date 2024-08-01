import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferHeroComponent } from './transfer-hero.component';

describe('TransferHeroComponent', () => {
  let component: TransferHeroComponent;
  let fixture: ComponentFixture<TransferHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
