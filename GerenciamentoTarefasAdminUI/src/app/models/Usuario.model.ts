import { PerfilUsuario } from "./perfilusuario.model";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha?: string;  // Opcional, já que pode não ser necessário expor a senha no frontend
  perfis?: PerfilUsuario[];  // Relacionamento com Perfis de Usuário, caso exista
}
