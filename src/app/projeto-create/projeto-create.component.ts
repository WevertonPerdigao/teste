import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../services/notification.service';
import {ViewEncapsulation} from '@angular/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
@Component({
  selector: 'app-projeto-create',
  templateUrl: './projeto-create.component.html',
  styleUrls: ['./projeto-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class ProjetoCreateComponent implements OnInit {

  projetoForm: FormGroup;
  private formSubmit: boolean;
  navigateTo: string;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private router: Router,
              private adapter: DateAdapter<any>) {

  }

  ngOnInit() {
    this.projetoForm = this.fb.group({
      projNome: this.fb.control('', [Validators.required, Validators.email]),
      projDataInicial: this.fb.control('', [Validators.required]),
      projDataFinal: this.fb.control('', [Validators.required]),
      projResponsavel: this.fb.control('', [Validators.required]),
      projTipos: this.fb.control('', [Validators.required]),
      projValor: this.fb.control(0, [Validators.required])
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.projetoForm.get(field).valid && this.projetoForm.get(field).touched) ||
      (this.projetoForm.get(field).untouched && this.formSubmit)
    );
  }

  onSubmit() {
    console.log('Olá projetos');
  }


}
