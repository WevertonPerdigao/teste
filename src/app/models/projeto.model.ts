import {SituacaoProjeto} from './situacaoprojeto.model';
import {Termoaditivo} from './termoaditivo.model';
import {Funcionario} from './funcionario.model';

export class Projeto {
  projId: number;
  projNome: string;
  projDescricao: string;
  projFuncId: Funcionario;
  // projEmprId: Empresa;
  projDataInicial: Date;
  projDataFinal: Date;
  projValor: number;
  projSiprId: SituacaoProjeto;
  projTeadId: Termoaditivo;
  custoTotal?: number;
}

