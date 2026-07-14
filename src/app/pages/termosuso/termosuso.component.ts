import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-termosuso',
  standalone: true,
  imports: [],
  templateUrl: './termosuso.component.html',
  styleUrl: './termosuso.component.css'
})
export class TermosusoComponent {
  constructor(
      private readonly location: Location,
      private readonly router: Router
    ) {}
  
    goToPreviousPage(): void {
      if (window.history.length > 1) {
        this.location.back();
        return;
      }
  
      this.router.navigateByUrl('/');
    }
}
