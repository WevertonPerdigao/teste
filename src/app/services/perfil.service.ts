import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GPITBAM_API} from '../app.api';
import {Perfil} from '../models/perfil.model';

@Injectable()
export class PerfilService {
  constructor(private http: HttpClient) {
  }

  listAllPerfil(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(`${GPITBAM_API}/funcionarios/perfil`);
  }
}

