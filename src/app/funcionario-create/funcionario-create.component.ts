import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Funcionario} from '../models/funcionario.model';
import {FuncionarioService} from '../services/funcionario.service';
import {PerfilService} from '../services/perfil.service';
import {Perfil} from '../models/perfil.model';
import {NotificationService} from '../services/notification.service';
import {Router} from '@angular/router';
import {Cargo} from '../models/cargo.model';
import {CargoService} from '../services/cargo.service';
import {ErrorStateMatcherImp} from '../utils/ErrorStateMatcher';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-funcionario-create',
  templateUrl: './funcionario-create.component.html',
  styleUrls: ['./funcionario-create.component.scss']
})
export class FuncionarioCreateComponent implements OnInit {

  perfils: Perfil[] = [];
  cargos: Cargo[] = [];
  funcionarioForm: FormGroup;
  errorMatcher = new ErrorStateMatcherImp();

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private router: Router,
              private perfilService: PerfilService,
              private funcionarioService: FuncionarioService,
              private cargoService: CargoService) {
  }

  ngOnInit() {
    this.funcionarioForm = this.fb.group({
      funcPerfId: this.fb.control('', []),
      funcCargId: this.fb.control('', []),
      funcNome: this.fb.control('', [Validators.required]),
      funcEmail: this.fb.control('', [Validators.required, Validators.email]),
      funcSenha: this.fb.control('', [Validators.required])
    });

    this.perfilService.listAllPerfil()
      .subscribe(perfils => this.perfils = perfils);

    this.cargoService.listAllCargo()
      .subscribe(cargos => this.cargos = cargos);
  }

  isFieldInvalid(field: string) {
    return (
      (!this.funcionarioForm.get(field).valid && this.funcionarioForm.get(field).touched));
  }

  getErrorMessage() {
    return this.funcionarioForm.get('funcEmail').hasError('required') ? 'Informe um e-mail' :
      this.funcionarioForm.get('funcEmail').hasError('incorrect') ? 'E-mail já cadastrado' :
        this.funcionarioForm.get('funcEmail') ? 'Informe um e-mail válido' : '';
  }


  onSearchChange(searchValue: string) {

    this.funcionarioService.findFuncionarioByEmail(searchValue)
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(funcionario => {
        if (funcionario) {
          this.funcionarioForm.get('funcEmail').setErrors({'incorrect': true});
          console.log('já existe');
        }
      });
  }

  onSubmit(funcionario: Funcionario) {

    this.funcionarioService.create(funcionario)
      .subscribe(() => this.notificationService.notify(`Funcionário criado com sucesso`),
        response => // HttpErrorResponse
          this.notificationService.notify(response.error.message),
        () => {
          this.router.navigate(['funcionarios']);
        });
  }
}
