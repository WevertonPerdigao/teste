import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Vwprojetovalor} from './vwprojetovalor.model';

import {GPITBAM_API} from '../app.api';


@Injectable()
export class VwprojetovalorService {
  constructor(private http: HttpClient) {
  }

  getProjetoValorByProjId(projId: number): Observable<Vwprojetovalor> {
    return this.http.get<Vwprojetovalor>(`${GPITBAM_API}/VwProjetoValors/${projId}`);
  }
}

