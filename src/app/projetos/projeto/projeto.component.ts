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
  situacao: Situacao;

  constructor(private situacaoService: SituacaoService) {
  }

  ngOnInit() {
  }

  totalOrcamento(projId: number): number {
    return 1000;
  }

  getCronogramaByProjeto(): number {

    if (this.projeto.proj_situ_id !== Constants.INATIVO) {

      if (this.projeto.projDataInicial && this.projeto.projDataFinal) {

        return this.calcPercentCronograma(this.projeto.projDataInicial, this.projeto.projDataFinal);

      } else if (this.projeto.projDataInicial && !this.projeto.projDataFinal) {

        return this.calcPercentCronograma(this.projeto.projDataInicial, this.projeto.projPrevDataFinal);

      } else if (this.projeto.projPrevDataInicial && this.projeto.projPrevDataFinal) {

        return this.calcPercentCronograma(this.projeto.projPrevDataInicial, this.projeto.projPrevDataFinal);

      } else {
        return 0;
      }

    } else {

      return 0;

    }
  }

  calcPercentCronograma(dtinicio: Date, dtfim: Date): number {


    const qtdeDiasTotalProj = Utils.getQtdDayByDtinicialAndDtFinal(dtinicio, dtfim);

    const qtdeDayAtualProj = Utils.getQtdDayByDtinicialAndDtFinal(dtinicio, new Date());

    return Utils.getPercent(qtdeDayAtualProj, qtdeDiasTotalProj);

  }


}
