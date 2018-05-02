import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

@Component({
  selector: 'app-projeto-edit',
  templateUrl: './projeto-edit.component.html',
  styleUrls: ['./projeto-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjetoEditComponent implements OnInit, OnDestroy {

  @ViewChild('chipInput') chipInput: MatInput;
  @ViewChild('chipInputMembro') chipInputMembro: MatInput;
  projId;
  projetoForm: FormGroup;
  projFuncId = new FormControl();
  projMembro = new FormControl();
  projTipos = new FormControl();
  funcionarios: Funcionario[];
  membros: Funcionario[];
  tipoProjetos: Tipoprojeto[] = [];
  chipsTipo: Tipoprojeto[] = [];
  chipsMembros: Funcionario[] = [];
  minDate: Date;
  projeto: Projeto;

  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
  paramsSubscription: Subscription;


  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private router: Router,
              private adapter: DateAdapter<any>,
              private activatedRoute: ActivatedRoute,
              private funcionarioService: FuncionarioService,
              private tipoprojetoService: TipoprojetoService,
              private projetoService: ProjetoService) {
  }

  ngOnInit() {

    this.initForm();

    this.paramsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.projId = params['id'];
    });

    this.projetoService.findByProjId(this.projId)
      .subscribe(projeto => {
        this.projeto = projeto;
        this.chipsTipo = projeto.projTipos;
        this.chipsMembros = projeto.equipe;
        this.projetoForm.patchValue(projeto, {onlySelf: false});
      });

    this.fieldSearchFuncionarioResponsavel();

    this.fieldSearchFuncionarioMembro();

    this.fieldTipoProjeto();
  }

  // ngAfterViewInit() {
  //   // limpar campo funcionário responsável ao sair se não nenhum registro for selecionado
  //   this.trigger.panelClosingActions.subscribe(
  //     nameSearch => {
  //       if (!nameSearch || !nameSearch.source) {
  //         this.projetoForm.get('projFuncId').setValue(null);
  //       }
  //     }
  //   );
  // }

  fieldTipoProjeto() {
    this.paramsSubscription = this.projTipos.valueChanges
      .startWith('')
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(() =>
        this.tipoprojetoService.listAllTipos()
          .catch(error => Observable.from([])))
      .subscribe(tipoProjetos => {
        const tiposTemp: Tipoprojeto[] = [];
        if (this.chipsTipo.length > 0) {
          tipoProjetos.forEach(element => {
            let result = false;
            this.chipsTipo.forEach(chip => {
              if (chip.tiprId === element.tiprId) result = true;
            });
            if (!result) {
              tiposTemp.push(element);
            }
          });
          this.tipoProjetos = tiposTemp;

        } else {
          this.tipoProjetos = tipoProjetos;
        }

      });
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
    this.projFuncId = this.fb.control('', [Validators.required]);
    this.projetoForm = this.fb.group({
      projId: this.fb.control('', []),
      projNome: this.fb.control('', [Validators.required, Validators.minLength(1), Validators.maxLength(80)]),
      projDataInicial: this.fb.control('', [Validators.required]),
      projDataFinal: this.fb.control('', [Validators.required]),
      projFuncId: this.projFuncId,
      projValor: this.fb.control('', [Validators.required])
    });


  }

  isFieldInvalid(field: string) {
    return (
      (!this.projetoForm.get(field).valid && this.projetoForm.get(field).touched));
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

  onSubmit(projeto: Projeto) {
    if (this.projetoForm.valid) {
      projeto.equipe = (this.chipsMembros);

      projeto.projSiprId = new SituacaoProjeto(Constants.ATIVO);
      projeto.projTipos = (this.chipsTipo);
      projeto.projEmprId = new Empresa(1);

      this.projetoService.createProjeto(projeto)
        .subscribe(() => this.notificationService.notify(`Projeto alterado com sucesso`),
          response => // HttpErrorResponse
            this.notificationService.notify('Erro ao alterar projeto'),
          () => {
            this.redirectProjetoDetail();
          });
    } else {
      this.notificationService.notify('Preencha os campos corretamente');
    }
  }


  remove(chip: Tipoprojeto): void {
    const index = this.chipsTipo.indexOf(chip);
    if (index >= 0) {
      this.chipsTipo.splice(index, 1);
      this.tipoProjetos.push(chip);
    }
    this.chipInput['nativeElement'].blur();
  }

  /* Adiciona tipo do projeto selecionado */
  addTiposProjeto(event: MatAutocompleteSelectedEvent): void {

    const t: Tipoprojeto = event.option.value;

    this.chipsTipo.push(t);

    const index = this.chipsTipo.indexOf(t);

    this.tipoProjetos.splice(index, 1);

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


  excluirProjeto() {
    this.projetoService.deleteProjeto(this.projId)
      .subscribe(() => this.notificationService.notify(`Projeto removido com sucesso`),
        response => // HttpErrorResponse
          this.notificationService.notify('Erro ao remover projeto'),
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
      {queryParams: {id: this.projId}, skipLocationChange: false});
  }


  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
