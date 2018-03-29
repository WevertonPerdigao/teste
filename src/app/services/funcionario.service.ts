import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {GPITBAM_API} from '../app.api';
import {Funcionario} from '../models/funcionario.model';


import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import {Projeto} from '../models/projeto.model';

@Injectable()
export class FuncionarioService {

  constructor(private http: HttpClient) {
  }

  findFuncionarioById(funcId: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${GPITBAM_API}/funcionarios/${funcId}`);
  }

  listAllFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${GPITBAM_API}/funcionarios`);
  }

}


