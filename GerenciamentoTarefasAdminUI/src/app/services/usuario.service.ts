import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:5076/api/usuarios'; // Ajuste para a URL correta da sua API
  private apiUrlregistro = 'http://localhost:5076/api/Usuarios/registrar'
  constructor(private http: HttpClient) { }

  // Método para obter todos os usuários
  getUsuarios(): Observable<Usuario[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario[]>(`${this.apiUrl}/getUsuarios`, { headers });
  }

  // Método para obter um usuário por ID
  getUsuarioById(id: number): Observable<Usuario> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`, {headers});
  }

  // Método para criar um novo usuário
  createUsuario(usuario: Usuario): Observable<Usuario> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Usuario>(this.apiUrlregistro, usuario, {headers});
  }

  // Método para atualizar um usuário
  updateUsuario(id: number, usuario: Usuario): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<void>(`${this.apiUrl}/${id}`, usuario, {headers});
  }

  // Método para excluir um usuário por ID
  deleteUsuario(id: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {headers});
  }
}

