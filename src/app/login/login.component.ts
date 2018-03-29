import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {Login} from '../models/login.model';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;                    // {1}
  private formSubmit: boolean; // {2}

  constructor(private fb: FormBuilder,         // {3}
              private loginService: LoginService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({     // {5}
      email: this.fb.control('', [Validators.required, Validators.email]),
      senha: this.fb.control('', [Validators.required])
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmit)
    );
  }

  onSubmit() {
    this.loginService.login(new Login(this.loginForm.value.matricula, this.loginForm.value.senha))
      .subscribe(funcionario =>
          this.notificationService.notify(`Bem vindo, ${funcionario.funcNome}`),
        response => //HttpErrorResponse
          this.notificationService.notify(response.error.message),
        () => {
          this.router.navigate([ atob(this.navigateTo)])
        })

  }
}
