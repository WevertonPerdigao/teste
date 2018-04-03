import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {GPITBAM_API} from '../app.api';
import {Funcionario} from '../models/funcionario.model';
import {Login} from '../models/login.model';

import {Observable} from 'rxjs/Observable';
import {Router, NavigationEnd} from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginService {

  funcionario: Funcionario;
  lastUrl: string;

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private router: Router) {

    this.router.events.filter(e => e instanceof NavigationEnd)
      .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
  }

  isLoggedIn(): boolean {
    return this.funcionario !== undefined;
  }

  logout() {
    this.funcionario = undefined;
  }

  login(login: Login): Observable<Funcionario> {
    return this.http.post<Funcionario>(`${GPITBAM_API}/funcionarios/login`,
      {email: login.email, senha: login.senha})
      .do(funcionario => this.funcionario = funcionario);
  }


  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login', btoa(path)]);
  }


}


