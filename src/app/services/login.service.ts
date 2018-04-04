import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {GPITBAM_API} from '../app.api';
import {Funcionario} from '../models/funcionario.model';
import {Login} from '../models/login.model';

import {Observable} from 'rxjs/Observable';
import {Router, NavigationEnd} from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';//1
@Injectable()
export class LoginService {

  myStorage = window.localStorage;
  funcionario: Funcionario;
  lastUrl: string;

  private loggedIn = new BehaviorSubject<boolean>(false);//2

  constructor(private http: HttpClient,
              private router: Router) {

    this.router.events.filter(e => e instanceof NavigationEnd)
      .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
  }

  isLoggedIn(): boolean {
    return this.myStorage.getItem('currentUser') != null;
  }

  get isLoggedIn2() {
    return this.loggedIn.asObservable();
  }

  logout() {
    this.funcionario = undefined;
  }

  login(login: Login): Observable<Funcionario> {
    return this.http.post<Funcionario>(`${GPITBAM_API}/funcionarios/login`,
      {email: login.email, senha: login.senha})
      .do(funcionario => {
        this.funcionario = funcionario;
        this.myStorage.setItem('currentUser', `${funcionario.funcId}`);
      });
  }


  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login', btoa(path)]);
  }


}


