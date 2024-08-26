// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroUsuarioAdminComponent } from './components/cadastro-usuario-admin/cadastro-usuario-admin.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { LoginComponent } from './components/login/login.component';
//import { AuthGuard } from './guards/auth.guard'; // Criar um guard de autenticação, se necessário

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioAdminComponent},
  { path: 'perfil-usuario', component: PerfilUsuarioComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }





