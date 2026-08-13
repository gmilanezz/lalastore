import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import {
  CatalogItem,
  CatalogService
} from '../../services/catalog.service';

interface HeaderBrand {
  name: string;
  catalogs: string[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, NgIf, NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  openSubmenu: string | null = null;
  brands: HeaderBrand[] = [];

  private catalogSubscription?: Subscription;

  constructor(
    public readonly cartService: CartService,
    private readonly catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.catalogSubscription = this.catalogService.state$.subscribe((state) => {
      this.brands = this.groupCatalogsByBrand(state.brands, state.catalogs);
    });
  }

  ngOnDestroy(): void {
    this.catalogSubscription?.unsubscribe();
  }

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

  private groupCatalogsByBrand(
    brands: string[],
    catalogs: CatalogItem[]
  ): HeaderBrand[] {
    return brands
      .map((brand) => ({
        name: brand,
        catalogs: catalogs
          .filter(
            (item) => this.normalize(item.brand) === this.normalize(brand)
          )
          .map((item) => item.catalog)
          .sort((a, b) =>
            a.localeCompare(b, 'pt-BR', { sensitivity: 'base' })
          )
      }))
      .sort((a, b) =>
        a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' })
      );
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}
