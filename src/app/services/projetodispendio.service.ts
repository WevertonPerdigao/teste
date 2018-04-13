import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {GPITBAM_API} from '../app.api';
import {ProjetoDispendio} from '../models/projetodispendio.model';
import {Observable} from 'rxjs/Observable';
import {Projetoatividade} from '../models/projetoatividade.model';


@Injectable()
export class ProjetoDispendioService {

  constructor(private http: HttpClient) {
  }

  listProjetoDispendioByProjId(projId: number) {
    return this.http.get<ProjetoDispendio[]>(`${GPITBAM_API}/projetos/dispendios/${projId}`);
  }

  createProjetoDispendio(projetoDispendio: ProjetoDispendio): Observable<ProjetoDispendio> {
    return this.http.post<ProjetoDispendio>(`${GPITBAM_API}/projetos/adddispendio`, projetoDispendio);
  }
}


