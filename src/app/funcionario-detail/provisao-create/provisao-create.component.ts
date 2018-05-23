import {Component, OnDestroy, OnInit} from '@angular/core';
import {FuncionarioProvisao} from '../../models/funcionarioprovisao.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Constants} from '../../utils/constants';
import {Funcionario} from '../../models/funcionario.model';
import {FuncionarioProvisaoService} from '../../services/funcionarioprovisao.service';
import {NotificationService} from '../../services/notification.service';
import {Month} from '../../models/mes.model';
import {Utils} from '../../utils/utils';
import {MatOptionSelectionChange} from '@angular/material';
import {ToolbarService} from '../../services/toolbar.service';
import {Subject} from 'rxjs/Subject';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-provisao-create',
  templateUrl: './provisao-create.component.html',
  styleUrls: ['./provisao-create.component.scss']
})
export class ProvisaoCreateComponent implements OnInit, OnDestroy {


  private unsubscribe$ = new Subject();
  funcId: number;
  provisaoForm: FormGroup;
  listMeses: Month[];
  listYears;
  yearReferencia: FormControl;
  mesReferencia: FormControl;
  listProvisaoFuncionario: FuncionarioProvisao[];

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private funcionarioProvisaoService: FuncionarioProvisaoService,
              private notificationService: NotificationService,
              private router: Router,
              private toolbarService: ToolbarService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.funcId = params['funcId'];
      });

    // manipula evento do botão criar da barra de ferramentas
    this.toolbarService.action$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.salvarProvisao());

    this.configRouteBack();

    this.listYears = Utils.getListYear();

    this.listMeses = Utils.getMeses();

    this.initForm();
  }

  /* inicializa valores do form
  * */
  initForm() {
    // inicializa com ano atual
    this.yearReferencia = new FormControl(new Date().getFullYear().toString(), [
      Validators.required,
    ]);

    this.mesReferencia = new FormControl('', [
      Validators.required,
    ]);

    this.provisaoForm = this.fb.group({
      mesReferencia: this.mesReferencia,
      yearReferencia: this.yearReferencia,
      fuprBeneficios: this.fb.control('', [Validators.required]),
      fuprEncargos: this.fb.control('', [Validators.required]),
      fuprSalario: this.fb.control('', [Validators.required]),
      fuprTotalGeral: this.fb.control(0, [Validators.required]),
      fuprHoraTotal: this.fb.control(Constants.HORAS_TRABALHADAS_PADRAO, [Validators.required, Validators.max(Constants.HORAS_TRABALHADAS_PADRAO)]),
      fuprHoraHomem: this.fb.control(0, [Validators.required]),
    });

    this.funcionarioProvisaoService.listProvisaoByFuncId(this.funcId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(provisoes => this.listProvisaoFuncionario = provisoes);
  }


  upadateFields() {
    this.updateHomehora();
    this.updateProvisao();
  }

  updateHomehora() {
    this.provisaoForm.get('fuprTotalGeral').setValue(+(
      this.provisaoForm.get('fuprSalario').value +
      this.provisaoForm.get('fuprBeneficios').value +
      this.provisaoForm.get('fuprEncargos').value));

  }

  updateProvisao() {
    this.provisaoForm.get('fuprHoraHomem').setValue(+(
      this.provisaoForm.get('fuprTotalGeral').value /
      this.provisaoForm.get('fuprHoraTotal').value));
  }

  /* retorna yyyymm
  * */
  formatMesReferencia(): number {

    if (this.mesReferencia.value.toString().length === 0) {

      return +(this.yearReferencia.value.toString() + '0' + this.mesReferencia.value.toString());

    } else {

      return +(this.yearReferencia.value.toString() + this.mesReferencia.value.toString());
    }
  }

  /* Verifica se período referente já foi inserido
  * */
  verificaProvisao(event: MatOptionSelectionChange) {

    if (this.mesReferencia.value && this.yearReferencia.value && this.listProvisaoFuncionario) {

      const yearmonthRef = this.formatMesReferencia();

      const valor = this.listProvisaoFuncionario.filter((provisao) => provisao.fuprReferencia === yearmonthRef);
      if (Object.keys(valor).length !== 0) {
        this.mesReferencia.setErrors({'incorrect': true});
        this.yearReferencia.setErrors({'incorrect': true});
      } else {
        this.mesReferencia.setErrors(null);
        this.yearReferencia.setErrors(null);
      }
    }
  }

  /*
  * */
  salvarProvisao() {

    if (this.provisaoForm.valid) {

      const funcionarioProvisao = this.provisaoForm.value;

      funcionarioProvisao.fuprFuncId = new Funcionario();
      funcionarioProvisao.fuprFuncId.funcId = this.funcId;

      funcionarioProvisao.fuprReferencia = this.formatMesReferencia();

      this.funcionarioProvisaoService.createFuncionarioProvisao(funcionarioProvisao)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => this.notificationService.notify(`Provisão inserida com sucesso`),
          response => // HttpErrorResponse
            this.notificationService.notify('Erro ao inserir provisão'),
          () => {
           this.redirectFuncionarioDetail();
          });
    } else {
      this.notificationService.notify('Preencha o(s) campo(s) corretamente');
      Utils.validateAllFormFields(this.provisaoForm);
    }
  }

  /* verifica se o estado do campo é valido caso seja tocado(alterado)
  * */
  isFieldInvalid(field: string) {
    return ((!this.provisaoForm.get(field).valid && this.provisaoForm.get(field).touched));
  }

  /* Redireciona para tela de funcionario-detail
  * */
  redirectFuncionarioDetail() {
    this.router.navigate(['/funcionario-detail'],
      {queryParams: {funcId: this.funcId}, skipLocationChange: true});
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /* Redireciona para tela de funcionario-detail
  * */
  configRouteBack() {
    const params: Params = {queryParams: {funcId: this.funcId}, skipLocationChange: true};
    this.toolbarService.setRouteBack('/funcionario-detail', params);
  }
}
