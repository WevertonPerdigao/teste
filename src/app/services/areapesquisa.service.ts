import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GPITBAM_API} from '../app.api';
import {Cargo} from '../models/cargo.model';
import {Funcionario} from '../models/funcionario.model';
import {Areapesquisa} from '../models/areapesquisa.model';

@Injectable()
export class AreapesquisaService {
  constructor(private http: HttpClient) {
  }

  listAllAreapesquisa(): Observable<Areapesquisa[]> {
    return this.http.get<Areapesquisa[]>(`${GPITBAM_API}/projetos/areaspesquisa`);
  }
}

