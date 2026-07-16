import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-perguntas',
  standalone: true,
  imports: [],
  templateUrl: './perguntas.component.html',
  styleUrl: './perguntas.component.css'
})
export class PerguntasComponent {
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
