import {Situacao} from '../../situacao/situacao.model';

export interface Projeto {
  projId: number;
  projNome: string;
  projDescricao: string;
  projUsuaId: number;
  projEmprId: number;
  projPrevDataInicial: string;
  projPrevDataFinal: string;
  projDataInicial: string;
  projDataFinal: string;
  projVerbaInicial: number;
  proj_situ_id: Situacao;
}

