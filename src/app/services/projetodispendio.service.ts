import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {GPITBAM_API} from '../app.api';
import {ProjetoDispendio} from '../models/projetodispendio.model';
import {Observable} from 'rxjs/Observable';
import {Projetoatividade} from '../models/projetoatividade.model';


@Injectable()
export class ProjetoDispendioService {

  constructor(private http: HttpClient,
  ) {
  }


  findById(prdiId: number): Observable<ProjetoDispendio> {

    const params = new HttpParams().set('id', prdiId.toString());

    return this.http.get<ProjetoDispendio>(`${GPITBAM_API}/projetos/getdispendio`, {params: params});
  }

  listProjetoDispendioByProjId(projId: number) {
    return this.http.get<ProjetoDispendio[]>(`${GPITBAM_API}/projetos/dispendios/${projId}`);
  }


  listDispendioByParam(projId: number, status?: string, valorInicial?: number, valorFinal?: number, tipoId?: number): Observable<ProjetoDispendio[]> {
    let params = new HttpParams();

    status ? params = params.set('status', status.toString()) : '';

    valorInicial ? params = params.append('valorInicial', valorInicial.toString()) : '';
    valorFinal ? params = params.append('valorFinal', valorFinal.toString()) : '';
    tipoId ? params = params.set('tipo', tipoId.toString()) : '';

    return this.http.get<ProjetoDispendio[]>(`${GPITBAM_API}/projetos/dispendios/${projId}`, {params: params});
  }

  listDispendioByProjIdAndStatus(projId: number, status: string) {

    let params = new HttpParams()
      .append('status', status.toString());

    console.log('params listDispendioByProjIdAndStatus : ' + params);

    return this.http.get<ProjetoDispendio[]>(`${GPITBAM_API}/projetos/dispendios/${projId}`, {params: params});
  }


  createProjetoDispendio(projetoDispendio: ProjetoDispendio): Observable<ProjetoDispendio> {
    return this.http.post<ProjetoDispendio>(`${GPITBAM_API}/projetos/adddispendio`, projetoDispendio);
  }

  alterStatusDispendio(projetoDispendio: ProjetoDispendio) {
    return this.http.post<ProjetoDispendio>(`${GPITBAM_API}/projetos/addstatusdispendio`, projetoDispendio);
  }
}


