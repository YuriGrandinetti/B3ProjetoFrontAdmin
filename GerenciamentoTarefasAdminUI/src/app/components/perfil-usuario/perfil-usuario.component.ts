import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // Importa o ToastrService
import { PerfilUsuarioService } from '../../services/perfil-usuario.service';
import { PerfilUsuario } from '../../models/perfilusuario.model'; // Crie um model para PerfilUsuario se necessário
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule], // Certifique-se de importar FormsModule aqui
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  perfisUsuarios: PerfilUsuario[] = [];
  perfilSelecionado?: PerfilUsuario;
  usuarioId: number = 1; // ID do usuário exemplo; pode ser dinâmico conforme necessidade
  showModalAdicionar: boolean = false; // Controle de estado do modal de adicionar
  showModalEditar: boolean = false; // Controle de estado do modal de edição
  novoPerfilUsuario: PerfilUsuario = { idPerfilUsuario: 0, descricaoPerfil: '' }; // Exemplo de modelo inicial
  perfilUsuarioSelecionado?: PerfilUsuario; // Variável para o perfil selecionado para edição

  constructor(
    private perfilUsuarioService: PerfilUsuarioService,
    private toastr: ToastrService // Injeta o ToastrService
  ) { }

  ngOnInit(): void {
    this.carregarPerfisUsuarios();
  }

  get descricaoPerfil(): string {
    return this.perfilUsuarioSelecionado?.descricaoPerfil || '';
  }

  // Setter para o campo de descrição do perfil
  set descricaoPerfil(value: string) {
    if (this.perfilUsuarioSelecionado) {
      this.perfilUsuarioSelecionado.descricaoPerfil = value;
    }
  }

  // Método para carregar todos os perfis de usuários
  carregarPerfisUsuarios(): void {
    this.perfilUsuarioService.getPerfisUsuarios().subscribe({
      next: (data) => {
        this.perfisUsuarios = data;
      },
      error: () => {
        this.toastr.error('Erro ao carregar perfis de usuários', 'Erro'); // Mostra uma mensagem de erro
      }
    });
  }

  // Método para abrir o modal de adicionar novo perfil
  abrirModalAdicionar(): void {
    this.showModalAdicionar = true;
  }

  // Método para fechar o modal de adicionar
  fecharModalAdicionar(): void {
    this.showModalAdicionar = false;
    this.novoPerfilUsuario = { idPerfilUsuario: 0, descricaoPerfil: '' }; // Reseta o formulário
  }

  // Método para abrir o modal de edição e selecionar o perfil
  abrirModalEditar(perfil: PerfilUsuario): void {
    this.perfilUsuarioSelecionado = { ...perfil }; // Copia o objeto para edição
    this.showModalEditar = true; // Define a variável para exibir o modal
  }

  // Método para fechar o modal de edição
  fecharModalEditar(): void {
    this.showModalEditar = false;
    this.perfilUsuarioSelecionado = undefined; // Limpa o perfil selecionado
  }

  // Método para criar um novo perfil de usuário
  criarPerfilUsuario(): void {
    this.perfilUsuarioService.createPerfilUsuario(this.novoPerfilUsuario).subscribe({
      next: (data) => {
        this.perfisUsuarios.push(data);
        this.toastr.success('Perfil de usuário criado com sucesso', 'Sucesso'); // Mostra uma mensagem de sucesso
        this.fecharModalAdicionar(); // Fecha o modal após a criação
      },
      error: () => {
        this.toastr.error('Erro ao criar perfil de usuário', 'Erro'); // Mostra uma mensagem de erro
      }
    });
  }

  // Método para atualizar um perfil de usuário existente
  atualizarPerfilUsuario(id: number): void {
    if (this.perfilUsuarioSelecionado) {
      this.perfilUsuarioService.updatePerfilUsuario(id,this.perfilUsuarioSelecionado).subscribe({
        next: () => {
          this.carregarPerfisUsuarios();
          this.toastr.success('Perfil de usuário atualizado com sucesso', 'Sucesso'); // Mostra uma mensagem de sucesso
          this.fecharModalEditar(); // Fecha o modal após a atualização
        },
        error: () => {
          this.toastr.error('Erro ao atualizar perfil de usuário', 'Erro'); // Mostra uma mensagem de erro
        }
      });
    }
  }

  // Método para excluir um perfil de usuário
  excluirPerfilUsuario(id: number): void {
    this.perfilUsuarioService.deletePerfilUsuario(id).subscribe({
      next: () => {
        this.perfisUsuarios = this.perfisUsuarios.filter(p => p.idPerfilUsuario !== id);
        this.toastr.success('Perfil de usuário excluído com sucesso', 'Sucesso'); // Mostra uma mensagem de sucesso
      },
      error: () => {
        this.toastr.error('Erro ao excluir perfil de usuário', 'Erro'); // Mostra uma mensagem de erro
      }
    });
  }

  // Método para adicionar um perfil a um usuário
  adicionarPerfilAoUsuario(idPerfilUsuario: number): void {
    this.perfilUsuarioService.addPerfilToUsuario(this.usuarioId, idPerfilUsuario).subscribe({
      next: () => {
        this.toastr.success(`Perfil ${idPerfilUsuario} adicionado ao usuário ${this.usuarioId}`, 'Sucesso'); // Mostra uma mensagem de sucesso
      },
      error: () => {
        this.toastr.error('Erro ao adicionar perfil ao usuário', 'Erro'); // Mostra uma mensagem de erro
      }
    });
  }

  // Método para remover um perfil de um usuário
  removerPerfilDoUsuario(perfilUsuarioId: number): void {
    this.perfilUsuarioService.removePerfilFromUsuario(this.usuarioId, perfilUsuarioId).subscribe({
      next: () => {
        this.toastr.success(`Perfil ${perfilUsuarioId} removido do usuário ${this.usuarioId}`, 'Sucesso'); // Mostra uma mensagem de sucesso
      },
      error: () => {
        this.toastr.error('Erro ao remover perfil do usuário', 'Erro'); // Mostra uma mensagem de erro
      }
    });
  }
}
