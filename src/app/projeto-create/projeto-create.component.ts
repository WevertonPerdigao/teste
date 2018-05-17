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

@Component({
  selector: 'app-projeto-create',
  templateUrl: './projeto-create.component.html',
  styleUrls: ['./projeto-create.component.scss']
})
export class ProjetoCreateComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('chipInput') chipInput: MatInput;
  @ViewChild('chipInputMembro') chipInputMembro: MatInput;
  @ViewChild('chipInputArea') chipInputArea: MatInput;
  projetoForm: FormGroup;
  projFuncId = new FormControl();
  projMembro = new FormControl();
  areasPesquisa: Areapesquisa[] = [];
  funcionarios: Funcionario[];
  membros: Funcionario[];
  tipoProjetos: Tipoprojeto[] = [];
  chips: Tipoprojeto[] = [];
  chipsMembros: Funcionario[] = [];
  chipsAreas: Areapesquisa[] = [];
  minDate: Date;
  validWhiteSpace = new noWhiteSpaceValidator();
  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
  paramsSubscription: Subscription;
  progressValue = 0;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private router: Router,
              private adapter: DateAdapter<any>,
              private funcionarioService: FuncionarioService,
              private tipoprojetoService: TipoprojetoService,
              private projetoService: ProjetoService,
              private toolbarService: ToolbarService,
              private upService: UploadService,
              private areapesquisaService: AreapesquisaService) {
  }

  ngOnInit() {
    // manipula evento do botão salvar da barra de ferramentas
    this.toolbarService.action$.subscribe(() => this.send());
    this.configRouteBack();
    this.initForm();
    this.configureFormControlFuncionario();
    this.configureFormControlMembro();
    this.listAreapesquisa();

    this.tipoprojetoService.listAllTipos()
      .subscribe(tipoProjetos => this.tipoProjetos = tipoProjetos);
  }

  initForm() {
    this.projFuncId = this.fb.control('', [Validators.required]);
    this.projetoForm = this.fb.group({
      projNome: this.fb.control('', [Validators.required, Validators.minLength(1),
        Validators.maxLength(80), this.validWhiteSpace.validWhiteSpace]),
      projDataInicial: this.fb.control('', [Validators.required]),
      projDataFinal: this.fb.control('', [Validators.required]),
      projFuncId: this.projFuncId,
      projTermoReferencia: this.fb.control('', [Validators.required]),
      anexo: this.fb.control('', [Validators.required]),
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


  ngAfterViewInit() {
    this.trigger.panelClosingActions.subscribe(
      nameSearch => {
        if (!nameSearch || !nameSearch.source) {
          this.projetoForm.get('projFuncId').setValue(null);
        }
      }
    );
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

  displayTipo(tipoProjeto?: Tipoprojeto): string | undefined {
    return tipoProjeto ? tipoProjeto.tiprNome : undefined;
  }

  displayArea(areaPesquisa?: Areapesquisa): string | undefined {
    return areaPesquisa ? areaPesquisa.nome : undefined;
  }

  onSubmit() {
    if (this.projetoForm.valid) {
      const projeto: Projeto = this.projetoForm.value;
      projeto.equipe = (this.chipsMembros);

      projeto.projSiprId = new SituacaoProjeto(Constants.ATIVO);
      projeto.projTipos = (this.chips);
      projeto.projEmprId = new Empresa(1);

      this.projetoService.createProjeto(projeto)
        .subscribe(() => this.notificationService.notify(`Projeto criado com sucesso`),
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


  remove(chip: Tipoprojeto): void {
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips.splice(index, 1);
    }
    this.chipInput['nativeElement'].blur();
  }

  /* Adiciona tipo do projeto selecionado */
  addTiposProjeto(event: MatAutocompleteSelectedEvent): void {

    const t: Tipoprojeto = event.option.value;

    const valor = this.chips.filter((task) => task.tiprId === t.tiprId);
    if (Object.keys(valor).length === 0) {
      this.chips.push(t);
    }
    this.chipInput['nativeElement'].blur();
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
    this.chipInputMembro['nativeElement'].blur();
  }

  removeMembro(chip: Funcionario): void {
    const index = this.chipsMembros.indexOf(chip);
    if (index >= 0) {
      this.chipsMembros.splice(index, 1);
    }
    this.chipInputMembro['nativeElement'].blur();
  }

  /*adiciona area selecionada */
  addArea(event: MatAutocompleteSelectedEvent): void {
    const t: Areapesquisa = event.option.value;
    const areaResult = this.chipsAreas.filter((area) => area.codigo === t.codigo);
    if (Object.keys(areaResult).length === 0) {
      this.chipsAreas.push(t);
    }
    this.chipInputArea['nativeElement'].blur();
  }

  removeArea(chipArea: Areapesquisa): void {
    const index = this.chipsAreas.indexOf(chipArea);
    if (index >= 0) {
      this.chipsAreas.splice(index, 1);
    }
    this.chipInputArea['nativeElement'].blur();
  }


  configRouteBack() {
    this.toolbarService.setRouteBack('/projetos');
  }

  send() {
    console.log('olá');

    const files = this.projetoForm.get('anexo').value;
    console.log('valor' + files[0]);
    if (files && files[0]) {

      const formData = new FormData();
      formData.append('file', files[0]);

      this.upService.upload(formData, 2056).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // This is an upload progress event. Compute and show the % done:
          this.progressValue = Math.round(100 * event.loaded / event.total);
          console.log(`File is ${this.progressValue}% uploaded.`);

        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
        }
      });
    } else {
      console.log('vazio');
    }
  }


  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
