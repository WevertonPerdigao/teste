import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ProjetoDispendio} from '../../../models/projetodispendio.model';
import {Projetodispendiostatus} from '../../../models/projetodispendiostatus.model';
import {Constants} from '../../../utils/constants';
import {FuncionarioService} from '../../../services/funcionario.service';
import {ProjetoDispendioService} from '../../../services/projetodispendio.service';
import {NotificationService} from '../../../services/notification.service';
import {Projeto} from '../../../models/projeto.model';

@Component({
  selector: 'app-solicitacoes',
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.scss']
})
export class SolicitacoesComponent implements OnInit {

  @Input() dispendiosPendentes: Observable<ProjetoDispendio[]>;
  @Input() projId;

  constructor(private funcionarioService: FuncionarioService,
              private projetoDispendioService: ProjetoDispendioService,
              private notificationService: NotificationService,
              ) {
  }

  ngOnInit() {  }

  // solucao enviar apenas o dispendio
  // com seu id e o seu status no corpo do dispendio
  // backend com problema

  /*alterar o status do dispendio de pendente para reprovado
  * */
  reprovar(dispendio: ProjetoDispendio) {
    const statusDispendio = new Projetodispendiostatus();
    statusDispendio.prdsData = new Date();
    statusDispendio.prdsStatus = Constants.REPROVADO;
    statusDispendio.prdsFuncId = 1;
    dispendio.prdsPrdiId = statusDispendio;
    dispendio.prdiProjId = new Projeto(this.projId);
    console.log('json objeto => ' + JSON.stringify(dispendio));

    this.projetoDispendioService.alterStatusDispendio(dispendio)
      .subscribe(() => this.notificationService.notify(`Dispêndio reprovado com sucesso`),
        response => // HttpErrorResponse
          this.notificationService.notify(response.error.message || 'Erro ao reprovar dispêndio')
      );
  }

  /*alterar o status do dispendio de pendente para aprovado
   * */
  aprovar(dispendio: ProjetoDispendio) {
    const statusDispendio = new Projetodispendiostatus();
    statusDispendio.prdsData = new Date();
    statusDispendio.prdsStatus = Constants.APROVADO;
    statusDispendio.prdsFuncId = 1;
    this.projetoDispendioService.alterStatusDispendio(dispendio)
      .subscribe(() => this.notificationService.notify(`Dispêndio aprovado com sucesso`),
        response => // HttpErrorResponse
          this.notificationService.notify(response.error.message || 'Erro ao aprovar dispêndio')
      );
  }


}
