import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../services/notification.service';
import {ViewEncapsulation} from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import {FuncionarioService} from '../../../services/funcionario.service';
import {Funcionario} from '../../../models/funcionario.model';
import {ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatInput} from '@angular/material';
import {Projetoatividade} from '../../../models/projetoatividade.model';
import {ProjetoatividadeService} from '../../../services/projetoatividade.service';
import {Projeto} from '../../../models/projeto.model';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

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
  navigateTo: string;
  idprojeto: number;
  chips: Funcionario[] = [];
  funcionarios: Funcionario[] = [];
  paramsSubscription: Subscription;
  projFuncId: FormControl;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private adapter: DateAdapter<any>,
              private funcionarioService: FuncionarioService,
              private atividadeService: ProjetoatividadeService
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.idprojeto = this.activatedRoute.snapshot.params['id'];
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
    this.atividadeForm = this.fb.group({
      projFuncId: this.projFuncId,
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

    atividade.pratAtividadeMembro = (this.chips);
    let projeto = new Projeto();
    projeto.projId = this.idprojeto;
    atividade.projeto = projeto;

    this.atividadeService.create(atividade)
      .subscribe(() => this.notificationService.notify(`Atividade adicionada com sucesso`),
        response => // HttpErrorResponse
          this.notificationService.notify(response.error.message),
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
