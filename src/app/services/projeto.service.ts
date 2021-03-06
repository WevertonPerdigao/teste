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

  listProjetosByUserIdAndNome(nome?: string): Observable<Projeto[]> {
    let params: HttpParams = undefined;
    if (nome && nome.length > 0) {
      params = new HttpParams().append('likenome', nome);
    }

    return this.http.get<Projeto[]>(`${GPITBAM_API}/projetos/findby`, {params: params});
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

  updateSituacaoProjeto(projId: number, situacao: string): Observable<Projeto> {
   const httpParam = new HttpParams().set('codigo', projId.toString()).set('situacao', situacao);
    return this.http.delete<Projeto>(`${GPITBAM_API}/projetos/alterarsituacao`, {params: httpParam});
  }


  listFuncionariosByProjeto(projId?: number): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${GPITBAM_API}/projetos/getmembros/${projId}`);
  }
}


