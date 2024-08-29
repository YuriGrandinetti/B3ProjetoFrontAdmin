import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true, // Adicione esta linha
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}
  navigateToCadastroUsuario(event: Event) {
    event.preventDefault(); // Evita o comportamento padrão do link
    this.router.navigate(['/cadastro-usuario']);
  }

  navigateToPerfilUsuario(event: Event) {
    event.preventDefault(); // Evita o comportamento padrão do link
    this.router.navigate(['/perfil-usuario']); // Corrigido para a rota correta
  }

  logout(event: Event): void {
    event.preventDefault(); // Evita o comportamento padrão do link
    // Limpar qualquer estado de autenticação, como tokens
    localStorage.removeItem('token');
    // Redirecionar para a página de login
    this.router.navigate(['/login']);
  }
}

