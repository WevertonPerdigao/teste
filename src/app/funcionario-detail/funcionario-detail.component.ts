import {Component, OnDestroy, OnInit} from '@angular/core';
import {FuncionarioProvisao} from '../models/funcionarioprovisao.model';
import {Subscription} from 'rxjs/Subscription';
import {FuncionarioProvisaoService} from '../services/funcionarioprovisao.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Funcionario} from '../models/funcionario.model';
import {Utils} from '../utils/utils';
import {Month} from '../models/mes.model';
import {FuncionarioService} from '../services/funcionario.service';
import {ToolbarService} from '../services/toolbar.service';

@Component({
  selector: 'app-funcionario-detail',
  templateUrl: './funcionario-detail.component.html',
  styleUrls: ['./funcionario-detail.component.scss']
})
export class FuncionarioDetailComponent implements OnInit, OnDestroy {


  listProvisao$: Observable<FuncionarioProvisao[]>;
  paramsSubscription: Subscription;
  funcId;


  constructor(private funcionarioProvisaoService: FuncionarioProvisaoService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private funcionarioService: FuncionarioService,
              private toolbarService: ToolbarService) {
  }

  ngOnInit() {
    this.configRouteBack();
    this.paramsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.funcId = params['funcId'];
    });

    this.funcionarioService.findFuncionarioById(this.funcId)
      .subscribe(funcionario => this.toolbarService.setValorToolbar(funcionario.funcNome));

    this.listProvisao$ = this.funcionarioProvisaoService.listProvisaoByFuncId(this.funcId);
  }

  /*
  * @param yyyyMM
   */
  getMesByReferencia(mesRef: number): String {

    const mes = mesRef.toString().slice(4, 6).replace('0', '');
    return Utils.getMesByReferencia(+mes);

  }


  /*Redireciona para tela de lista de funcionários
  * */
  backToFuncionarios(funcionario: Funcionario) {
    this.router.navigate(['/funcionarios'],
      {queryParams: {funcId: funcionario.funcId}, skipLocationChange: true});
  }

  /* Redireciona para tela de provisao-create
* */
  redirectProvisaoCreate() {
    this.router.navigate(['/provisao-create/'],
      {queryParams: {funcId: this.funcId}, skipLocationChange: true});
  }

  /* Redireciona para tela de provisao-create
* */
  redirectProvisaoEdit(fuprId: number) {
    this.router.navigate(['/provisao-edit/'],
      {queryParams: {fuprId: fuprId, funcId: this.funcId}, skipLocationChange: true});
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  configRouteBack() {
    this.toolbarService.setRotaBack('/funcionarios');
  }


}
