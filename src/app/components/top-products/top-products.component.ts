import { Component, Input } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-top-products',
  standalone: true,
  imports: [PlotlyModule],
  templateUrl: './top-products.component.html',
  styleUrl: './top-products.component.css'
})
export class TopProductsComponent {

  @Input() data: any[] = [];
  @Input() layout: any;
  @Input() revision = 0;

}
