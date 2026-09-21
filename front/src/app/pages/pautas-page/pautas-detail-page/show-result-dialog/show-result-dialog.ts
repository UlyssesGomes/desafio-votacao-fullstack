import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { Chip } from 'primeng/chip';
import { Dialog } from 'primeng/dialog';

import { PautaResult } from '../../model/pauta-result';

@Component({
  selector: 'app-show-result-dialog',
  imports: [Dialog, ButtonModule, Chip],
  templateUrl: './show-result-dialog.html',
  styleUrl: './show-result-dialog.scss',
})
export class ShowResultDialog {
  @Input()
  visible = false;

  @Input()
  pautaResult?: PautaResult;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  close() {
    this.visibleChange.emit(false);
    this.visible = false;
  }
}
