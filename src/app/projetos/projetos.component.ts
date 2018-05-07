import {Component, OnInit} from '@angular/core';
import {ProjetoService} from '../services/projeto.service';
import {Projeto} from '../models/projeto.model';
import {LoginService} from '../services/login.service';
import {Utils} from '../utils/utils';
import {Router} from '@angular/router';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})

export class ProjetosComponent implements OnInit {

  public projetos: Projeto[];
  skipLocationChange?: boolean;

  constructor(private projetoService: ProjetoService,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
    const userid = +this.loginService.myStorage.getItem('currentUser');
    this.getListProjetosByUsuario(userid);
  }


  getListProjetosByUsuario(userid?: number) {

    this.projetoService.listProjetosByUserId(userid)
      .subscribe(projetos => {
        this.projetos = projetos;
      });
  }

  goToProjectDetail(projeto: Projeto) {
    this.router.navigate(['/projeto-detail'],
      {queryParams: {id: projeto.projId}, skipLocationChange: false});
  }
}
