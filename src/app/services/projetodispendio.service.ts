import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {GPITBAM_API} from '../app.api';
import {ProjetoDispendio} from '../models/projetodispendio.model';


@Injectable()
export class ProjetoDispendioService {

  constructor(private http: HttpClient) {
  }

  listProjetoDispendioByProjId(projId: number) {
    return this.http.get<ProjetoDispendio[]>(`${GPITBAM_API}/ProjetoDispendios/${projId}`);
  }

  listProjetoDispendio() {
    return this.http.get<ProjetoDispendio[]>(`${GPITBAM_API}/ProjetoDispendios`);
  }
}


