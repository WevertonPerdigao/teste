import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjetoDispendioService} from '../../../services/projetodispendio.service';
import {ProjetoDispendio} from '../../../models/projetodispendio.model';
import {Constants} from '../../../utils/constants';
import {Projetodispendiostatus} from '../../../models/projetodispendiostatus.model';
import {NotificationService} from '../../../services/notification.service';
import {LoginService} from '../../../services/login.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-list-dispendios',
  templateUrl: './list-dispendios.component.html',
  styleUrls: ['./list-dispendios.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ListDispendiosComponent implements OnInit, OnDestroy {

  projId;
  status;
  tipo;
  vlincial: number;
  vlfinal: number;
  indexTab = 1;
  paramsSubscription: Subscription;
  listDispendiosPendentes: ProjetoDispendio[];
  listDispendiosAprovados: Observable<ProjetoDispendio[]>;
  listDispendiosReprovados: Observable<ProjetoDispendio[]>;

  constructor(private activatedRoute: ActivatedRoute,
              private projetoDispendioService: ProjetoDispendioService,
              private notificationService: NotificationService,
              private loginService: LoginService,
              private cd: ChangeDetectorRef,
              private router: Router) {
  }


  ngOnInit() {

    this.paramsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.projId = params['id'];
      this.status = params['status'];
      this.tipo = params['tipo'];
      this.vlincial = params['vlincial'];
      this.vlfinal = params['vlfinal'];
      console.log('queryParams =>' + params);
    });

    this.listDispendiosAprovados = this.projetoDispendioService.listDispendioByParam(this.projId, Constants.APROVADO, null, null, this.tipo);
    this.listDispendiosReprovados = this.projetoDispendioService.listDispendioByParam(this.projId, Constants.RECUSADO, null, null, this.tipo);

    this.projetoDispendioService.listDispendioByParam(this.projId, Constants.PENDENTE, this.vlincial, this.vlfinal, this.tipo)
      .subscribe(dispendios => {
          this.listDispendiosPendentes = dispendios;
        }
      );

    this.initTab();
  }


  initTab() {
    console.log('Status valor' + this.status);
    switch (this.status) {
      case Constants.PENDENTE:
        this.indexTab = 0;
        break;
      case Constants.RECUSADO:
        this.indexTab = 2;
        break;
      case Constants.APROVADO:
        this.indexTab = 1;
        break;
    }
  }

  /*alterar o status do dispendio de pendente para reprovado
  * */
  reprovar(dispendio: ProjetoDispendio) {
    const statusDispendio = new Projetodispendiostatus(Constants.RECUSADO, this.loginService.getFuncionario(), new Date());
    dispendio.prdsPrdiId = statusDispendio;
    console.log('json objeto => ' + JSON.stringify(dispendio));
    this.projetoDispendioService.alterStatusDispendio(dispendio)
      .subscribe(() => {
          this.notificationService.notify(`Dispêndio reprovado com sucesso`);
        },
        response => // HttpErrorResponse
          this.notificationService.notify(response.error.message || 'Erro ao aprovar dispêndio')
      );
  }

  /*alterar o status do dispendio de pendente para aprovado
   * */
  aprovar(dispendio: ProjetoDispendio) {
    const statusDispendio = new Projetodispendiostatus(Constants.APROVADO, this.loginService.getFuncionario(), new Date());
    dispendio.prdsPrdiId = statusDispendio;
    console.log('json objeto => ' + JSON.stringify(dispendio));
    this.projetoDispendioService.alterStatusDispendio(dispendio)
      .subscribe(() => {
          this.listDispendiosPendentes.splice(this.listDispendiosPendentes.indexOf(dispendio), 1);
          this.notificationService.notify(`Dispêndio aprovado com sucesso`);
        },
        response => // HttpErrorResponse
          this.notificationService.notify(response.error.message + 'Erro ao aprovar dispêndio')
      );
  }

  goToDispendioCreate() {
    this.router.navigate(['/dispendio-create/', this.projId]);
  }

  goToEditStatusDispendio(prdiId: number) {
    this.router.navigate(['/dispendio-status-edit/'],
      {
        queryParams: {
          id: this.projId,
          status: this.status,
          tipo: this.tipo,
          vlinicial: this.vlincial,
          vlfinal: this.vlfinal,
          prdiId: prdiId,
        },
        skipLocationChange: false,
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
