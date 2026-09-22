import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

import { Footer } from '../../core/components/footer/footer';
import { Navbar } from '../../core/components/navbar/navbar'; 
import { NavbarMenuItem } from '../../core/components/navbar/navbar-menu-item';

@Component({
  selector: 'app-base-page',
  imports: [RouterOutlet, ButtonModule, Navbar, Footer, Toast],
  templateUrl: './base-page.html',
  styleUrl: './base-page.scss',
  providers: [MessageService, ConfirmationService]
})
export class BasePage {

  menuButtons?: NavbarMenuItem[] = [
    {
      icon: 'pi-book',
      title: 'Pauta',
      path: 'pautas'
    },
        {
      icon: 'pi-file-check',
      title: 'Votação',
      path: 'votar'
    }
  ];

}
