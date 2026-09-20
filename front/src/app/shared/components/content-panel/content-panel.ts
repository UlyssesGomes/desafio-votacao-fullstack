import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-panel',
  imports: [],
  templateUrl: './content-panel.html',
  styleUrl: './content-panel.scss',
})
export class ContentPanel {
  @Input()
  title!: string;
}
