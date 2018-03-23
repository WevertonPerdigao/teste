import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GPITBAM_API} from '../../app.api';
import {Projeto} from './projeto.model';


@Injectable()
export class ProjetoService {
  constructor(private http: HttpClient) {
  }

  listProjetosByUserId(userId: number) {
    return this.http.get(`${GPITBAM_API}/Projetos/${userId}`);
  }

  listProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${GPITBAM_API}/Projetos`);
  }

  findByProjId(projId: number): Observable<Projeto> {
    return this.http.get<Projeto>(`${GPITBAM_API}/Projetos/${projId}`);
  }


}


