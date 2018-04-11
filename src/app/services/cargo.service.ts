import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GPITBAM_API} from '../app.api';
import {Cargo} from '../models/cargo.model';

@Injectable()
export class CargoService {
  constructor(private http: HttpClient) {
  }

  listAllCargo(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${GPITBAM_API}/funcionarios/cargo`);
  }
}

