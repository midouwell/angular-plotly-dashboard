import { Component, Input } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-scatter-chart',
  standalone: true,
  imports: [PlotlyModule],
  templateUrl: './scatter-chart.component.html',
  styleUrl: './scatter-chart.component.css'
})
export class ScatterChartComponent {
  @Input() data: any[] = [];
  @Input() layout: any;
  @Input() revision = 0;
}
