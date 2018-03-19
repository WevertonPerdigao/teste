import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


import {GPITBAM_API} from '../../app.api';


@Injectable()
export class ProjetoService {
  constructor(private http: HttpClient) {
  }

  listProjetosByUserId(userId: number) {
    return this.http.get(`${GPITBAM_API}/Projetos/${userId}`);
  }

  listProjetos() {
    return this.http.get(`${GPITBAM_API}/Projetos`);
  }



}


