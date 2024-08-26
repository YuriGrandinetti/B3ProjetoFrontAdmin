import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  logout(): void {
    // Limpar qualquer estado de autenticação, como tokens
    localStorage.removeItem('token');
    // Redirecionar para a página de login
    this.router.navigate(['/login']);
  }
}

