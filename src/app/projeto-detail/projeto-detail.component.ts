import {Component, OnInit, Input} from '@angular/core';
import {ProjetoService} from '../projetos/projeto/projeto.service';
import {Projeto} from '../projetos/projeto/projeto.model';
import {ActivatedRoute} from '@angular/router';
import {Utils} from '../utils/utils';

@Component({
  selector: 'app-projeto-detail',
  templateUrl: './projeto-detail.component.html',
  styleUrls: ['./projeto-detail.component.scss']
})
export class ProjetoDetailComponent implements OnInit {

  public projeto: Projeto = new Projeto();
  qtdDiasProjeto = 0;
  qtdDiasUtilizados = 0;
  percCronogramaUtilizado = 0;


  constructor(private projetoService: ProjetoService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.projetoService.findByProjId(this.activatedRoute.snapshot.params['id'])
      .subscribe(projeto => {
        this.projeto = projeto;
        this.setPropertyCronograma();
      });
  }


  setPropertyCronograma() {
    this.calcQtdeDiasProjeto(this.projeto.projDataInicial, this.projeto.projDataFinal);
    this.calcQtdeDiasConcluidos(this.projeto.projDataInicial);
    this.calcCronogramaByProjeto();
  }

  calcQtdeDiasProjeto(dtinicio: Date, dtfim: Date) {
    this.qtdDiasProjeto = Utils.getQtdDayByDtinicialAndDtFinal(dtinicio, dtfim);
  }

  calcQtdeDiasConcluidos(dtinicio: Date) {
    if (new Date() < dtinicio) {
      this.qtdDiasUtilizados = 0;
    } else {
      this.qtdDiasUtilizados = Utils.getQtdDayByDtinicialAndDtFinal(dtinicio, new Date());
    }
  }


  calcCronogramaByProjeto() {
    if (this.qtdDiasUtilizados !== 0 && this.qtdDiasUtilizados > this.qtdDiasProjeto) {
      this.percCronogramaUtilizado = 100; // projeto atrasado
    } else if (this.qtdDiasUtilizados !== 0) {
      this.percCronogramaUtilizado = Utils.getPercent(this.qtdDiasUtilizados, this.qtdDiasProjeto);
    }
  }
}

