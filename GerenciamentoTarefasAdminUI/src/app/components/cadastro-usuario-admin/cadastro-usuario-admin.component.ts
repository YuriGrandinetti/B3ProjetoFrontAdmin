import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // Importa o ToastrService
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FormsModule } from '@angular/forms'; // Import necessário para usar ngModel

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-cadastro-usuario-admin',
  standalone: true,
  imports: [FormsModule,CommonModule], // Certifique-se de importar FormsModule aqui
  templateUrl: './cadastro-usuario-admin.component.html',
  styleUrl: './cadastro-usuario-admin.component.css'
})
export class CadastroUsuarioAdminComponent implements OnInit {
  showModal: boolean = false;
  showModalEditar: boolean = false;
  usuarios: Usuario[] = [];
  usuarioSelecionado?: Usuario ;
  novoUsuario: Usuario = {  id: 0, nome: 'um', email: 'dois', senha: 'tres' }; // Ajuste de acordo com o seu model

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService ,// Injeta o ToastrService
    private usuaruiService: UsuarioService,
    @Inject(PLATFORM_ID) private platformId: any
 //   private modalService: NgbModal

  ) { }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.usuarioSelecionado = undefined; // Opcional: Limpa o usuário selecionado
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.carregarUsuarios();
    }

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

  // Método para abrir o modal de edição e selecionar o usuário
  abrirModalEditar(usuario: Usuario): void {
    if (isPlatformBrowser(this.platformId)) {
      this.showModalEditar = true; // Define a variável para exibir o modal
      this.usuaruiService.getUsuarioById(usuario.id!).subscribe(
        (usuario: Usuario) => {

          this.usuarioSelecionado = usuario;

          const modalElement = document.getElementById('modalEditarUsuario');
          if (modalElement) {
            const modal = new (window as any).bootstrap.Modal(modalElement);
            modal.show();
          }
        },
        (error) => {
          console.error('Erro ao obter usuario ', error);
        }
      );
    }
//    this.usuarioSelecionado = { ...usuario }; // Copia o objeto selecionado para edição
//    this.showModalEditar = true; // Define a variável para exibir o modal

   //  this.usuarioSelecionado = usuario;
   }
  // abrirModalCadastrar(): void {
  //   this.modalService.open(this.modalCadastrarUsuario, { centered: true });
  // }

  // fecharModalCadastrar(): void {
  //   this.modalService.dismissAll();
  // }

  // abrirModalEditar(usuario: any): void {
  //   this.usuarioSelecionado = usuario;
  //   this.modalService.open(this.modalEditarUsuario, { centered: true });
  // }

  // fecharModalEditar(): void {
  //   this.modalService.dismissAll();
  // }

  // Método para criar um novo usuário
  criarUsuario(): void {
    this.usuarioService.createUsuario(this.novoUsuario).subscribe({
      next: (usuario) => {
        this.usuarios.push(usuario);
        this.toastr.success('Usuário criado com sucesso', 'Sucesso'); // Mostra uma mensagem de sucesso
        this.novoUsuario = { id: 0, nome: '', email: '', senha: '' }; // Limpa o formulário
        this.closeModal();
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
          // Fecha o modal
          const modalElement = document.getElementById('modalEditarUsuario');
          if (modalElement) {
            const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
            modal.hide();
          }
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
