import {Component, OnDestroy, OnInit} from '@angular/core';
import {FuncionarioProvisao} from '../../models/funcionarioprovisao.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Constants} from '../../utils/constants';
import {Funcionario} from '../../models/funcionario.model';
import {FuncionarioProvisaoService} from '../../services/funcionarioprovisao.service';
import {NotificationService} from '../../services/notification.service';
import {Month} from '../../models/mes.model';
import {Utils} from '../../utils/utils';
import {MatOptionSelectionChange} from '@angular/material';
import {ToolbarService} from '../../services/toolbar.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-provisao-edit',
  templateUrl: './provisao-edit.component.html',
  styleUrls: ['./provisao-edit.component.scss']
})
export class ProvisaoEditComponent implements OnInit, OnDestroy {


  private unsubscribe$ = new Subject();
  provisao: FuncionarioProvisao;
  fuprId: number;
  funcId: number;
  provisaoForm: FormGroup;
  listMeses: Month[];
  listYears;
  yearReferencia = new FormControl();
  mesReferencia = new FormControl();
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
        this.fuprId = params['fuprId'];
        this.funcId = params['funcId'];
      });

    // manipula evento do botão criar da barra de ferramentas
    this.toolbarService.action$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.upadateProvisao());
    this.configRouteBack();
    this.listYears = Utils.getListYear();
    this.listMeses = Utils.getMeses();
    this.initForm();
    this.funcionarioProvisaoService.listProvisaoByFuncId(this.funcId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        provisoes => {
          this.listProvisaoFuncionario = provisoes;
        });

    this.funcionarioProvisaoService.findProvisaoByFuprId(this.fuprId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        provisao => {
          this.provisao = provisao;
          this.provisaoForm.patchValue(provisao, {onlySelf: false});
          this.initMonthAndYearReferencia(provisao.fuprReferencia);
        }
      );
  }


  initMonthAndYearReferencia(fuprReferencia: number) {
    console.log('ref' + fuprReferencia);
    // inicializa com ano atual
    this.yearReferencia = new FormControl(fuprReferencia.toString().slice(0, 4), []);
    this.mesReferencia = new FormControl(fuprReferencia.toString().slice(4, 6), []);
  }

  /* inicializa valores do form
  * */
  initForm() {
    this.provisaoForm = this.fb.group({
      mesReferencia: this.mesReferencia,
      yearReferencia: this.yearReferencia,
      fuprReferencia: this.fb.control('', []),
      fuprBeneficios: this.fb.control('', [Validators.required]),
      fuprEncargos: this.fb.control('', [Validators.required]),
      fuprSalario: this.fb.control('', [Validators.required]),
      fuprTotalGeral: this.fb.control('', [Validators.required]),
      fuprHoraTotal: this.fb.control('', [Validators.required, Validators.max(Constants.HORAS_TRABALHADAS_PADRAO)]),
      fuprHoraHomem: this.fb.control('', [Validators.required]),
    });
  }


  upadateFields() {
    this.updateValorProvisao();
    this.updateHomehora();

  }

  updateHomehora() {
    this.provisaoForm.get('fuprHoraHomem').setValue(+(
      this.provisaoForm.get('fuprTotalGeral').value /
      this.provisaoForm.get('fuprHoraTotal').value));
  }

  updateValorProvisao() {
    this.provisaoForm.get('fuprTotalGeral').setValue(+(
      this.provisaoForm.get('fuprSalario').value +
      this.provisaoForm.get('fuprBeneficios').value +
      this.provisaoForm.get('fuprEncargos').value));
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

      const valor = this.listProvisaoFuncionario.filter((provisao) => provisao.fuprReferencia === yearmonthRef && yearmonthRef !== +this.provisaoForm.get('fuprReferencia').value)
        .filter((provisao) => provisao.fuprId !== this.fuprId);

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
  upadateProvisao() {

    if (this.provisaoForm.valid) {
      const funcionarioProvisao = this.provisaoForm.value;
      funcionarioProvisao.fuprReferencia = this.formatMesReferencia();
      funcionarioProvisao.fuprFuncId = new Funcionario();
      funcionarioProvisao.fuprFuncId.funcId = this.funcId;
      funcionarioProvisao.fuprId = this.fuprId;

      this.funcionarioProvisaoService.createFuncionarioProvisao(funcionarioProvisao)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => this.notificationService.notify(`Provisão atualizada com sucesso`),
          response => // HttpErrorResponse
            this.notificationService.notify('Erro ao atualizar provisão'),
          () => {
            this.redirectFuncionarioDetail();
          });
    } else {
      this.notificationService.notify('Preencha o(s) campo(s) corretamente');
      Utils.validateAllFormFields(this.provisaoForm);
    }
  }


  deleteProvisao() {
    this.funcionarioProvisaoService.deleteProvisao(this.provisao)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.notificationService.notify(`Provisão removida com sucesso`),
        response => // HttpErrorResponse
          this.notificationService.notify('Erro ao remover provisão'),
        () => {
          this.redirectFuncionarioDetail();
        });
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

  /* configura 'retorno da seta de navegação'
 * */
  configRouteBack() {
    const params: Params = {queryParams: {funcId: this.funcId}, skipLocationChange: true};
    this.toolbarService.setRouteBack('/funcionario-detail', params);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
