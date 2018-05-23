import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../services/notification.service';
import {ViewEncapsulation} from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import {FuncionarioService} from '../services/funcionario.service';
import {Funcionario} from '../models/funcionario.model';
import {ViewChild} from '@angular/core';
import {MatDatepickerInputEvent, MatInput} from '@angular/material';
import {TipoprojetoService} from '../services/tipoprojeto.service';
import {Tipoprojeto} from '../models/tipoprojeto.model';
import {ProjetoService} from '../services/projeto.service';
import {Projeto} from '../models/projeto.model';
import {Empresa} from '../models/empresa.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/debounceTime';
import {
  MatAutocompleteTrigger,
  MatAutocompleteSelectedEvent
} from '@angular/material';
import {Constants} from '../utils/constants';
import 'rxjs/add/operator/startWith';
import {Subscription} from 'rxjs/Subscription';
import {ToolbarService} from '../services/toolbar.service';
import {Utils} from '../utils/utils';
import {noWhiteSpaceValidator} from '../utils/noWhiteSpaceValidator';
import {Areapesquisa} from '../models/areapesquisa.model';
import {AreapesquisaService} from '../services/areapesquisa.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {UploadService} from '../services/upload.service';
import {Enquadrabilidade} from '../models/enquadrabilidade.model';
import {EnquadrabilidadeService} from '../services/enquadrabilidade.service';

