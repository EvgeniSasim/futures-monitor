import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {interval, map, Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuturesPriceStoreService } from '../../services/futures-price-store/futures-price-store.service';
import {NgForOf} from "@angular/common";
import {ChartConfiguration, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-futures-price-monitor',
  templateUrl: './futures-price-monitor.component.html',
  styleUrls: ['./futures-price-monitor.component.scss'],
  imports: [
    NgForOf,
    BaseChartDirective
  ],
  standalone: true
})
export class FuturesPriceMonitorComponent implements OnInit, OnDestroy {
  futuresPriceStoreService = inject(FuturesPriceStoreService);

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private unsubscribe$: Subject<void> = new Subject();
  private priceGenerator$ = interval(5000);

  public prices: Record<string, { min: number | null; max: number | null }> = {
    '5m': { min: null, max: null },
    '15m': { min: null, max: null },
    '1h': { min: null, max: null },
    '4h': { min: null, max: null },
    '24h': { min: null, max: null },
  };
  public lineChartType: ChartType = 'line';
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      y: {
        position: 'left',
      },
    },

  };

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Price',
        fill: 'origin',
      },
    ],
    labels: [],
  }
  ngOnInit(): void {
    this.priceGenerator$.pipe(takeUntil(this.unsubscribe$),map(value => value+1)).subscribe(value => {
      const price = this.generateRandomPrice();

      this.futuresPriceStoreService.addPrice(price);
      this.updatePrices();

      this.lineChartData.datasets.forEach((x) => {
        x.data.push(price);
      });
      this.lineChartData?.labels?.push(value*5);

      this.chart?.update();
    });
  }

  private generateRandomPrice(): number {
    return Math.round(Math.random() * 100 + 50);
  }

  private updatePrices(): void {
    for (const interval in this.prices) {
      this.prices[interval].min = this.futuresPriceStoreService.getMin(interval);
      this.prices[interval].max = this.futuresPriceStoreService.getMax(interval);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
