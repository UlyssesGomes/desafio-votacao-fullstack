import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';

import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-doughnut-chart',
  imports: [ChartModule],
  templateUrl: './doughnut-chart.html',
  styleUrl: './doughnut-chart.scss',
})
export class DoughnutChart implements OnInit {

  @Input()
  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.data = {
        labels: this.data.labels,
        datasets: [
          {
            data: this.data.result,
            backgroundColor: [documentStyle.getPropertyValue('--p-emerald-400'), documentStyle.getPropertyValue('--p-red-400'), documentStyle.getPropertyValue('--p-gray-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--p-emerald-300'), documentStyle.getPropertyValue('--p-red-300'), documentStyle.getPropertyValue('--p-gray-400')]
          }
        ]
      };

      this.options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };
      this.cd.markForCheck()
    }

  }

}
