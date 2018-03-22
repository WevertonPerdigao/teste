import {Component, Input, DoCheck, OnInit} from '@angular/core';
import {Projeto} from './projeto.model';
import {SituacaoService} from '../../situacao/situacao.service';
import {Utils} from '../../utils/utils';
import {Vwprojetovalor} from '../../projeto-valor/vwprojetovalor.model';
import {VwprojetovalorService} from '../../projeto-valor/vwprojetovalor.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit {

  @Input() projeto: Projeto;
  @Input() vwProjetoValor: Vwprojetovalor;


  constructor(private situacaoService: SituacaoService,
              private vwProjetoValorService: VwprojetovalorService,
              private router: Router,) {
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

    return Utils.getPercent(qtdeDayAtualProj, qtdeDiasTotalProj);
  }


  goToProjectDetail() {
    console.log('teste click');
    this.router.navigate([`/projeto-detail/${this.projeto.projId}`]);
  }
}
