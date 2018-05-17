import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
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
// import {ErrorStateMatcherImp} from '../../../utils/ErrorStateMatcher';
import {ToolbarService} from '../../../services/toolbar.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-dispendio-create',
  templateUrl: './dispendio-create.component.html',
  styleUrls: ['./dispendio-create.component.scss']
})

export class DispendioCreateComponent implements OnInit, OnDestroy {


  dispendioForm: FormGroup;
  idprojeto: number;
  // errorMatcher = new ErrorStateMatcherImp();
  paramsSubscription: Subscription;

  tiposdispendios: Tipodispendio[] = [];

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private adapter: DateAdapter<any>,
              private tipodispendioService: TipodispendioService,
              private projetoDispendioService: ProjetoDispendioService,
              private loginService: LoginService,
              private toolbarService: ToolbarService
  ) {
  }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.idprojeto = params['id'];
    });

    this.configRouteBack();

    this.dispendioForm = this.fb.group({
      prdiTidiId: this.fb.control('', [Validators.required]),
      prdiJustificativa: this.fb.control('', [Validators.required]),
      prdiTituloFatura: this.fb.control('', [Validators.required]),
      prdiDescricao: this.fb.control('', []),
      prdiValor: this.fb.control('', [Validators.required, Validators.pattern(Constants.DECIMAL_PATTERN)]),
    });

    this.tipodispendioService.listAll()
      .subscribe(tiposdispendios => this.tiposdispendios = tiposdispendios);
  }

  isFieldInvalid(field: string) {
    return (
      (!this.dispendioForm.get(field).valid && this.dispendioForm.get(field).touched)
      || (this.dispendioForm.get(field).value.toString().replace(/\s+/g, ' ') === ''));
  }

  getErrorMessage() {
    return this.dispendioForm.get('prdiValor').hasError('required') ? 'campo obrigatório' :
      !this.dispendioForm.get('prdiValor').valid ? 'Valor inválido' :
        '';
  }

  salvarDispendio(projetoDispendio: ProjetoDispendio) {
    if (this.dispendioForm.valid) {

      let projeto = new Projeto();
      projeto.projId = this.idprojeto;
      projetoDispendio.prdiProjId = projeto;
      projetoDispendio.prdiFuncId = this.loginService.getFuncionario();

      this.projetoDispendioService.createProjetoDispendio(projetoDispendio)
        .subscribe(() => this.notificationService.notify(`Dispêndio solicitado com sucesso`),
          response => // HttpErrorResponse
            this.notificationService.notify(`Erro ao solicitar dispêndio`),
          () => {
            this.goToProjectDetail();
          });
    } else {
      this.notificationService.notify(`Erro ao solicitar dispêndio`);
    }
  }

  goToProjectDetail() {
    this.router.navigate(['/projeto-detail'],
      {queryParams: {id: this.idprojeto, indextab: Constants.TAB_ORCAMENTOS}, skipLocationChange: true});
  }

  configRouteBack() {
    const params: NavigationExtras = {queryParams: {id: this.idprojeto, indextab: Constants.TAB_ORCAMENTOS}, skipLocationChange: true};
    this.toolbarService.setRouteBack('/projeto-detail', params);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
