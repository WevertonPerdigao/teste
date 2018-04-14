import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../services/notification.service';
import {DateAdapter} from '@angular/material/core';
import {Projeto} from '../../../models/projeto.model';
import {TipodispendioService} from '../../../services/tipodispendio.service';
import {Tipodispendio} from '../../../models/tipodispendio.model';
import {ProjetoDispendio} from '../../../models/projetodispendio.model';
import {ProjetoDispendioService} from '../../../services/projetodispendio.service';

@Component({
  selector: 'app-dispendio-create',
  templateUrl: './dispendio-create.component.html',
  styleUrls: ['./dispendio-create.component.scss'],
})

export class DispendioCreateComponent implements OnInit {


  dispendioForm: FormGroup;
  private formSubmit: boolean;
  navigateTo: string;
  idprojeto: number;

  tiposdispendios: Tipodispendio[] = [];

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private adapter: DateAdapter<any>,
              private tipodispendioService: TipodispendioService,
              private projetoDispendioService: ProjetoDispendioService
  ) {
  }

  ngOnInit() {
    this.idprojeto = this.activatedRoute.snapshot.params['id'];
    this.dispendioForm = this.fb.group({
      prdiTidiId: this.fb.control('', [Validators.required]),
      prdiJustificativa: this.fb.control('', [Validators.required]),
      prdiTituloFatura: this.fb.control('', [Validators.required]),
      prdiDescricao: this.fb.control('', [Validators.required]),
      prdiNotaFiscal: this.fb.control('', [Validators.required]),
      prdiDataNotaFiscal: this.fb.control('', [Validators.required]),
      prdiDataPagamento: this.fb.control('', [Validators.required]),
      prdiAnexoId: this.fb.control('', []),
      prdiValor: this.fb.control('', [Validators.required]),
    });

    this.tipodispendioService.listAll()
      .subscribe(tiposdispendios => this.tiposdispendios = tiposdispendios);
  }

  isFieldInvalid(field: string) {
    return (
      (!this.dispendioForm.get(field).valid && this.dispendioForm.get(field).touched));
  }


  displayTipoDispendio(tipodispendio?: Tipodispendio): string | undefined {
    return tipodispendio ? tipodispendio.tidiNome : undefined;
  }

  salvarDispendio(projetoDispendio: ProjetoDispendio) {

    let projeto = new Projeto();
    projeto.projId = this.idprojeto;
    projetoDispendio.prdiProjId = projeto;

    console.log('dispendio JSON => ' + JSON.stringify(projetoDispendio));

    this.projetoDispendioService.createProjetoDispendio(projetoDispendio)
      .subscribe(() => this.notificationService.notify(`Dispêndio adicionado com sucesso`),
        response => // HttpErrorResponse
          this.notificationService.notify(response.error.message),
        () => {
          this.router.navigate(['projetos']);
        });
  }
}
