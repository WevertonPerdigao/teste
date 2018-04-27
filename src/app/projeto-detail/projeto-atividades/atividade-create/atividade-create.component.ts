import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../services/notification.service';
import {ViewEncapsulation} from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import {FuncionarioService} from '../../../services/funcionario.service';
import {Funcionario} from '../../../models/funcionario.model';
import {ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatDatepickerInputEvent, MatInput} from '@angular/material';
import {Projetoatividade} from '../../../models/projetoatividade.model';
import {ProjetoatividadeService} from '../../../services/projetoatividade.service';
import {Projeto} from '../../../models/projeto.model';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ProjetoService} from '../../../services/projeto.service';

@Component({
  selector: 'app-atividade-create',
  templateUrl: './atividade-create.component.html',
  styleUrls: ['./atividade-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AtividadeCreateComponent implements OnInit, OnDestroy {

  @ViewChild('chipInput') chipInput: MatInput;
  atividadeForm: FormGroup;
  private formSubmit: boolean;
  idprojeto: number;
  chips: Funcionario[] = [];
  funcionarios: Funcionario[] = [];
  paramsSubscription: Subscription;
  projFuncId: FormControl;
  minDateInicial: Date;
  projeto: Projeto;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private adapter: DateAdapter<any>,
              private funcionarioService: FuncionarioService,
              private atividadeService: ProjetoatividadeService,
              private projetoService: ProjetoService
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.idprojeto = this.activatedRoute.snapshot.params['id'];

    this.projetoService.findByProjId(this.idprojeto)
      .subscribe(projeto => {
        this.projeto = projeto;
        this.minDateInicial = projeto.projDataInicial;
      });

    this.paramsSubscription = this.projFuncId.valueChanges
      .startWith('')
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(nameSearch =>
        this.funcionarioService.listFuncionariosByName(nameSearch)
          .catch(error => Observable.from([])))
      .subscribe(funcionarios => {

        const funcTemp: Funcionario[] = [];

        if (this.chips.length > 0) {
          funcionarios.forEach(element => {
            let result = false;
            this.chips.forEach(chip => {
              if (chip.funcId === element.funcId) result = true;
            });
            if (!result) {
              funcTemp.push(element);
            }
          });
          this.funcionarios = funcTemp;
        } else {
          this.funcionarios = funcionarios;
        }
      });
  }

  initForm() {
    this.projFuncId = this.fb.control('', [Validators.required]);
    this.atividadeForm = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      data_inicial: this.fb.control('', [Validators.required]),
      data_final: this.fb.control('', [Validators.required]),
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.atividadeForm.get(field).valid && this.atividadeForm.get(field).touched));
  }


  displayFuncionario(funcionario?: Funcionario): string | undefined {
    return funcionario ? funcionario.funcNome : undefined;
  }

  salvarAtividade(atividade: Projetoatividade) {
    atividade.membros = (this.chips);
    let projeto = new Projeto();
    projeto.projId = this.idprojeto;
    atividade.projeto = projeto;

    this.atividadeService.create(atividade)
      .subscribe(() => this.notificationService.notify(`Atividade adicionada com sucesso`),
        response => // HttpErrorResponse
          this.notificationService.notify('Erro ao cadastrar nova atividade'),
        () => {
          this.router.navigate(['/projeto-detail'],
            {queryParams: {id: this.idprojeto}, skipLocationChange: false});
        });
  }


  remove(chip: Funcionario): void {
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips.splice(index, 1);
    }
    this.chipInput['nativeElement'].blur();
  }

  /*adiciona funcionário a atividade a ser criada se ainda não foi adicionado */
  addFuncionario(event: MatAutocompleteSelectedEvent): void {

    const t: Funcionario = event.option.value;

    const FuncResult = this.chips.filter((funcionario) => funcionario.funcId === t.funcId);

    if (Object.keys(FuncResult).length === 0) {
      const nomes = t.funcNome.split(' ');
      t.funcNome = nomes[0] + ' ' + nomes[nomes.length - 1];
      this.chips.push(t);
    }
    this.chipInput['nativeElement'].blur();
  }

  /* Verifica se o período é válido
* */
  validaPrazo(event: MatDatepickerInputEvent<Date>) {

    if (this.atividadeForm.get('data_inicial').value && !this.atividadeForm.get('data_final').value) {

      this.minDateInicial = new Date(this.atividadeForm.get('data_inicial').value);

    } else if (this.atividadeForm.get('data_inicial').value
      && this.atividadeForm.get('data_final').value
      && this.atividadeForm.get('data_inicial').value > this.atividadeForm.get('data_final').value) {

      this.minDateInicial = new Date(this.atividadeForm.get('data_inicial').value);
      this.atividadeForm.get('data_final').reset();
    }
  }

  /* voltar para projeto detail */
  cancelar() {
    this.router.navigate(['/projeto-detail/'],
      {
        queryParams: {
          id: this.idprojeto,
        },
        skipLocationChange: false,
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
