import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationHistoryService {
  private previousUrl = '/';
  private currentUrl = '/';

  constructor(private readonly router: Router) {
    this.currentUrl = this.router.url;

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const navigation = event as NavigationEnd;

        this.previousUrl = this.currentUrl;
        this.currentUrl = navigation.urlAfterRedirects;
      });
  }

  getPreviousUrl(): string {
    return this.previousUrl || '/';
  }
}