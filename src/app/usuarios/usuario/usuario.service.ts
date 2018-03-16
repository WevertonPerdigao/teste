import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {GPITBAM_API} from '../../app.api';


@Injectable()
export class UsuarioService {

  idPadrao = 1;

  constructor(private http: HttpClient) {
  }

  listUsuarios() {
    return this.http.get(`${GPITBAM_API}/Usuarios`);
  }

  usuarioById(id: number) {
    return this.http.get(`${GPITBAM_API}/Usuarios/${id}`);
  }

  getPrimeiroUsuario() {
    return this.http.get(`${GPITBAM_API}/Usuarios/${this.idPadrao}`);
  }

}


