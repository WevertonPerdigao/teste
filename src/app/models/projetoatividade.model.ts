import {Projeto} from './projeto.model';
import {Funcionario} from './funcionario.model';


export interface Projetoatividade {
  id: number;
  nome: string;
  descricao: string;
  data_inicial: Date;
  data_final: Date;
  membros?: Funcionario[];
  projeto: Projeto;
}
