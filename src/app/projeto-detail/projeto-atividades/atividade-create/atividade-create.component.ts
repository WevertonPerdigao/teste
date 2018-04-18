import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../services/notification.service';
import {ViewEncapsulation} from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import {FuncionarioService} from '../../../services/funcionario.service';
import {Funcionario} from '../../../models/funcionario.model';
import {ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatInput} from '@angular/material';
import {Projetoatividade} from '../../../models/projetoatividade.model';
import {ProjetoatividadeService} from '../../../services/projetoatividade.service';
import {Projeto} from '../../../models/projeto.model';

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
  navigateTo: string;
  idprojeto: number;

  chips: Funcionario[] = [];
  funcionarios: Funcionario[] = [];


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
    this.idprojeto = this.activatedRoute.snapshot.params['id'];

    this.atividadeForm = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      data_inicial: this.fb.control('', [Validators.required]),
      data_final: this.fb.control('', [Validators.required]),
    });

    this.funcionarioService.listAllFuncionarios()
      .subscribe(funcionarios => this.funcionarios = funcionarios);
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

  addFuncionario(event: MatAutocompleteSelectedEvent): void {
    const t: Funcionario = event.option.value;
    this.chips.push(t);
    this.chipInput['nativeElement'].blur();
  }


}
