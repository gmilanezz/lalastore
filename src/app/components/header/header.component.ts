import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  openSubmenu: string | null = null;

  constructor(public readonly cartService: CartService) {}

  toggleMobileMenu(event?: Event): void {
    event?.stopPropagation();
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.openSubmenu = null;
  }

  toggleSubmenu(menu: string): void {
    this.openSubmenu = this.openSubmenu === menu ? null : menu;
  }
}