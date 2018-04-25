import {Component, OnInit} from '@angular/core';
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
import {ErrorStateMatcherImp} from '../../../utils/ErrorStateMatcher';

@Component({
  selector: 'app-dispendio-create',
  templateUrl: './dispendio-create.component.html',
  styleUrls: ['./dispendio-create.component.scss']
})

export class DispendioCreateComponent implements OnInit {


  dispendioForm: FormGroup;
  idprojeto: number;
  errorMatcher = new ErrorStateMatcherImp();

  tiposdispendios: Tipodispendio[] = [];

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private adapter: DateAdapter<any>,
              private tipodispendioService: TipodispendioService,
              private projetoDispendioService: ProjetoDispendioService,
              private loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.idprojeto = this.activatedRoute.snapshot.params['id'];
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
      (!this.dispendioForm.get(field).valid && this.dispendioForm.get(field).touched));
  }

  getErrorMessage() {
    return this.dispendioForm.get('prdiValor').hasError('required') ? 'campo obrigatório' :
      !this.dispendioForm.get('prdiValor').valid ? 'Valor inválido' :
        '';
  }

  salvarDispendio(projetoDispendio: ProjetoDispendio) {

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
  }

  goToProjectDetail() {
    this.router.navigate(['/projeto-detail'],
      {queryParams: {id: this.idprojeto}, skipLocationChange: false});
  }

}
