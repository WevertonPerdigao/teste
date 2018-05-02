import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GPITBAM_API} from '../app.api';
import {Projeto} from '../models/projeto.model';
import 'rxjs/add/operator/map';
import {Funcionario} from '../models/funcionario.model';

@Injectable()
export class ProjetoService {
  constructor(private http: HttpClient) {
  }

  listProjetosByUserId(userId: number): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${GPITBAM_API}/projetos`);
    // return this.http.get<Projeto[]>(`${GPITBAM_API}/projetos/funcionario/${userId}`);
  }

  listProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${GPITBAM_API}/projetos`);
  }

  findByProjId(projId: number): Observable<Projeto> {
    return this.http.get<Projeto>(`${GPITBAM_API}/projetos/${projId}`);
  }

  createProjeto(projeto: Projeto): Observable<Projeto> {
    return this.http.post<Projeto>(`${GPITBAM_API}/projetos/salvar`, projeto);
  }

  deleteProjeto(projId: number): Observable<Projeto> {
    const httpParam = new HttpParams().set('codigo', projId.toString());
    return this.http.delete<Projeto>(`${GPITBAM_API}/projetos/projeto/delete`, {params: httpParam});
  }



  listFuncionariosByProjeto(projId?: number): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${GPITBAM_API}/projetos/getmembros/${projId}`);
  }
}


