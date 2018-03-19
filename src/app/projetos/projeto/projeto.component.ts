import {Component, Input, OnInit} from '@angular/core';
import {Projeto} from './projeto.model';
import {Situacao} from '../../situacao/situacao.model';
import {SituacaoService} from '../../situacao/situacao.service';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit {

  @Input() projeto: Projeto;
  situacao: Situacao;

  constructor(private situacaoService: SituacaoService) {
  }

  ngOnInit() {
  }

  totalOrcamento(projId: number): number {
    return 1000;
  }
}
