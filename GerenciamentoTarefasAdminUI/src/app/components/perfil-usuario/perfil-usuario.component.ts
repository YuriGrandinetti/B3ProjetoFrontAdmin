import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // Importa o ToastrService
import { PerfilUsuarioService } from '../../services/perfil-usuario.service';
import { PerfilUsuario } from '../../models/perfilusuario.model'; // Crie um model para PerfilUsuario se necessário

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  perfisUsuarios: PerfilUsuario[] = [];
  perfilSelecionado?: PerfilUsuario;
  usuarioId: number = 1; // ID do usuário exemplo; pode ser dinâmico conforme necessidade

  selectedPerfilUsuario: PerfilUsuario | null = null;
  newPerfilUsuario: PerfilUsuario = { idPerfilUsuario: 0, descricaoPerfil: '' }; // Exemplo de modelo inicial

  constructor(
    private perfilUsuarioService: PerfilUsuarioService,
    private toastr: ToastrService // Injeta o ToastrService
  ) { }

  ngOnInit(): void {
    this.getPerfisUsuarios();
  }

  // Método para obter todos os perfis de usuários
  getPerfisUsuarios(): void {
    this.perfilUsuarioService.getPerfisUsuarios().subscribe({
      next: (data) => {
        this.perfisUsuarios = data;
      },
      error: (error) => {
        this.toastr.error('Erro ao carregar perfis de usuários', 'Erro'); // Mostra uma mensagem de erro
      }
    });
  }

  // Obtém um perfil de usuário pelo ID
  getPerfilUsuarioById(id: number): void {
    this.perfilUsuarioService.getPerfilUsuarioById(id).subscribe({
      next: (perfil) => {
        this.perfilSelecionado = perfil;
      },
      error: (error) => {
        this.toastr.error('Erro ao carregar perfil de usuário', 'Erro'); // Mostra uma mensagem de erro
      }
    });
  }

  // Método para selecionar um perfil de usuário
  selectPerfilUsuario(perfilUsuario: PerfilUsuario): void {
    this.selectedPerfilUsuario = perfilUsuario;
  }

  // Método para criar um novo perfil de usuário
  createPerfilUsuario(): void {
    this.perfilUsuarioService.createPerfilUsuario(this.newPerfilUsuario).subscribe({
      next: (data) => {
        this.perfisUsuarios.push(data);
        this.toastr.success('Perfil de usuário criado com sucesso', 'Sucesso'); // Mostra uma mensagem de sucesso
        this.newPerfilUsuario = { idPerfilUsuario: 0, descricaoPerfil: '' }; // Reseta o formulário
      },
      error: (error) => {
        this.toastr.error('Erro ao criar perfil de usuário', 'Erro'); // Mostra uma mensagem de erro
      }
    });
  }

  // Método para excluir um perfil de usuário
  deletePerfilUsuario(id: number): void {
    this.perfilUsuarioService.deletePerfilUsuario(id).subscribe({
      next: () => {
        this.perfisUsuarios = this.perfisUsuarios.filter(p => p.idPerfilUsuario !== id);
        this.toastr.success('Perfil de usuário excluído com sucesso', 'Sucesso'); // Mostra uma mensagem de sucesso
      },
      error: (error) => {
        this.toastr.error('Erro ao excluir perfil de usuário', 'Erro'); // Mostra uma mensagem de erro
      }
    });
  }

  // Adiciona um perfil a um usuário
  addPerfilToUsuario(idPerfilUsuario: number): void {
    this.perfilUsuarioService.addPerfilToUsuario(this.usuarioId, idPerfilUsuario).subscribe({
      next: () => {
        this.toastr.success(`Perfil ${idPerfilUsuario} adicionado ao usuário ${this.usuarioId}`, 'Sucesso'); // Mostra uma mensagem de sucesso
      },
      error: (error) => {
        this.toastr.error('Erro ao adicionar perfil ao usuário', 'Erro'); // Mostra uma mensagem de erro
      }
    });
  }

  // Remove um perfil de um usuário
  removePerfilFromUsuario(perfilUsuarioId: number): void {
    this.perfilUsuarioService.removePerfilFromUsuario(this.usuarioId, perfilUsuarioId).subscribe({
      next: () => {
        this.toastr.success(`Perfil ${perfilUsuarioId} removido do usuário ${this.usuarioId}`, 'Sucesso'); // Mostra uma mensagem de sucesso
      },
      error: (error) => {
        this.toastr.error('Erro ao remover perfil do usuário', 'Erro'); // Mostra uma mensagem de erro
      }
    });
  }
}
