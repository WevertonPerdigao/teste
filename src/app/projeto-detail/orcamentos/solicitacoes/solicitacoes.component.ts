import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ProjetoDispendio} from '../../../models/projetodispendio.model';
import {Projetodispendiostatus} from '../../../models/projetodispendiostatus.model';
import {Constants} from '../../../utils/constants';
import {ProjetoDispendioService} from '../../../services/projetodispendio.service';
import {NotificationService} from '../../../services/notification.service';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login.service';
import {Funcionario} from '../../../models/funcionario.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-solicitacoes',
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.scss']
})
export class SolicitacoesComponent implements OnInit, OnDestroy {

  @Input() dispendiosPendentes: Observable<ProjetoDispendio[]>;
  @Input() projId;
  listDispendiosPendentes: ProjetoDispendio[] = [];
  paramsSubscription: Subscription;

  constructor(private projetoDispendioService: ProjetoDispendioService,
              private notificationService: NotificationService,
              private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.paramsSubscription = this.dispendiosPendentes.subscribe(
      dispendios => {
        this.listDispendiosPendentes = dispendios;
      }
    );
  }

  /*alterar o status do dispendio de pendente para reprovado
  * */
  reprovar(dispendio: ProjetoDispendio) {
    const statusDispendio = new Projetodispendiostatus(Constants.RECUSADO, this.loginService.getFuncionario(), new Date());
    dispendio.prdsPrdiId = statusDispendio;
    this.projetoDispendioService.alterStatusDispendio(dispendio)
      .subscribe(() => {
          this.listDispendiosPendentes.splice(this.listDispendiosPendentes.indexOf(dispendio), 1);
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
    this.projetoDispendioService.alterStatusDispendio(dispendio)
      .subscribe(() => {
          this.listDispendiosPendentes.splice(this.listDispendiosPendentes.indexOf(dispendio), 1);
          this.notificationService.notify(`Dispêndio aprovado com sucesso`);
        },
        response => // HttpErrorResponse
          this.notificationService.notify(response.error.message + 'Erro ao aprovar dispêndio')
      );
  }

  /*redireciona para tela de lista de dispêndios do projeto, incializando com os pendentes
  */
  verTodos() {
    const funcionario: Funcionario = this.loginService.getFuncionario();

    if (this.loginService.getFuncionario().funcPerfId.perfAcessoCompleto) {
      this.router.navigate(['/list-dispendios/'],
        {
          queryParams: {
            id: this.projId,
            status: Constants.PENDENTE
          }, skipLocationChange: false
        });

    } else {
      this.router.navigate(['/list-dispendios/'],
        {
          queryParams: {
            id: this.projId,
            status: Constants.PENDENTE,
            vlinicial: funcionario.funcPerfId.perfValorInicial,
            vlfinal: funcionario.funcPerfId.perfValorFinal
          }, skipLocationChange: true
        });
    }
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
