import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../services/notification.service';
import {DateAdapter} from '@angular/material/core';
import {Projeto} from '../../../models/projeto.model';
import {TipodispendioService} from '../../../services/tipodispendio.service';
import {Tipodispendio} from '../../../models/tipodispendio.model';
import {ProjetoDispendio} from '../../../models/projetodispendio.model';
import {ProjetoDispendioService} from '../../../services/projetodispendio.service';
import {LoginService} from '../../../services/login.service';
import {Constants} from '../../../utils/constants';
import {Projetodispendiostatus} from '../../../models/projetodispendiostatus.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-dispendio-status-edit',
  templateUrl: './dispendio-status-edit.component.html',
  styleUrls: ['./dispendio-status-edit.component.scss'],
})

export class DispendioStatusEditComponent implements OnInit, OnDestroy {

  dispendioForm: FormGroup;
  dispendioId: number;
  dispendio: ProjetoDispendio;

  projId;
  status;
  tipo;
  vlincial;
  vlfinal;
  paramsSubscription: Subscription;
  tipoDispendio: Tipodispendio;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private projetoDispendioService: ProjetoDispendioService,
              private loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.paramsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.projId = params['id'];
      this.status = params['status'];
      this.tipo = params['tipo'];
      this.vlincial = params['vlincial'];
      this.vlfinal = params['vlfinal'];
      this.dispendioId = params['prdiId'];
    });

    this.projetoDispendioService.findById(this.dispendioId)
      .subscribe(dispendio => {
        this.dispendio = dispendio;
        this.dispendioForm.patchValue(dispendio, {onlySelf: false});
        this.tipo = dispendio.prdiTidiId;
      });
  }


  /*alterar o status do dispendio de pendente para reprovado
  * */
  reprovar() {
    const statusDispendio = new Projetodispendiostatus(Constants.RECUSADO, this.loginService.getFuncionario(), new Date());
    this.dispendio.prdsPrdiId = statusDispendio;
    this.projetoDispendioService.alterStatusDispendio(this.dispendio)
      .subscribe(() => {
          this.redirecListDispendios();
          this.notificationService.notify(`Dispêndio reprovado com sucesso`);
        },
        response => // HttpErrorResponse
          this.notificationService.notify(response.error.message || 'Erro ao reprovar dispêndio')
      );
  }

  /*alterar o status do dispendio de pendente para aprovado
   * */
  aprovar() {
    const statusDispendio = new Projetodispendiostatus(Constants.APROVADO, this.loginService.getFuncionario(), new Date());
    this.dispendio.prdsPrdiId = statusDispendio;
    this.projetoDispendioService.alterStatusDispendio(this.dispendio)
      .subscribe(() => {
          this.redirecListDispendios();
          this.notificationService.notify(`Dispêndio aprovado com sucesso`);

        },
        response => // HttpErrorResponse
          this.notificationService.notify(response.error.message + 'Erro ao aprovar dispêndio')
      );
  }


  displayTipoDispendio(tipodispendio?: Tipodispendio): string | undefined {
    return tipodispendio ? tipodispendio.tidiNome : undefined;
  }


  initForm() {
    this.dispendioForm = this.fb.group({
      prdiId: this.fb.control('', [Validators.required]),
      prdiTituloFatura: this.fb.control('', [Validators.required]),
      prdiDescricao: this.fb.control('', [Validators.required]),
      prdiJustificativa: this.fb.control('', [Validators.required]),
      prdiDataNotaFiscal: this.fb.control('', [Validators.required]),
      prdiNotaFiscal: this.fb.control('', [Validators.required]),
      prdiDataPagamento: this.fb.control('', [Validators.required]),
      prdiValor: this.fb.control('', []),
      prdiProjId: this.fb.control('', [Validators.required]),
        });
  }

  redirecListDispendios() {
    this.router.navigate(['/list-dispendios/'],
      {
        queryParams: {
          id: this.projId,
          status: this.status,
          tipo: this.tipo,
          vlinicial: this.vlincial,
          vlfinal: this.vlfinal,
        },
        skipLocationChange: false,
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
