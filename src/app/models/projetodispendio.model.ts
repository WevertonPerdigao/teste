import {Tipodispendio} from './tipodispendio.model';
import {Projeto} from './projeto.model';
import {Projetodispendioanexo} from './projetodispendioanexo';
import {Projetodispendiostatus} from './projetodispendiostatus.model';
import {Funcionario} from './funcionario.model';

export interface ProjetoDispendio {
  prdiId: number;
  prdiTidiId: Tipodispendio;
  prdiDescricao: string;
  prdiValor: number;
  prdiTituloFatura: string;
  prdiJustificativa: string;
  prdiNotaFiscal: string;
  prdiDataNotaFiscal: Date;
  prdiDataPagamento: Date;
  prdiProjId: Projeto;
  prdiAnexoId: Projetodispendioanexo;
  prdsPrdiId: Projetodispendiostatus;
  prdiFuncId?: Funcionario;
  total?: number;
}
