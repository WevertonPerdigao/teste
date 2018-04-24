import {Component, OnInit} from '@angular/core';
import {LoginService} from './services/login.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  mostrarMenu: false;

  constructor(private loginService: LoginService) {


  }

  ngOnInit() {
    this.loginService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }

}
