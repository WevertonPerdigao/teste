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

  chartOptions = {
    responsive: true
  };

  public doughnutChartType: string = 'doughnut';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}

