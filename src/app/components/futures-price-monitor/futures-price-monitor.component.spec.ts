import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FuturesPriceMonitorComponent } from './futures-price-monitor.component';

describe('FuturesPriceMonitorComponent', () => {
  let component: FuturesPriceMonitorComponent;
  let fixture: ComponentFixture<FuturesPriceMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuturesPriceMonitorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FuturesPriceMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
