import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../services/notification.service';
import {ViewEncapsulation} from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import {FuncionarioService} from '../services/funcionario.service';
import {Funcionario} from '../models/funcionario.model';
import {ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatInput} from '@angular/material';
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

@Component({
  selector: 'app-projeto-create',
  templateUrl: './projeto-create.component.html',
  styleUrls: ['./projeto-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjetoCreateComponent implements OnInit {

  @ViewChild('chipInput') chipInput: MatInput;
  projetoForm: FormGroup;
  projFuncId: FormControl;
  funcionarios: Funcionario[];
  tipoProjetos: Tipoprojeto[] = [];
  chips: Tipoprojeto[] = [];
  situacaoInicial: SituacaoProjeto = new SituacaoProjeto(1);

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
      projNome: this.fb.control('', [Validators.required]),
      projDataInicial: this.fb.control('', [Validators.required]),
      projDataFinal: this.fb.control('', [Validators.required]),
      projFuncId: this.projFuncId,
      projValor: this.fb.control('', [Validators.required])
    });


    this.projFuncId.valueChanges.debounceTime(500)
      .distinctUntilChanged()
      .switchMap(searchTerm =>
        this.funcionarioService.listAllFuncionarios(searchTerm)
          .catch(error => Observable.from([])))
      .subscribe(funcionarios => this.funcionarios = funcionarios);


    this.tipoprojetoService.listAllTipos()
      .subscribe(tipoProjetos => this.tipoProjetos = tipoProjetos);
  }

  isFieldInvalid(field: string) {
    return (
      (!this.projetoForm.get(field).valid && this.projetoForm.get(field).touched));
  }

  getErrorMessage() {
    if (this.projetoForm.get('projDataInicial') >= this.projetoForm.get('projDataFinal')) {
      return 'Data incial não pode ser maior que a data inicial';
    }

  }

  displayFuncionario(funcionario?: Funcionario): string | undefined {
    return funcionario ? funcionario.funcNome : undefined;
  }

  displayTipo(tipoProjeto?: Tipoprojeto): string | undefined {
    return tipoProjeto ? tipoProjeto.tiprNome : undefined;
  }

  onSubmit(projeto: Projeto) {
    projeto.projSiprId = this.situacaoInicial;
    projeto.projTipos = (this.chips);
    projeto.projEmprId = new Empresa(1);

    console.log('Projeto Formato JSON => ' + JSON.stringify(projeto));

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

  add(event: MatAutocompleteSelectedEvent): void {
    const t: Tipoprojeto = event.option.value;
    this.chips.push(t);
    this.chipInput['nativeElement'].blur();
  }


}
