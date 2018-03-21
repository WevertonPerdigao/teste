import {Situacao} from '../../situacao/situacao.model';

export interface Projeto {
  projId: number;
  projNome: string;
  projDescricao: string;
  projUsuaId: number;
  projEmprId: number;
  projDataInicial: Date;
  projDataFinal: Date;
  projValor: number;
  proj_situ_id: number;
}

