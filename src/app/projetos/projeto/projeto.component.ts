import {Component, Input, OnInit} from '@angular/core';
import {Projeto} from '../../models/projeto.model';
import {SituacaoProjetoService} from '../../services/situacaoprojeto.service';
import {Utils} from '../../utils/utils';
import {Router} from '@angular/router';


@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit {

  @Input() projeto: Projeto;


  constructor(private situacaoService: SituacaoProjetoService,
                  private router: Router) {
  }

  ngOnInit() {
  }


  getCronogramaByProjeto(): number {
    if (this.projeto.projDataInicial && this.projeto.projDataFinal) {
      return this.calcPercentCronograma(this.projeto.projDataInicial, this.projeto.projDataFinal);
    }
  }

  calcPercentCronograma(dtinicio: Date, dtfim: Date): number {

    const qtdeDiasTotalProj = Utils.getQtdDayByDtinicialAndDtFinal(dtinicio, dtfim);

    const qtdeDayAtualProj = Utils.getQtdDayByDtinicialAndDtFinal(dtinicio, new Date());

    if (qtdeDayAtualProj > qtdeDiasTotalProj) {
      return 100;
    } else {
      return Utils.getPercent(qtdeDayAtualProj, qtdeDiasTotalProj);
    }
  }


  goToProjectDetail() {
    this.router.navigate(['/projeto-detail/', this.projeto.projId]);
  }
}
