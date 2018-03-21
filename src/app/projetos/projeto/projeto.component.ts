import {Component, Input, OnInit} from '@angular/core';
import {Projeto} from './projeto.model';
import {Situacao} from '../../situacao/situacao.model';
import {SituacaoService} from '../../situacao/situacao.service';
import {Utils} from '../../utils/utils';
import {Constants} from '../../utils/constants';
import {Decimal} from 'decimal.js';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit {

  @Input() projeto: Projeto;
  situacao = 'tetse';

  constructor(private situacaoService: SituacaoService) {
  }

  ngOnInit() {
  }


  totalOrcamento(): number {
    console.log('chamou');
    return 1000;
  }

  getCronogramaByProjeto(): number {

    if (this.projeto.projDataInicial && this.projeto.projDataFinal) {

      return this.calcPercentCronograma(this.projeto.projDataInicial, this.projeto.projDataFinal);

    }
  }

  calcPercentCronograma(dtinicio: Date, dtfim: Date): number {

    const qtdeDiasTotalProj = Utils.getQtdDayByDtinicialAndDtFinal(dtinicio, dtfim);

    const qtdeDayAtualProj = Utils.getQtdDayByDtinicialAndDtFinal(dtinicio, new Date());

    return Utils.getPercent(qtdeDayAtualProj, qtdeDiasTotalProj);
  }


}
