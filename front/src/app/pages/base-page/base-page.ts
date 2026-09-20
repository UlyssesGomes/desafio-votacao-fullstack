import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { Footer } from '../../core/components/footer/footer';

@Component({
  selector: 'app-base-page',
  imports: [RouterOutlet, ButtonModule, Footer],
  templateUrl: './base-page.html',
  styleUrl: './base-page.scss',
})
export class BasePage {

}
