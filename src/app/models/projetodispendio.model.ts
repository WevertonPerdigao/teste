export interface ProjetoDispendio {
  prdiId: number;
  prdiTidiId: number;
  prdiProjId: number;
  prdiTituloFatura: string;
  prdiDescricao: string;
  prdiJustificativa: string;
  prdiCnpj: string;
  prdiDataNotaFiscal: Date;
  prdiNotaFiscal: string;
  prdiDataPagamento: Date;
  prdiValor: number;
}
