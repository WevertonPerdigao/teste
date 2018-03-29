import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {GPITBAM_API} from '../app.api';
import {Funcionario} from '../models/funcionario.model';
import {Login} from '../models/login.model';

import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginService {

  funcionario: Funcionario;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private router: Router) {
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }


  logout2() {
    this.funcionario = undefined;
  }

  login2(login: Login): Observable<Funcionario> {
    return this.http.post<Funcionario>(`${GPITBAM_API}/funcionarios/login`,
      {matricula: login.matricula, senha: login.senha})
      .do(funcionario => this.funcionario = funcionario);
  }

  login(user: Login) {
    if (user.matricula !== 0 && user.senha !== '') { // {3}
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }


}


