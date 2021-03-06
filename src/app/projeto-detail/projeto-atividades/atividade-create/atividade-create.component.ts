import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
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
// import {ErrorStateMatcherImp} from '../../../utils/ErrorStateMatcher';
import {ToolbarService} from '../../../services/toolbar.service';
import {Constants} from '../../../utils/constants';
import {Utils} from '../../../utils/utils';
import {noWhiteSpaceValidator} from '../../../utils/noWhiteSpaceValidator';

@Component({
  selector: 'app-atividade-create',
  templateUrl: './atividade-create.component.html',
  styleUrls: ['./atividade-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AtividadeCreateComponent implements OnInit {

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
  listMembros: Funcionario[] = [];
  validatorWhiteSpace = new noWhiteSpaceValidator();

  // errorMatcher = new ErrorStateMatcherImp();

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private adapter: DateAdapter<any>,
              private funcionarioService: FuncionarioService,
              private atividadeService: ProjetoatividadeService,
              private projetoService: ProjetoService,
              private toolbarService: ToolbarService
  ) {
  }

  ngOnInit() {
    // manipula evento do botão salvar da barra de ferramentas
    this.toolbarService.action$.subscribe(() => this.salvarAtividade());

    this.initForm();
    this.paramsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.idprojeto = params['id'];
    });

    this.configRouteBack();
    this.projetoService.findByProjId(this.idprojeto)
      .subscribe(projeto => {
        this.projeto = projeto;
        this.minDateInicial = projeto.projDataInicial;
      });

    this.projetoService.listFuncionariosByProjeto(this.idprojeto)
      .subscribe(funcionarios =>
        this.listMembros = funcionarios);
  }

  initForm() {
    this.projFuncId = this.fb.control('', [Validators.required]);
    this.atividadeForm = this.fb.group({
      nome: this.fb.control('', [Validators.required, this.validatorWhiteSpace.validWhiteSpace]),
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

  salvarAtividade() {
    if (this.atividadeForm.valid) {
      const atividade = this.atividadeForm.value;

      atividade.membros = (this.chips);
      const projeto = new Projeto();
      projeto.projId = this.idprojeto;
      atividade.projeto = projeto;

      this.atividadeService.create(atividade)
        .subscribe(() => this.notificationService.notify(`Atividade adicionada com sucesso`),
          response => // HttpErrorResponse
            this.notificationService.notify('Erro ao cadastrar nova atividade'),
          () => {
            this.router.navigate(['/projeto-detail'],
              {queryParams: {id: this.idprojeto}, skipLocationChange: true});
          });
    } else {
      this.notificationService.notify('Preencha o formulário corretamente');
      Utils.validateAllFormFields(this.atividadeForm);
    }
  }


  remove(chip: Funcionario): void {
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips.splice(index, 1);
      this.listMembros.push(chip);
    }
  }

  /*adiciona funcionário a atividade a ser criada se ainda não foi adicionado */
  addFuncionario(t: Funcionario): void {
    const nomes = t.funcNome.split(' ');
    t.funcNome = nomes[0] + ' ' + nomes[nomes.length - 1];
    this.chips.push(t);

    this.listMembros.splice(this.listMembros.indexOf(t), 1);
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
          indextab: Constants.TAB_ATIVIDADES
        },
        skipLocationChange: true,
      });
  }

  configRouteBack() {
    const params: NavigationExtras = {queryParams: {id: this.idprojeto, indextab: Constants.TAB_ATIVIDADES}, skipLocationChange: true};
    this.toolbarService.setRouteBack('/projeto-detail', params);
  }

}
