import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SituacaoProjeto} from '../models/situacaoprojeto.model';

import {GPITBAM_API} from '../app.api';
import {Tipodispendio} from '../models/tipodispendio.model';

@Injectable()
export class TipodispendioService {

  constructor(private http: HttpClient) {
  }

  listAll(): Observable<Tipodispendio[]> {
    return this.http.get<Tipodispendio[]>(`${GPITBAM_API}/projetos/tipodispendios`);
  }

  listTipoDispendioByProjeto(projId: number): Observable<Tipodispendio[]> {
    return this.http.get<Tipodispendio[]>(`${GPITBAM_API}/projetos/tipodispendios?projetoId=${projId}`);
  }
}



