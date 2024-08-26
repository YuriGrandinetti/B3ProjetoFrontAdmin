export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  dataVencimento: Date;
  status: string;
  // Outras propriedades que sua API retornar
}
