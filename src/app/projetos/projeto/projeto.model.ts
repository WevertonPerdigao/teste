import {Situacao} from '../../situacao/situacao.model';

export interface Projeto {
  projId: number;
  projNome: string;
  projDescricao: string;
  projUsuaId: number;
  projEmprId: number;
  projPrevDataInicial: Date;
  projPrevDataFinal: Date;
  projDataInicial: Date;
  projDataFinal: Date;
  projVerbaInicial: number;
  proj_situ_id: number;
}

