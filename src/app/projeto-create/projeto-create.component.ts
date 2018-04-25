import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
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
  selector: 'app-projeto-create',
  templateUrl: './projeto-create.component.html',
  styleUrls: ['./projeto-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjetoCreateComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('chipInput') chipInput: MatInput;
  projetoForm: FormGroup;
  projFuncId = new FormControl();
  funcionarios: Funcionario[];
  tipoProjetos: Tipoprojeto[] = [];
  chips: Tipoprojeto[] = [];
  minDate: Date;

  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
  paramsSubscription: Subscription;


  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private router: Router,
              private adapter: DateAdapter<any>,
              private funcionarioService: FuncionarioService,
              private tipoprojetoService: TipoprojetoService,
              private projetoService: ProjetoService) {
  }

  ngOnInit() {
    this.projFuncId = this.fb.control('', [Validators.required]);
    this.projetoForm = this.fb.group({
      projNome: this.fb.control('', [Validators.required, Validators.minLength(1), Validators.maxLength(80)]),
      projDataInicial: this.fb.control('', [Validators.required]),
      projDataFinal: this.fb.control('', [Validators.required]),
      projFuncId: this.projFuncId,
      projValor: this.fb.control('', [Validators.required])
    });


    this.paramsSubscription = this.projFuncId.valueChanges
      .startWith('')
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(nameSearch =>
        this.funcionarioService.listFuncionariosByName(nameSearch)
          .catch(error => Observable.from([])))
      .subscribe(funcionarios => this.funcionarios = funcionarios);

    this.tipoprojetoService.listAllTipos()
      .subscribe(tipoProjetos => this.tipoProjetos = tipoProjetos);
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
    projeto.projSiprId = new SituacaoProjeto(Constants.ATIVO);
    projeto.projTipos = (this.chips);
    projeto.projEmprId = new Empresa(1);

    this.projetoService.createProjeto(projeto)
      .subscribe(() => this.notificationService.notify(`Projeto criado com sucesso`),
        response => // HttpErrorResponse
          this.notificationService.notify(response.error.message),
        () => {
          this.router.navigate(['projetos']);
        });
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

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
