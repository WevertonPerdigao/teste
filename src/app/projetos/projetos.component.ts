import {Component, OnInit} from '@angular/core';
import {ProjetoService} from '../services/projeto.service';
import {Projeto} from '../models/projeto.model';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})

export class ProjetosComponent implements OnInit {

  public projetos: Projeto[];

  constructor(private projetoService: ProjetoService,
              private loginService: LoginService) {
  }

  ngOnInit() {
    const userid = +this.loginService.myStorage.getItem('currentUser');
    console.log(userid);
    this.getListProjetosByUsuario(userid);
  }


  getListProjetosByUsuario(userid?: number) {
    this.projetoService.listProjetosByUserId(userid)
      .subscribe(projetos => this.projetos = projetos);

  }


}
