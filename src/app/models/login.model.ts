export class Login {
  matricula: number;
  senha: string;

  constructor(matricula: number, senha: string) {
    this.senha = senha;
    this.matricula = matricula;
  }

}
