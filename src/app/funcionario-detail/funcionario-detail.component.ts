import {Component, OnDestroy, OnInit} from '@angular/core';
import {FuncionarioProvisao} from '../models/funcionarioprovisao.model';
import {FuncionarioProvisaoService} from '../services/funcionarioprovisao.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Funcionario} from '../models/funcionario.model';
import {Utils} from '../utils/utils';
import {Month} from '../models/mes.model';
import {FuncionarioService} from '../services/funcionario.service';
import {ToolbarService} from '../services/toolbar.service';
import {takeUntil} from 'rxjs/operators';
import {NotificationService} from '../services/notification.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-funcionario-detail',
  templateUrl: './funcionario-detail.component.html',
  styleUrls: ['./funcionario-detail.component.scss']
})
export class FuncionarioDetailComponent implements OnInit, OnDestroy {


  listProvisao: FuncionarioProvisao[] = [];
  funcId;
  private unsubscribe$ = new Subject();


  constructor(private funcionarioProvisaoService: FuncionarioProvisaoService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private funcionarioService: FuncionarioService,
              private toolbarService: ToolbarService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.configRouteBack();
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.funcId = params['funcId'];
      });

    this.funcionarioService.findFuncionarioById(this.funcId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(funcionario => this.toolbarService.setValorToolbar(funcionario.funcNome));


    this.funcionarioProvisaoService.listProvisaoByFuncId(this.funcId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(provisoes => this.listProvisao = provisoes);
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
    this.router.navigate(['/usuarios'],
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

  deleteProvisao(funcionarioProvisao: FuncionarioProvisao) {
    this.funcionarioProvisaoService.deleteProvisao(funcionarioProvisao)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
          this.listProvisao.splice(this.listProvisao.indexOf(funcionarioProvisao), 1);
          this.notificationService.notify(`Provisão removida com sucesso`);
        },
        response => // HttpErrorResponse
          this.notificationService.notify('Erro ao remover provisão'));
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  configRouteBack() {
    this.toolbarService.setRouteBack('/usuarios');
  }


}
