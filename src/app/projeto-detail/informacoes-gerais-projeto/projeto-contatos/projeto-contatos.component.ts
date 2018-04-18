import {Component, OnInit, Input} from '@angular/core';
import {Tipoprojeto} from '../../../models/tipoprojeto.model';
import {Funcionario} from '../../../models/funcionario.model';

@Component({
  selector: 'app-projeto-contatos',
  templateUrl: './projeto-contatos.component.html',
  styleUrls: ['./projeto-contatos.component.scss']
})
export class ProjetoContatosComponent implements OnInit {

  @Input() tipos: Tipoprojeto;
  @Input() responsavel: Funcionario;

  constructor() {
  }

  ngOnInit() {
  }

}
