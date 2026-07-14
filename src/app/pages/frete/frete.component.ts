import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-frete',
  standalone: true,
  imports: [],
  templateUrl: './frete.component.html',
  styleUrl: './frete.component.css'
})
export class FreteComponent {

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
