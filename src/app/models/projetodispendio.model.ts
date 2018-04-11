import {Tipodispendio} from './tipodispendio.model';

export interface ProjetoDispendio {
  prdiId: number;
  prdiTidiId: Tipodispendio;
  prdiDescricao: string;
  prdiValor: number;
  prdiTituloFatura: string;
}
