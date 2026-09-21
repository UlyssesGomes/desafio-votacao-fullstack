import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { NavbarMenuItem } from './navbar-menu-item';
import { SimpleSidebar } from '../../../shared/components/simple-sidebar/simple-sidebar';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, SimpleSidebar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @Input()
  menuButtons?: NavbarMenuItem[];

  isSidebarOpen = false;

  constructor(private router: Router) {}

  openSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
