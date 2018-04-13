import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ProjetoDispendio} from '../../../models/projetodispendio.model';

@Component({
  selector: 'app-solicitacoes',
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.scss']
})
export class SolicitacoesComponent implements OnInit {

  @Input() dispendiosPendentes: Observable<ProjetoDispendio[]>;

  constructor() {
  }

  ngOnInit() {
  }

}
