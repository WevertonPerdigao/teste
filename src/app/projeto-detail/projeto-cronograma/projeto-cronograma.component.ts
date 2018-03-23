import {Component, OnInit, Input} from '@angular/core';
import {Projeto} from '../../projetos/projeto/projeto.model';
import {Utils} from '../../utils/utils';


@Component({
  selector: 'app-projeto-cronograma',
  templateUrl: './projeto-cronograma.component.html',
  styleUrls: ['./projeto-cronograma.component.scss']
})
export class ProjetoCronogramaComponent implements OnInit {

  @Input() projeto: Projeto;

  constructor() {
  }

  ngOnInit() {
  }


  calcCronogramaByProjeto(dtinicio: Date, dtfinal: Date): number {

    return this.calcPercentCronograma(dtinicio, dtfinal);
  }

  calcPercentCronograma(dtinicio: Date, dtfim: Date): number {

    const qtdeDiasTotalProj = Utils.getQtdDayByDtinicialAndDtFinal(dtinicio, dtfim);

    const qtdeDayAtualProj = Utils.getQtdDayByDtinicialAndDtFinal(dtinicio, new Date());

    if (new Date() < dtinicio) {
      return 0; // projeto nao iniciado
    } else if (qtdeDayAtualProj > qtdeDiasTotalProj) {
      return 100; // projeto atrasado
    } else {
      return Utils.getPercent(qtdeDayAtualProj, qtdeDiasTotalProj);
    }
  }

  calcTotalHorasConcluidas(dtinicio: Date): number {
    console.log('calcTotalHorasConcluidas');
    if (new Date() < dtinicio) {
      return 0;
    } else {
      return Utils.getQtdDayByDtinicialAndDtFinal(dtinicio, new Date());
    }
  }

  calcTotalHorasProjeto(dtinicio: Date, dtfim: Date): number {
    console.log('calcTotalHorasProjeto');
    return Utils.getQtdDayByDtinicialAndDtFinal(dtinicio, dtfim);
  }


}
