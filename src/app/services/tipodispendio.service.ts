import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  listTipoDispendioByProjetoAndStatus(projId: number, status: string): Observable<Tipodispendio[]> {
    const httpParams = new HttpParams()
      .set('projetoId', projId.toString())
      .set('status', status);

    return this.http.get<Tipodispendio[]>(`${GPITBAM_API}/projetos/tipodispendios`, {params: httpParams});
  }
}



