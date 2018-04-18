import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {ProjetoService} from '../services/projeto.service';
import {Projeto} from '../models/projeto.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Utils} from '../utils/utils';
import {ProjetoDispendioService} from '../services/projetodispendio.service';
import 'rxjs/add/observable/forkJoin';
import {MatTabChangeEvent} from '@angular/material';
import {TipodispendioService} from '../services/tipodispendio.service';
import {Tipodispendio} from '../models/tipodispendio.model';
import {Observable} from 'rxjs/Observable';
import {ProjetoDispendio} from '../models/projetodispendio.model';
import {LoginService} from '../services/login.service';
import {Funcionario} from '../models/funcionario.model';
import {Constants} from '../utils/constants';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-projeto-detail',
  templateUrl: './projeto-detail.component.html',
  styleUrls: ['./projeto-detail.component.scss']
})
export class ProjetoDetailComponent implements OnInit, OnDestroy {

  public projeto: Projeto = new Projeto();
  qtdDiasProjeto = 0;
  qtdDiasUtilizados = 0;
  dispendiosPendentes: Observable<ProjetoDispendio[]>;
  tiposDispendiosValor: Observable<Tipodispendio[]>;
  projId;
  paramsSubscription: Subscription;

  constructor(private projetoService: ProjetoService,
              private projetoDispendioService: ProjetoDispendioService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private tipoDispendioService: TipodispendioService,
              public loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.projId = params['id'];
    });

    this.projetoService.findByProjId(this.projId)
      .subscribe(projeto => {
        this.projeto = projeto;
        this.setPropertyCronograma();
      });

    this.tiposDispendiosValor = this.tipoDispendioService.listTipoDispendioByProjetoAndStatus(this.projId, Constants.APROVADO);

    this.getDispendiosPendentes();
  }

  /*lista dispêndios pendentes de aoordo com  o perfil do funcionário logado
  /
   */
  getDispendiosPendentes() {
    if (this.loginService.getFuncionario().funcAprovador) {

      if (this.loginService.getFuncionario().funcPerfId.perfAcessoCompleto) {
        this.dispendiosPendentes = this.projetoDispendioService
          .listDispendioByProjIdAndStatus(
            this.projId,
            Constants.PENDENTE);
      } else {
        this.dispendiosPendentes = this.projetoDispendioService
          .listDispendioByParam(
            this.projId,
            Constants.PENDENTE,
            this.loginService.getFuncionario().funcPerfId.perfValorInicial,
            this.loginService.getFuncionario().funcPerfId.perfValorFinal
          );
      }
    }
  }

  onLinkClick(event: MatTabChangeEvent) {
    switch (event.index) {
      case 2:
        console.log('case 3');
      // this.router.navigate(['../atividades'], {relativeTo: this.activatedRoute}); não funcionando
    }
  }


  goToDispendioCreate() {
    this.router.navigate(['/dispendio-create/', this.projeto.projId]);
  }

  setPropertyCronograma() {
    this.calcQtdeDiasProjeto(this.projeto.projDataInicial, this.projeto.projDataFinal);
    this.calcQtdeDiasConcluidos(this.projeto.projDataInicial);
  }

  calcQtdeDiasProjeto(dtinicio: Date, dtfim: Date) {
    this.qtdDiasProjeto = Utils.getQtdDayByDtinicialAndDtFinal(dtinicio, dtfim) * 24;
  }

  calcQtdeDiasConcluidos(dtinicio: Date) {
    if (new Date() < dtinicio) {
      this.qtdDiasUtilizados = 0;
    } else {
      this.qtdDiasUtilizados = Utils.getQtdDayByDtinicialAndDtFinal(dtinicio, new Date()) * 24;
    }
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }


}

