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
      .subscribe(projetos => this.projetos = projetos);
  }


  // getCronogramaByProjeto(dtinicio: Date, dtfim: Date): number {
  //   console.log('contador 2 -> ' + this.cout2++);
  //   if (dtinicio && dtfim) {
  //     return this.calcPercentCronograma(dtinicio, dtfim);
  //   }
  // }

  // calcPercentCronograma(dtinicio: Date, dtfim: Date): number {
  //
  //   const qtdeDiasTotalProj = Utils.getQtdDayByDtinicialAndDtFinal(dtinicio, dtfim);
  //
  //   const qtdeDayAtualProj = Utils.getQtdDayByDtinicialAndDtFinal(dtinicio, new Date());
  //
  //   if (qtdeDayAtualProj > qtdeDiasTotalProj) {
  //     return 100;
  //   } else {
  //     return Utils.getPercent(qtdeDayAtualProj, qtdeDiasTotalProj);
  //   }
  // }


  goToProjectDetail(projeto: Projeto) {
    this.router.navigate(['/projeto-detail/', projeto.projId]);
  }


}
