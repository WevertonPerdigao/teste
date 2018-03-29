import {Component, OnInit, Input} from '@angular/core';
import {Projeto} from '../../../models/projeto.model';
import {Utils} from '../../../utils/utils';


@Component({
  selector: 'app-projeto-cronograma',
  templateUrl: './projeto-cronograma.component.html',
  styleUrls: ['./projeto-cronograma.component.scss']
})
export class ProjetoCronogramaComponent implements OnInit {

  @Input() projeto: Projeto;
  @Input() diasProjeto: number;
  @Input() diasEmUso: number;
  @Input() percCronograma: number;

  constructor() {
  }

  ngOnInit() {
  }


}
