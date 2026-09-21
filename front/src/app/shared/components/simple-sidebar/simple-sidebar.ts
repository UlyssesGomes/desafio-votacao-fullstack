import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

import { NavbarMenuItem } from '../../../core/components/navbar/navbar-menu-item';

@Component({
  selector: 'app-simple-sidebar',
  imports: [CommonModule, ButtonModule, DividerModule],
  templateUrl: './simple-sidebar.html',
  styleUrl: './simple-sidebar.scss',
})
export class SimpleSidebar {
  @Input()
  menuButtons?: NavbarMenuItem[];  

  @Input()
  isOpen = false;

  @Output()
  isOpenChange = new EventEmitter<boolean>();

  active = 0;

  constructor(private router: Router) {}

  closeSidebar() {
    this.active = 1;
    this.isOpenChange.emit(false);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.closeSidebar();
  }

  userMenuCommand(action: any) {
    action();
    this.closeSidebar();
  }
}
