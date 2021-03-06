import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GPITBAM_API} from '../app.api';
import {Observable} from 'rxjs/Observable';
import {FuncionarioProvisao} from '../models/funcionarioprovisao.model';

@Injectable()
export class FuncionarioProvisaoService {

  constructor(private http: HttpClient) {
  }

  listProvisaoByFuncId(funcId: number): Observable<FuncionarioProvisao[]> {
    return this.http.get<FuncionarioProvisao[]>(`${GPITBAM_API}/funcionarios/provisao/${funcId}`);
  }

  createFuncionarioProvisao(funcionarioProvisao: FuncionarioProvisao): Observable<FuncionarioProvisao> {
    return this.http.post<FuncionarioProvisao>(`${GPITBAM_API}/funcionarios/provisao/add`, funcionarioProvisao);
  }

  findProvisaoByFuprId(fuprId: number): Observable<FuncionarioProvisao> {
    console.log('código' + fuprId);
    const httpParam = new HttpParams().set('codigo', fuprId.toString());
    return this.http.get<FuncionarioProvisao>(`${GPITBAM_API}/funcionarios/provisao/get`, {params: httpParam});
  }

  deleteProvisao(funcionarioProvisao: FuncionarioProvisao): Observable<FuncionarioProvisao> {
    return this.http.post<FuncionarioProvisao>(`${GPITBAM_API}/funcionarios/provisao/delete`, funcionarioProvisao);
  }

}
