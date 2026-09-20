import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { NavbarMenuItem } from './navbar-menu-item';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @Input()
  menuButtons?: NavbarMenuItem[];

  isOpen = false;

  constructor(private router: Router) {}

  openSidebar() {
    this.isOpen = !this.isOpen;
  }
}
