import {Component, OnDestroy, OnInit} from '@angular/core';
import {FuncionarioProvisao} from '../../models/funcionarioprovisao.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Constants} from '../../utils/constants';
import {Funcionario} from '../../models/funcionario.model';
import {FuncionarioProvisaoService} from '../../services/funcionarioprovisao.service';
import {NotificationService} from '../../services/notification.service';
import {Month} from '../../models/mes.model';
import {Utils} from '../../utils/utils';
import {ErrorStateMatcherImp} from '../../utils/ErrorStateMatcher';
import {MatAutocompleteSelectedEvent, MatOptionSelectionChange} from '@angular/material';

@Component({
  selector: 'app-provisao-edit',
  templateUrl: './provisao-edit.component.html',
  styleUrls: ['./provisao-edit.component.scss']
})
export class ProvisaoEditComponent implements OnInit, OnDestroy {


  paramsSubscription: Subscription;
  provisao: FuncionarioProvisao;
  fuprId: number;
  funcId: number;
  provisaoForm: FormGroup;
  listMeses: Month[];
  listYears;
  yearReferencia: FormControl;
  public mesReferencia: FormControl;
  errorMatcher = new ErrorStateMatcherImp();
  listProvisaoFuncionario: FuncionarioProvisao[];

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private funcionarioProvisaoService: FuncionarioProvisaoService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.fuprId = params['fuprId'];
      this.funcId = params['funcId'];
    });

    this.listYears = Utils.getListYear();

    this.listMeses = Utils.getMeses();

    this.initForm();

    this.funcionarioProvisaoService.listProvisaoByFuncId(this.funcId).subscribe(
      provisoes => {
        this.listProvisaoFuncionario = provisoes;
      });

    this.funcionarioProvisaoService.findProvisaoByFuprId(this.fuprId)
      .subscribe(
        provisao => {
          this.provisao = provisao;
          this.provisaoForm.patchValue(provisao, {onlySelf: false});
          this.initMonthAndYearReferencia(provisao.fuprReferencia);
        }
      );
  }


  initMonthAndYearReferencia(fuprReferencia: number) {
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
      fuprTotalGeral: this.fb.control('', [Validators.pattern(Constants.DECIMAL_PATTERN)]),
      fuprHoraTotal: this.fb.control('', [Validators.pattern(Constants.NUMBER_PATTER)]),
      fuprHoraHomem: this.fb.control({value: 0, disabled: true}, Validators.pattern(Constants.NUMBER_PATTER))
    });


  }


  upadateHomeHora() {

    if (this.provisaoForm.get('fuprTotalGeral').valid && this.provisaoForm.get('fuprHoraTotal').valid) {

      this.provisaoForm.get('fuprHoraHomem').setValue(+(this.provisaoForm.get('fuprTotalGeral').value / this.provisaoForm.get('fuprHoraTotal').value).toFixed(2));

    } else {
      this.provisaoForm.get('fuprHoraHomem').setValue(0);
    }
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
  upadateProvisao(funcionarioProvisao: FuncionarioProvisao) {


    funcionarioProvisao.fuprReferencia = this.formatMesReferencia();
    funcionarioProvisao.fuprFuncId = new Funcionario();
    funcionarioProvisao.fuprFuncId.funcId = this.funcId;
    funcionarioProvisao.fuprId = this.fuprId;
    funcionarioProvisao.fuprHoraHomem = this.provisaoForm.get('fuprHoraHomem').value;

    this.funcionarioProvisaoService.createFuncionarioProvisao(funcionarioProvisao)
      .subscribe(() => this.notificationService.notify(`Provisão atualizada com sucesso`),
        response => // HttpErrorResponse
          this.notificationService.notify('Erro ao atualizar provisão'),
        () => {
          this.redirectFuncionarioDetail();
        });
  }


  deleteProvisao() {
    this.funcionarioProvisaoService.deleteProvisao(this.provisao)
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
      {queryParams: {funcId: this.funcId}, skipLocationChange: false});
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
