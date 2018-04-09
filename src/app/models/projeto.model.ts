import {SituacaoProjeto} from './situacaoprojeto.model';
import {Termoaditivo} from './termoaditivo.model';
import {Funcionario} from './funcionario.model';
import {Empresa} from './empresa.model';
import {Tipoprojeto} from './tipoprojeto.model';

export class Projeto {
  projId: number;
  projNome: string;
  projDescricao: string;
  projFuncId: Funcionario;
  projEmprId?: Empresa;
  projDataInicial: Date;
  projDataFinal: Date;
  projValor: number;
  projSiprId: SituacaoProjeto;
  projTeadId?: Termoaditivo;
  custoTotal?: number;
  projTipos?: Tipoprojeto[] = [];
}

