import {Cargo} from './cargo.model';
import {Funcao} from './funcao.model';
import {Setor} from './setor.model';
import {StatusFuncionario} from './statusfuncionario.model';
import {Perfil} from './perfil.model';
import {Unidade} from './Unidade.model';

export interface Funcionario {
  funcId: number;
  funcMatricula: number;
  funcNome: string;
  funcCpf: string;
  funcEmail: string;
  funcSenha: string;
  funcDescricao: string;
  funcDataAdmissão: Date;
  funcAprovador: boolean;
  funcSalario: number;
  funcHorasMes: number;
  funcCargId: Cargo;
  funcFuncId: Funcao;
  funcSetoId: Setor;
  funcPerfId: Perfil;
  funcStfuId: StatusFuncionario;
  funcUnidId: Unidade;
}
