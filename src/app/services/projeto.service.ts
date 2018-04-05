import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GPITBAM_API} from '../app.api';
import {Projeto} from '../models/projeto.model';
import 'rxjs/add/operator/map';
@Injectable()
export class ProjetoService {
  constructor(private http: HttpClient) {
  }

  listProjetosByUserId(userId: number): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${GPITBAM_API}/projetos/funcionario/${userId}`);
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

}


