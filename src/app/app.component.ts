import { Component, OnInit } from '@angular/core';
import { SalesService } from './services/sales.service';
import { NgIf } from '@angular/common';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';
import { CategoryChartComponent } from './components/category-chart/category-chart.component';
import { TopProductsComponent } from './components/top-products/top-products.component';
import { ScatterChartComponent } from './components/scatter-chart/scatter-chart.component';

type GraphKey = 'revenue' | 'category' | 'top' | 'scatter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    RevenueChartComponent,
    CategoryChartComponent,
    TopProductsComponent,
    ScatterChartComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  revision = 0;
  selectedGraph: GraphKey = 'revenue';

  revenueData: any[] = [];
  categoryData: any[] = [];
  topData: any[] = [];
  scatterData: any[] = [];

  revenueLayout: any;
  categoryLayout: any;
  topLayout: any;
  scatterLayout: any;

  constructor(private salesService: SalesService) { }

  ngOnInit() {
    this.salesService.getProducts().subscribe(products => {
      this.buildCharts(products);
    });
  }

  buildCharts(products: any[]) {
    // CA par produit
    this.revenueData = [{
      x: products.map(p => p.title),
      y: products.map(p => p.price * p.rating.count),
      type: 'bar'
    }];
    this.revenueLayout = {
      title: { text: 'CA par produit', font: { size: 24 }, x: 0.5 },
      margin: { b: 150 },
      annotations: [{
        text: 'Le CA est calculé comme prix * nombre de ventes',
        xref: 'paper', yref: 'paper', x: 0, y: -0.25, showarrow: false, font: { size: 14 }
      }]
    };

    // CA par catégorie
    const categories: any = {};
    products.forEach(p => categories[p.category] = (categories[p.category] || 0) + p.price * p.rating.count);
    this.categoryData = [{ labels: Object.keys(categories), values: Object.values(categories), type: 'pie' }];
    this.categoryLayout = {
      title: { text: 'Répartition du CA par catégorie', font: { size: 24 }, x: 0.5 },
      annotations: [{ text: 'Chaque part représente le CA total par catégorie', xref: 'paper', yref: 'paper', x: 0, y: -0.25, showarrow: false, font: { size: 14 } }]
    };

    // Top 5 produits
    const top = [...products].sort((a, b) => b.rating.count - a.rating.count).slice(0, 5);
    this.topData = [{ x: top.map(p => p.title), y: top.map(p => p.rating.count), type: 'bar' }];
    this.topLayout = {
      title: { text: 'Top 5 produits les plus vendus', font: { size: 24 }, x: 0.5 },
      margin: { b: 150 },
      annotations: [{ text: 'Classement selon le nombre de ventes', xref: 'paper', yref: 'paper', x: 0, y: -0.25, showarrow: false, font: { size: 14 } }]
    };

    // Scatter prix / ventes
    this.scatterData = [{ x: products.map(p => p.price), y: products.map(p => p.rating.count), type: 'scatter', mode: 'markers' }];
    this.scatterLayout = {
      title: { text: 'Relation prix / ventes', font: { size: 24 }, x: 0.5 },
      xaxis: { title: 'Prix ($)' },
      yaxis: { title: 'Nombre de ventes' },
      annotations: [{ text: 'Chaque point représente un produit', xref: 'paper', yref: 'paper', x: 0, y: -0.15, showarrow: false, font: { size: 14 } }]
    };

    this.revision++;
  }

  selectGraph(key: GraphKey) {
    this.selectedGraph = key;
  }
}

