import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Tipoprojeto} from '../models/tipoprojeto.model';
import {GPITBAM_API} from '../app.api';

@Injectable()
export class TipoprojetoService {
  constructor(private http: HttpClient) {
  }

  listAllTipos(): Observable<Tipoprojeto[]> {
    return this.http.get<Tipoprojeto[]>(`${GPITBAM_API}/projetos/tipos`);
  }
}

