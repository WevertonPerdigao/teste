import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../services/notification.service';
import {DateAdapter} from '@angular/material/core';
import {FuncionarioService} from '../services/funcionario.service';
import {Funcionario} from '../models/funcionario.model';
import {ViewChild} from '@angular/core';
import {MatDatepickerInputEvent, MatInput} from '@angular/material';
import {TipoprojetoService} from '../services/tipoprojeto.service';
import {Tipoprojeto} from '../models/tipoprojeto.model';
import {ProjetoService} from '../services/projeto.service';
import {SituacaoProjeto} from '../models/situacaoprojeto.model';
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
import {noWhiteSpaceValidator} from '../utils/noWhiteSpaceValidator';
import {ToolbarService} from '../services/toolbar.service';
import {Utils} from '../utils/utils';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {UploadService} from '../services/upload.service';
import {Projeto} from '../models/projeto.model';
import {AreapesquisaService} from '../services/areapesquisa.service';
import {Areapesquisa} from '../models/areapesquisa.model';
import {Enquadrabilidade} from '../models/enquadrabilidade.model';
import {EnquadrabilidadeService} from '../services/enquadrabilidade.service';

@Component({
  selector: 'app-projeto-create',
  templateUrl: './projeto-create.component.html',
  styleUrls: ['./projeto-create.component.scss']
})
export class ProjetoCreateComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('chipInputMembro') chipInputMembro: MatInput;
  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;

  projetoForm: FormGroup;

  projMembro = new FormControl();
  areasPesquisa: Areapesquisa[] = [];
  enquadrabilidades: Enquadrabilidade[] = [];
  funcionarios: Funcionario[];
  membros: Funcionario[];
  tipoProjetos: Tipoprojeto[] = [];
  chipsMembros: Funcionario[] = [];
  minDate: Date;
  validWhiteSpace = new noWhiteSpaceValidator();

  paramsSubscription: Subscription;

  enquadrabilidadeSelected = new FormControl('', [Validators.required]);
  tiposSelected = new FormControl('', [Validators.required]);
  areasSelected = new FormControl('', [Validators.required]);
  projFuncId = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private router: Router,
              private adapter: DateAdapter<any>,
              private funcionarioService: FuncionarioService,
              private tipoprojetoService: TipoprojetoService,
              private projetoService: ProjetoService,
              private toolbarService: ToolbarService,
              private upService: UploadService,
              private areapesquisaService: AreapesquisaService,
              private enquadrabilidadeService: EnquadrabilidadeService) {
  }

  ngOnInit() {
    // manipula evento do botão salvar da barra de ferramentas
    this.toolbarService.action$.subscribe(() => this.onSubmit());
    this.configRouteBack();
    this.initForm();
    this.configureFormControlFuncionario();
    this.configureFormControlMembro();
    this.listAreapesquisa();
    this.listTipos();
    this.listEnquadrabilidade();
  }

  ngAfterViewInit() {
    this.trigger.panelClosingActions.subscribe(
      nameSearch => {
        if (!nameSearch || !nameSearch.source) {
          this.projetoForm.get('projFuncId').setValue(null);
        }
      }
    );
  }

  listEnquadrabilidade() {
    this.enquadrabilidadeService.listAllEnquadrabilidade().subscribe(
      enquadrabilidades => this.enquadrabilidades = enquadrabilidades
    );
  }

  listTipos() {
    this.tipoprojetoService.listAllTipos()
      .subscribe(tipoProjetos => this.tipoProjetos = tipoProjetos);
  }

  initForm() {
    this.projetoForm = this.fb.group({
      projNome: this.fb.control('', [Validators.required, Validators.minLength(1),
        Validators.maxLength(80), this.validWhiteSpace.validWhiteSpace]),
      projDataInicial: this.fb.control('', [Validators.required]),
      projDataFinal: this.fb.control('', [Validators.required]),
      projFuncId: this.projFuncId,
      projTermoReferencia: this.fb.control('', [Validators.required]),
      anexo: this.fb.control('', [Validators.required]),
      areas: this.areasSelected,
      projTipo: this.tiposSelected,
      projEnquadrabilidade: this.enquadrabilidadeSelected,
      projValor: this.fb.control('', [Validators.required])
    });
  }

  configureFormControlFuncionario() {
    this.paramsSubscription = this.projFuncId.valueChanges
      .startWith('')
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(nameSearch =>
        this.funcionarioService.listFuncionariosByName(nameSearch)
          .catch(error => Observable.from([])))
      .subscribe(funcionarios => this.funcionarios = funcionarios);
  }

  configureFormControlMembro() {
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

  listAreapesquisa() {
    this.paramsSubscription = this.areapesquisaService.listAllAreapesquisa()
      .subscribe(areas => this.areasPesquisa = areas);
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
      this.projetoForm.get(field).hasError('incorrect') ? 'Período inválido: data inicial maior que a data final' : this.projetoForm.get(field) ? 'Data inválida' :
        '';
  }

  displayFuncionario(funcionario?: Funcionario): string | undefined {
    return funcionario ? funcionario.funcNome : undefined;
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

  removeMembro(chip: Funcionario): void {
    const index = this.chipsMembros.indexOf(chip);
    if (index >= 0) {
      this.chipsMembros.splice(index, 1);
    }
    this.chipInputMembro['nativeElement'].blur();
  }


  configRouteBack() {
    this.toolbarService.setRouteBack('/projetos');
  }

  onSubmit() {
    if (this.projetoForm.valid) {
      const projeto: Projeto = this.projetoForm.value;
      projeto.equipe = (this.chipsMembros);
      projeto.anexo = null;

      projeto.projSiprId = new SituacaoProjeto(Constants.COD_ATIVO);
      projeto.projEmprId = new Empresa(1);

      console.log('JSON Projeto' + JSON.stringify(projeto));

      this.projetoService.createProjeto(projeto)
        .subscribe((projetoCreate) => {
            if (this.uploadArquivo(projetoCreate.projId)) {
              this.notificationService.notify(`Projeto criado com sucesso`);
            } else {
              this.notificationService.notify(`Erro ao anexar arquivo`);
            }
          },
          response => // HttpErrorResponse
            this.notificationService.notify('Erro ao criar projeto'),
          () => {
            this.router.navigate(['projetos']);
          });
    } else {
      this.notificationService.notify('Preencha o formulário corretamente');
      Utils.validateAllFormFields(this.projetoForm);
    }
  }

  uploadArquivo(projId: number): boolean {

    let result = false;
    const files = this.projetoForm.get('anexo').value;
    const formData = new FormData();
    formData.append('file', files[0]);

    this.upService.uploadTermo(formData, projId).subscribe(event =>
        result = true,
      response => // HttpErrorResponse
        console.log(response)
    );
    return result;
  }


  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
