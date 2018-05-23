import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GPITBAM_API} from '../app.api';
import {Cargo} from '../models/cargo.model';
import {Enquadrabilidade} from '../models/enquadrabilidade.model';

@Injectable()
export class EnquadrabilidadeService {
  constructor(private http: HttpClient) {
  }

  listAllEnquadrabilidade(): Observable<Enquadrabilidade[]> {
    return this.http.get<Enquadrabilidade[]>(`${GPITBAM_API}/projetos/getenquadrabilidade`);
  }
}

