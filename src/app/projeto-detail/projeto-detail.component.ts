import {Component, OnInit, Input, OnDestroy, ViewChild, AfterViewInit, AfterContentChecked} from '@angular/core';
import {ProjetoService} from '../services/projeto.service';
import {Projeto} from '../models/projeto.model';
import {ActivatedRoute, NavigationEnd, ParamMap, Router} from '@angular/router';
import {Utils} from '../utils/utils';
import {ProjetoDispendioService} from '../services/projetodispendio.service';
import 'rxjs/add/observable/forkJoin';
import {MatTabChangeEvent} from '@angular/material';
import {TipodispendioService} from '../services/tipodispendio.service';
import {Tipodispendio} from '../models/tipodispendio.model';
import {Observable} from 'rxjs/Observable';
import {ProjetoDispendio} from '../models/projetodispendio.model';
import {LoginService} from '../services/login.service';
import {Constants} from '../utils/constants';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import {ToolbarService} from '../services/toolbar.service';
import {Title} from '@angular/platform-browser';

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
  // referente a aba padrão
  indexTab = 0;

  constructor(private projetoService: ProjetoService,
              private projetoDispendioService: ProjetoDispendioService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private tipoDispendioService: TipodispendioService,
              public loginService: LoginService,
              public toolbarService: ToolbarService,
              private titleService: Title
  ) {
    this.paramsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.projId = params['id'];
      params['indextab'] != null ? this.indexTab = +params['indextab'] : '';

    });


    this.projetoService.findByProjId(this.projId)
      .subscribe(projeto => {
        this.projeto = projeto;
        this.alterName();
        this.toolbarService.setValorToolbar(projeto.projNome);
        this.setPropertyCronograma();
      });
  }

  ngOnInit() {

    this.configRouteBack();

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
      //  console.log('case 3');
      // this.router.navigate(['../atividades'], {relativeTo: this.activatedRoute}); não funcionando
    }
  }

  goToDispendioCreate() {

    this.router.navigate(['/dispendio-create/'],
      {
        queryParams: {
          id: this.projeto.projId
        }, skipLocationChange: true
      });
  }

  redirectAlterProjeto() {
    this.router.navigate(['/projeto-edit/'],
      {
        queryParams: {
          id: this.projId
        }, skipLocationChange: true
      });
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

  /*Reduz nome completo para nome e sobrenome
  * */
  alterName() {
    this.projeto.projFuncId.funcNome = Utils.resumeName(this.projeto.projFuncId.funcNome);
    if (this.projeto && this.projeto.equipe && this.projeto.equipe.length > 0) {
      this.projeto.equipe.forEach(element => {
        element.funcNome = Utils.resumeName(element.funcNome);
      });
    }
  }

  configRouteBack() {
    this.toolbarService.setRouteBack('/projetos');
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}

