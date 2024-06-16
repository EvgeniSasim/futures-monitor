import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FuturesPriceMonitorComponent} from "./components/futures-price-monitor/futures-price-monitor.component";

@Component({
  standalone: true,
  imports: [RouterModule, FuturesPriceMonitorComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
