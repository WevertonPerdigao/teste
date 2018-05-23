import {SituacaoProjeto} from './situacaoprojeto.model';
import {Termoaditivo} from './termoaditivo.model';
import {Funcionario} from './funcionario.model';
import {Empresa} from './empresa.model';
import {Tipoprojeto} from './tipoprojeto.model';
import {Projetoatividade} from './projetoatividade.model';
import {ProjetoDispendio} from './projetodispendio.model';
import {Projetoequipe} from './projetoequipe.model';
import {Areapesquisa} from './areapesquisa.model';
import {Enquadrabilidade} from './enquadrabilidade.model';

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
  custo?: number;
  cronograma?: number;
  projTipo: Tipoprojeto;
  atividades?: Projetoatividade[];
  dispendios?: ProjetoDispendio[] = [];
  equipe?: Funcionario[] = [];
  areas: Areapesquisa[] = [];
  anexo;
  projEnquadrabilidade: Enquadrabilidade[];

  constructor(projId?: number) {
    this.projId = projId;
  }


}

