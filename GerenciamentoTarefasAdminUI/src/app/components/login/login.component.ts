import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule, // Adiciona o HttpClientModule ao array de imports
  ],
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {} // Injete o AuthService e o Router

  onSubmit() {
    this.authService.login(this.loginData.email, this.loginData.password)
      .subscribe(
        response => {
          console.log('Login bem-sucedido', response);
          // Redireciona o usuário para a página principal ou painel após o login
          this.router.navigate(['/dashboard']); // substitua '/dashboard' pela rota desejada
        },
        error => {
          console.error('Erro de login', error);
          // Exiba uma mensagem de erro para o usuário, se necessário
        }
      );
  }
}
