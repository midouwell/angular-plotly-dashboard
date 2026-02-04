import { Component, Input } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-category-chart',
  standalone: true,
  imports: [PlotlyModule],
  templateUrl: './category-chart.component.html',
  styleUrl: './category-chart.component.css'
})
export class CategoryChartComponent {

  @Input() data: any[] = [];
  @Input() layout: any;
  @Input() revision = 0;
}
