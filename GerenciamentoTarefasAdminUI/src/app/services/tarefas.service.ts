import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/Tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  private apiUrl = 'http://localhost:5076/api/Tarefas';

  constructor(private http: HttpClient) { }

  getTarefas(): Observable<Tarefa[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Tarefa[]>(`${this.apiUrl}/minhas-tarefas`, { headers });
  }

  atualizarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Tarefa>(`${this.apiUrl}/${tarefa.id}`, tarefa, { headers });
  }

  excluirTarefa(id: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // Método para obter as tarefas do usuário logado
  getTarefasEditar(): Observable<any[]> {
    const token = localStorage.getItem('authToken'); // Obter o token JWT do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Método para obter tarefa por ID
  obterTarefaPorId(id: number): Observable<Tarefa> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Tarefa>(`${this.apiUrl}/${id}`, { headers });
  }

  // Novo método para criar uma tarefa
  criarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Tarefa>(this.apiUrl, tarefa, { headers });
  }

  pesquisarTarefas(descricao: string, status: string, data: string): Observable<Tarefa[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Monta a URL com os parâmetros de consulta
    let params = new HttpParams();
    if (descricao) params = params.set('descricao', descricao);
    if (status) params = params.set('status', status);
    if (data) params = params.set('data', data);

    return this.http.get<Tarefa[]>(`${this.apiUrl}/pesquisar`, { headers, params });
  }

}
