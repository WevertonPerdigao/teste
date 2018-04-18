import {Funcionario} from './funcionario.model';

export class Projetodispendiostatus {
  prdsPrdiId: number;
  prdsPrdiStatus: string;
  prds_func_id: Funcionario;
  prdsData: Date;

  constructor(prdsPrdiStatus?: string, prds_func_id?: Funcionario, prdsData?: Date) {
    this.prdsPrdiStatus = prdsPrdiStatus;
    this.prds_func_id = prds_func_id;
    this.prdsData = prdsData;
  }
}
