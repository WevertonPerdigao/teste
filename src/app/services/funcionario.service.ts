import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GPITBAM_API} from '../app.api';
import {Funcionario} from '../models/funcionario.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class FuncionarioService {

  constructor(private http: HttpClient) {
  }

  findFuncionarioById(funcId: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${GPITBAM_API}/funcionarios/${funcId}`);
  }

  listFuncionariosByName(nome?: string): Observable<Funcionario[]> {
    let params: HttpParams = undefined;
    if (nome) {
      params = new HttpParams().append('nome', nome);
    }
    return this.http.get<Funcionario[]>(`${GPITBAM_API}/funcionarios`, {params: params});
  }

  create(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(`${GPITBAM_API}/funcionarios/salvar`, funcionario);
  }

}
