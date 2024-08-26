import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // Importa o ToastrService
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FormsModule } from '@angular/forms'; // Import necessário para usar ngModel

@Component({
  selector: 'app-cadastro-usuario-admin',
  standalone: true,
  imports: [FormsModule,CommonModule], // Certifique-se de importar FormsModule aqui
  templateUrl: './cadastro-usuario-admin.component.html',
  styleUrl: './cadastro-usuario-admin.component.css'
})
export class CadastroUsuarioAdminComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioSelecionado?: Usuario ;
  novoUsuario: Usuario = {  id: 0, nome: 'um', email: 'dois', senha: 'tres' }; // Ajuste de acordo com o seu model

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService // Injeta o ToastrService
  ) { }

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  // Método para carregar todos os usuários
  carregarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: () => {
        this.toastr.error('Erro ao carregar usuários', 'Erro'); // Mostra uma mensagem de erro
      }
    });
  }

  // Método para selecionar um usuário
  selecionarUsuario(id: number): void {
    this.usuarioService.getUsuarioById(id).subscribe({
      next: (usuario) => {
        this.usuarioSelecionado = usuario;
      },
      error: () => {
        this.toastr.error('Erro ao carregar o usuário', 'Erro'); // Mostra uma mensagem de erro
      }
    });
  }

  // Método para criar um novo usuário
  criarUsuario(): void {
    this.usuarioService.createUsuario(this.novoUsuario).subscribe({
      next: (usuario) => {
        this.usuarios.push(usuario);
        this.toastr.success('Usuário criado com sucesso', 'Sucesso'); // Mostra uma mensagem de sucesso
        this.novoUsuario = { id: 0, nome: '', email: '', senha: '' }; // Limpa o formulário
      },
      error: () => {
        this.toastr.error('Erro ao criar usuário', 'Erro'); // Mostra uma mensagem de erro
      }
    });
  }

  // Método para atualizar um usuário existente
  atualizarUsuario(id: number): void {
    if (this.usuarioSelecionado) {
      this.usuarioService.updateUsuario(id, this.usuarioSelecionado).subscribe({
        next: () => {
          this.carregarUsuarios();
          this.toastr.success('Usuário atualizado com sucesso', 'Sucesso'); // Mostra uma mensagem de sucesso
        },
        error: () => {
          this.toastr.error('Erro ao atualizar o usuário', 'Erro'); // Mostra uma mensagem de erro
        }
      });
    }
  }

  // Método para excluir um usuário
  excluirUsuario(id: number): void {
    this.usuarioService.deleteUsuario(id).subscribe({
      next: () => {
        this.carregarUsuarios();
        this.toastr.success('Usuário excluído com sucesso', 'Sucesso'); // Mostra uma mensagem de sucesso
      },
      error: () => {
        this.toastr.error('Erro ao excluir o usuário', 'Erro'); // Mostra uma mensagem de erro
      }
    });
  }
}
