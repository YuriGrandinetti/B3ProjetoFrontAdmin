import { Routes } from '@angular/router';
import { CadastroUsuarioAdminComponent } from './components/cadastro-usuario-admin/cadastro-usuario-admin.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'cadastro-usuario', loadComponent: () => import('./components/cadastro-usuario-admin/cadastro-usuario-admin.component').then(m => m.CadastroUsuarioAdminComponent) },
  { path: 'perfil-usuario', loadComponent: () => import('./components/perfil-usuario/perfil-usuario.component').then(m => m.PerfilUsuarioComponent) },
  { path: 'dashboard', loadComponent: () => import('./components/navbar/navbar.component').then(m => m.NavbarComponent)  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' }
];








