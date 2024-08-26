import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5076/api/Usuarios/login'; // URL do endpoint de login

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const loginData = { id: 0, nome: '', email, senha: password }; // Ajuste para incluir 'id' e 'nome'
    return this.http.post<any>(this.apiUrl, loginData).pipe(
      tap(response => {
        if (response.token) {
          // Armazena o token JWT no localStorage
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }


  logout() {
    // Remove o token JWT do localStorage
    localStorage.removeItem('authToken');
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
