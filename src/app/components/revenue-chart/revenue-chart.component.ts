import { Component, Input } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [PlotlyModule],
  templateUrl: './revenue-chart.component.html',
  styleUrl: './revenue-chart.component.css'
})
export class RevenueChartComponent {
  @Input() data: any[] = [];
  @Input() layout: any;
  @Input() revision = 0;
}
