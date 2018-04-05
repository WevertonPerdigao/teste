export class Empresa {
  emprId: number;
  emprRazaoSocial: string;
  emprNomeFantasia: string;
  emprCnpj: string;
  emprDataAbertura: Date;
  emprNaturezaJuridica: string;
  emprAtividade: string;
  emprEndereco: string;
  emprTelefone: string;
  emprEmail: string;
  emprStatus: boolean;
  emprCidaId: number;

  constructor(id: number) {
    this.emprId = id;
  }

}
