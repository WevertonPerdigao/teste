import {Funcionario} from './funcionario.model';

export class FuncionarioProvisao {
  fuprId: number;
  fuprFuncId?: Funcionario;
  fuprHoraHomem?: number;
  fuprHoraTotal: number;
  fuprReferencia: number;
  fuprTipoFuncionario: string;
  fuprTotalGeral?: number;

  constructor() {
  }


}
