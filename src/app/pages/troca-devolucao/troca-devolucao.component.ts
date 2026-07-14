import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-troca-devolucao',
  standalone: true,
  imports: [],
  templateUrl: './troca-devolucao.component.html',
  styleUrl: './troca-devolucao.component.css'
})
export class TrocaDevolucaoComponent {

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
