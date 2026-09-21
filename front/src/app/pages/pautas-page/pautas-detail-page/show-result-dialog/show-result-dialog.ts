import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

import { DoughnutChart } from '../../../../shared/components/doughnut-chart/doughnut-chart';
import { PautaResult } from '../../model/pauta-result';

@Component({
  selector: 'app-show-result-dialog',
  imports: [Dialog, ButtonModule, DoughnutChart],
  templateUrl: './show-result-dialog.html',
  styleUrl: './show-result-dialog.scss',
})
export class ShowResultDialog implements OnInit {

  @Input()
  visible = false;

  @Input()
  pautaResult?: PautaResult;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  chartData: any;

  ngOnInit(): void {
    this.chartData = {
      labels: ['SIM', 'NÃO'],
      result: [this.pautaResult?.SIM, this.pautaResult?.NAO]
    };
  }

  close() {
    this.visibleChange.emit(false);
    this.visible = false;
  }
}
