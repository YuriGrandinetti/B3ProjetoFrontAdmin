import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerfilUsuario } from '../models/perfilusuario.model'; // Crie um model para PerfilUsuario se necessário

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {
  private apiUrl = 'http://localhost:5000/api/perfilusuario'; // Ajuste para a URL correta da sua API

  constructor(private http: HttpClient) { }

  // Método para obter todos os perfis de usuário
  getPerfisUsuarios(): Observable<PerfilUsuario[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   // return this.http.get<PerfilUsuario[]>(`${this.apiUrl}/minhas-tarefas`, { headers });
     return this.http.get<PerfilUsuario[]>(this.apiUrl, { headers });
  }

  // Método para obter um perfil de usuário por ID
  getPerfilUsuarioById(id: number): Observable<PerfilUsuario> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<PerfilUsuario>(`${this.apiUrl}/${id}`, { headers });
  }

  // Método para criar um novo perfil de usuário
  createPerfilUsuario(perfilUsuario: PerfilUsuario): Observable<PerfilUsuario> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<PerfilUsuario>(this.apiUrl, perfilUsuario, { headers });
  }

  // Método para excluir um perfil de usuário por ID
  deletePerfilUsuario(id: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // Método para adicionar um perfil a um usuário
  addPerfilToUsuario(usuarioId: number, perfilUsuarioId: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.apiUrl}/${usuarioId}/perfis/${perfilUsuarioId}`, {headers});
  }

  // Método para remover um perfil de um usuário
  removePerfilFromUsuario(usuarioId: number, perfilUsuarioId: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${usuarioId}/perfis/${perfilUsuarioId}`, {headers});
  }
}