@Component({
  selector: 'app-projeto-edit',
  templateUrl: './projeto-edit.component.html',
  styleUrls: ['./projeto-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjetoEditComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('chipInputMembro') chipInputMembro: MatInput;
  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
  projId;
  projetoForm: FormGroup;
  funcionarios: Funcionario[];
  membros: Funcionario[];
  tiposProjeto: Tipoprojeto[] = [];
  areasPesquisa: Areapesquisa[] = [];
  enquadrabilidades: Enquadrabilidade[] = [];
  chipsMembros: Funcionario[] = [];
  minDate: Date;
  projeto: Projeto;
  validatorWhiteSpace = new noWhiteSpaceValidator();

  paramsSubscription: Subscription;

  projMembro = new FormControl();

  projFuncId = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private router: Router,
              private adapter: DateAdapter<any>,
              private activatedRoute: ActivatedRoute,
              private funcionarioService: FuncionarioService,
              private tipoprojetoService: TipoprojetoService,
              private projetoService: ProjetoService,
              private toolbarService: ToolbarService,
              private areapesquisaService: AreapesquisaService,
              private upService: UploadService,
              private enquadrabilidadeService: EnquadrabilidadeService
  ) {
  }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.projId = params['id'];
    });
    // manipula evento do botão criar
    this.toolbarService.action$.subscribe(() => this.onSubmit());

    this.initForm();

    this.listAreapesquisa();

    this.listTipos();

    this.listEnquadrabilidade();
    this.configRouteBack();

    this.setValuesFormProjeto();

    this.fieldSearchFuncionarioResponsavel();

    this.fieldSearchFuncionarioMembro();
  }


  setValuesFormProjeto() {
    this.projetoService.findByProjId(this.projId)
      .subscribe(projeto => {
        this.projeto = projeto;
        this.projeto.atividades = null;
        console.log('projeto base =>:' + JSON.stringify(projeto));
        this.chipsMembros = projeto.equipe;
        if (this.chipsMembros.length > 0) {
          this.chipsMembros.forEach(chip => {
            chip.funcNome = Utils.resumeName(chip.funcNome);
          });
        }
        this.projetoForm.patchValue(projeto, {onlySelf: false});
        // angular issue #1105
        this.projetoForm.get('projDataInicial').setValue(new Date(projeto.projDataInicial));
        this.projetoForm.get('projDataFinal').setValue(new Date(projeto.projDataFinal));
      });
  }

  compareTipo(t1: Tipoprojeto, t2: Tipoprojeto): boolean {
    return t1 && t2 ? t1.tiprId === t2.tiprId : t1 === t2;
  }

  compareArea(a1: Areapesquisa, a2: Areapesquisa): boolean {
    return a1 && a2 ? a1.codigo === a2.codigo : a1 === a2;
  }

  compareEnquadrabilidade(e1: Enquadrabilidade, e2: Enquadrabilidade): boolean {
    return e1 && e2 ? e1.codigo === e2.codigo : e1 === e2;
  }

  listTipos() {
    this.tipoprojetoService.listAllTipos()
      .subscribe(tipoProjetos => this.tiposProjeto = tipoProjetos);
  }

  listEnquadrabilidade() {
    this.enquadrabilidadeService.listAllEnquadrabilidade().subscribe(
      enquadrabilidades => this.enquadrabilidades = enquadrabilidades
    );
  }

  listAreapesquisa() {
    this.paramsSubscription = this.areapesquisaService.listAllAreapesquisa()
      .subscribe(areas => this.areasPesquisa = areas);
  }

  ngAfterViewInit() {
    // limpar campo funcionário responsável ao sair se nenhum registro for selecionado
    this.trigger.panelClosingActions.subscribe(
      nameSearch => {
        if (!nameSearch || !nameSearch.source) {
          this.projetoForm.get('projFuncId').setValue(null);
        }
      }
    );
  }

  fieldSearchFuncionarioMembro() {
    this.paramsSubscription = this.projMembro.valueChanges
      .startWith('')
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(nameSearch =>
        this.funcionarioService.listFuncionariosByName(nameSearch)
          .catch(error => Observable.from([])))
      .subscribe(funcionarios => {
        const funcTemp: Funcionario[] = [];
        if (this.chipsMembros.length > 0) {
          funcionarios.forEach(element => {
            let result = false;
            this.chipsMembros.forEach(chip => {
              if (chip.funcId === element.funcId) result = true;
            });
            if (!result) {
              funcTemp.push(element);
            }
          });
          this.membros = funcTemp;
        } else {
          this.membros = funcionarios;
        }
      });
  }

  fieldSearchFuncionarioResponsavel() {
    this.paramsSubscription = this.projFuncId.valueChanges
      .startWith('')
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(nameSearch =>
        this.funcionarioService.listFuncionariosByName(nameSearch)
          .catch(error => Observable.from([])))
      .subscribe(funcionarios => this.funcionarios = funcionarios);
  }

  initForm() {
    this.projetoForm = this.fb.group({
      projId: this.fb.control('', []),
      projNome: this.fb.control('',
        [Validators.required, Validators.minLength(1),
          Validators.maxLength(80), this.validatorWhiteSpace.validWhiteSpace]),
      projDataInicial: this.fb.control('', [Validators.required]),
      projDataFinal: this.fb.control('', [Validators.required]),
      projFuncId: this.projFuncId,
      anexo: this.fb.control('', [Validators.required]),
      projTermoReferencia: this.fb.control('', [Validators.required]),
      areas: new FormControl([''], [Validators.required]),
      projTipo: new FormControl([''], [Validators.required]),
      projEnquadrabilidade: new FormControl([''], [Validators.required]),
      projValor: this.fb.control('', [Validators.required])
    });
  }

  /* Verifica se o período é válido
* */
  validaPrazo(event: MatDatepickerInputEvent<Date>) {

    if (this.projetoForm.get('projDataInicial').value && !this.projetoForm.get('projDataFinal').value) {

      this.minDate = new Date(this.projetoForm.get('projDataInicial').value);

    } else if (this.projetoForm.get('projDataInicial').value
      && this.projetoForm.get('projDataFinal').value
      && this.projetoForm.get('projDataInicial').value > this.projetoForm.get('projDataFinal').value) {

      this.minDate = new Date(this.projetoForm.get('projDataInicial').value);
      this.projetoForm.get('projDataFinal').reset();
    }
  }

  getErrorMessageDate(field: string) {
    return this.projetoForm.get(field).hasError('required') ? 'Informe a data' :
      this.projetoForm.get(field).hasError('incorrect') ? 'Período inválido: data inicial maior que a data final' : this.projetoForm.get(field) ? 'Data inválida' : '';
  }

  displayFuncionario(funcionario?: Funcionario): string | undefined {
    return funcionario ? funcionario.funcNome : undefined;
  }

  onSubmit() {

    if (this.projetoForm.valid) {
      const projeto = this.projetoForm.value;
      projeto.equipe = (this.chipsMembros);
      projeto.projEmprId = new Empresa(1);

      this.projetoService.createProjeto(projeto)
        .subscribe(() => {
            this.notificationService.notify(`Projeto alrerado com sucesso`);
            // if (this.uploadArquivo(projeto.projId)) {
            //   this.notificationService.notify(`Projeto alrerado com sucesso`);
            // } else {
            //   this.notificationService.notify(`Erro ao alterar projeto`);
            // }
          },
          response => // HttpErrorResponse
            this.notificationService.notify('Erro ao alterar projeto'),
          () => {
            this.redirectProjetoDetail();
          });
    } else {
      this.notificationService.notify('Preencha os campos corretamente');
      Utils.validateAllFormFields(this.projetoForm);
    }
  }


  uploadArquivo(projId: number): boolean {
    const files = this.projetoForm.get('anexo').value;

    if (files && files[0]) {

      const formData = new FormData();
      formData.append('file', files[0]);

      this.upService.uploadTermo(formData, projId).subscribe(event => {
          if (event instanceof HttpResponse) {
            return true;
          }
        }, response => {
          return false;
        } // HttpErrorResponse

      );
    }
    return true;
  }

  /*adiciona funcionário a atividade a ser criada se ainda não foi adicionado */
  addMembro(event: MatAutocompleteSelectedEvent): void {

    const t: Funcionario = event.option.value;

    const FuncResult = this.chipsMembros.filter((funcionario) => funcionario.funcId === t.funcId);

    if (Object.keys(FuncResult).length === 0) {
      const nomes = t.funcNome.split(' ');
      t.funcNome = nomes[0] + ' ' + nomes[nomes.length - 1];
      this.chipsMembros.push(t);
    }
    this.chipInputMembro['nativeElement'].value = '';
    this.chipInputMembro['nativeElement'].blur();
    this.chipInputMembro['nativeElement'].focus();
  }


  excluirProjeto() {
    this.projetoService.updateSituacaoProjeto(this.projId, Constants.INATIVO)
      .subscribe(() => this.notificationService.notify(`Projeto excluído com sucesso`),
        response => // HttpErrorResponse
          this.notificationService.notify('Erro ao excluir projeto'),
        () => {
          this.router.navigate(['/projetos']);
        });
  }

  removeMembro(chip: Funcionario): void {
    const index = this.chipsMembros.indexOf(chip);
    if (index >= 0) {
      this.chipsMembros.splice(index, 1);
    }
    this.chipInputMembro['nativeElement'].blur();
  }


  redirectProjetoDetail() {
    this.router.navigate(['/projeto-detail'],
      {queryParams: {id: this.projId, indextab: Constants.TAB_GERAL}, skipLocationChange: true});
  }

  configRouteBack() {
    const params: NavigationExtras = {queryParams: {id: this.projId, indextab: Constants.TAB_GERAL}, skipLocationChange: true};
    this.toolbarService.setRouteBack('/projeto-detail', params);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
