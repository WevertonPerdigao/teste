import {AfterContentChecked, Component, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Funcionario} from '../models/funcionario.model';
import {FuncionarioService} from '../services/funcionario.service';
import {PerfilService} from '../services/perfil.service';
import {Perfil} from '../models/perfil.model';
import {NotificationService} from '../services/notification.service';
import {Router} from '@angular/router';
import {Cargo} from '../models/cargo.model';
import {CargoService} from '../services/cargo.service';
// import {ErrorStateMatcherImp} from '../utils/ErrorStateMatcher';
import {Observable} from 'rxjs/Observable';
import {ToolbarService} from '../services/toolbar.service';
import {noWhiteSpaceValidator} from '../utils/noWhiteSpaceValidator';
import {Utils} from '../utils/utils';

@Component({
  selector: 'app-funcionario-create',
  templateUrl: './funcionario-create.component.html',
  styleUrls: ['./funcionario-create.component.scss']
})
export class FuncionarioCreateComponent implements OnInit {

  perfils: Perfil[] = [];
  cargos: Cargo[] = [];
  funcionarioForm: FormGroup;
  validatorWhiteSpace = new noWhiteSpaceValidator();

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private router: Router,
              private perfilService: PerfilService,
              private funcionarioService: FuncionarioService,
              private cargoService: CargoService,
              private toolbarService: ToolbarService) {
  }

  ngOnInit() {
    // manipula evento do botão criar da barra de ferramentas
    this.toolbarService.action$.subscribe(() => this.onSubmit());

    this.configRouteBack();

    this.funcionarioForm = this.fb.group({
      funcPerfId: this.fb.control('', [Validators.required]),
      funcCargId: this.fb.control('', [Validators.required]),
      funcNome: this.fb.control('', [Validators.required, this.validatorWhiteSpace.validWhiteSpace]),
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
      this.funcionarioForm.get('funcEmail').hasError('errojaexiste') ? 'E-mail já cadastrado' :
        this.funcionarioForm.get('funcEmail') ? 'Informe um e-mail válido' : '';
  }


  onSubmit() {
    if (this.funcionarioForm.valid) {
      const funcionario = this.funcionarioForm.value;
      this.funcionarioService.create(funcionario)
        .subscribe(() => this.notificationService.notify(`Funcionário criado com sucesso`),
          response => // HttpErrorResponse
            this.notificationService.notify(response.error.message),
          () => {
            this.router.navigate(['usuarios']);
          });
    } else {
      this.notificationService.notify('Preencha o(s) campo(s) corretamente');
      Utils.validateAllFormFields(this.funcionarioForm);
    }
  }

  onSearchChange(searchValue: string) {

    this.funcionarioService.findFuncionarioByEmail(searchValue)
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(funcionario => {
        if (funcionario) {
          this.funcionarioForm.get('funcEmail').setErrors({'errojaexiste': true});
        }
      });
  }

  configRouteBack() {
    this.toolbarService.setRouteBack('/usuarios');
  }

}
