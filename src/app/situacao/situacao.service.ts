import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SituacaoProjeto} from './situacao.model';

import {GPITBAM_API} from '../app.api';


@Injectable()
export class SituacaoService {
  constructor(private http: HttpClient) {
  }

  getSituacaoById(situId: number): Observable<SituacaoProjeto> {
    return this.http.get<SituacaoProjeto>(`${GPITBAM_API}/Situacaos/${situId}`);
  }

  listSituacoes() {
    return this.http.get(`${GPITBAM_API}/Situacaos`);
  }


}

