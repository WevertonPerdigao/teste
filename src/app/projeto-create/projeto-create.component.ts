import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../services/notification.service';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-projeto-create',
  templateUrl: './projeto-create.component.html',
  styleUrls: ['./projeto-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjetoCreateComponent implements OnInit {

  projetoForm: FormGroup;
  private formSubmit: boolean;
  navigateTo: string;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private router: Router) {
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
