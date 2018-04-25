import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {GPITBAM_API} from '../app.api';
import {Projetoatividade} from '../models/projetoatividade.model';
import {Observable} from 'rxjs/Observable';
import {Funcionario} from '../models/funcionario.model';


@Injectable()
export class ProjetoatividadeService {

  constructor(private http: HttpClient) {
  }

  listAtividadeByProjId(projId: number): Observable<Projetoatividade[]> {
    return this.http.get<Projetoatividade[]>(`${GPITBAM_API}/projetos/atividades/${projId}`);
  }

  create(projetoAtividade: Projetoatividade): Observable<Projetoatividade> {

    console.log('obj=> ' + JSON.stringify(projetoAtividade));
    return this.http.post<Projetoatividade>(`${GPITBAM_API}/projetos/addatividade`, projetoAtividade);
  }

}


