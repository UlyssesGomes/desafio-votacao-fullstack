import { Component, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-content-panel',
  imports: [CommonModule, ButtonModule],
  templateUrl: './content-panel.html',
  styleUrl: './content-panel.scss',
})
export class ContentPanel {
  @Input()
  title!: string;

  @Input()
  backButton = false;

  constructor(private location: Location) {}

  navigateBack() {
    this.location.back();
  }
}
