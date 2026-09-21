import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumber } from 'primeng/inputnumber';

@Component({
  selector: 'app-open-session-dialog',
  imports: [FormsModule, Dialog, ButtonModule, InputNumber, FloatLabel],
  templateUrl: './open-session-dialog.html',
  styleUrl: './open-session-dialog.scss',
})
export class OpenSessionDialog {
  @Input()
  visible = false;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  @Output()
  onClose: EventEmitter<any> = new EventEmitter<any>();

  duration = 1;

  confirm() {
    if(this.duration == undefined || this.duration <= 0)
        this.duration = 60;
    else
      this.duration *= 60;
    this.onClose.emit({confirm: true, duration: this.duration});
    this.close();
  }

  onCloseDialog() {
    this.onClose.emit({confirm: false, duration: 0});
    this.close();
  }

  close() {
    this.visibleChange.emit(false);
    this.visible = false;
  }
}
