import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent {

  // Doughnut
  @Input() chartLabel: string[];
  @Input() chartData: number[];
  @Input() colors: any[];
  @Input() doughnutChartType = 'doughnut';

  chartOptions = {
    responsive: true
  };

  //
  // // events
  // public chartClicked(e: any): void {
  // }
  //
  // public chartHovered(e: any): void {
  // }
}

