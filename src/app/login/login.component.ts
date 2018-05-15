import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {Login} from '../models/login.model';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../services/notification.service';
import {ApplicationErrorHandler} from '../app.error-handler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private formSubmit: boolean;
  navigateTo: string;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      senha: this.fb.control('', [Validators.required])
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).toString().replace(/\s/g, '') === '') ||
      (this.loginForm.get(field).untouched && this.formSubmit)
    );
  }

  getErrorMessage() {
    return this.loginForm.get('email').hasError('required') ? 'Informe um e-mail' :
      this.loginForm.get('email') ? 'Informe um e-mail válido' :
        '';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(new Login(this.loginForm.value.email, this.loginForm.value.senha))
        .subscribe(funcionario => this.notificationService.notify(`Olá, ${funcionario.funcNome}`),
          (error) => this.notificationService.notify(`O e-mail ou senha está incorreto`)
        );
    } else {
      this.notificationService.notify(`O e-mail ou senha está incorreto`);
    }
  }

}
