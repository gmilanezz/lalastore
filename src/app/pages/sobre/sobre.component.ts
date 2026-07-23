import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class SobreComponent {

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