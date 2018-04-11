import {Component, OnInit, Input} from '@angular/core';
import {ProjetoService} from '../services/projeto.service';
import {Projeto} from '../models/projeto.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Utils} from '../utils/utils';
import {ProjetoDispendioService} from '../services/projetodispendio.service';
import 'rxjs/add/observable/forkJoin';
import {MatTabChangeEvent} from '@angular/material';

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
              private projetoDispendioService: ProjetoDispendioService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.projetoService.findByProjId(this.activatedRoute.snapshot.params['id'])
      .subscribe(projeto => {
        this.projeto = projeto;
        this.setPropertyCronograma();
      });
  }

  onLinkClick(event: MatTabChangeEvent) {
    console.log('onLinkClick');
    switch (event.index) {
      case 2:
        console.log('case 2');
      // this.router.navigate(['../atividades'], {relativeTo: this.activatedRoute}); não funcionando
    }
  }

  setPropertyCronograma() {
    this.calcQtdeDiasProjeto(this.projeto.projDataInicial, this.projeto.projDataFinal);
    this.calcQtdeDiasConcluidos(this.projeto.projDataInicial);
    this.calcPercentCronograma();
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

  calcPercentCronograma() {
    if (this.qtdDiasUtilizados !== 0 && this.qtdDiasUtilizados > this.qtdDiasProjeto) {
      this.percCronogramaUtilizado = 100; // projeto atrasado
    } else if (this.qtdDiasUtilizados !== 0) {
      this.percCronogramaUtilizado = Utils.getPercent(this.qtdDiasUtilizados, this.qtdDiasProjeto);
    }
  }

  findProjetoValorByProjId(): void {
    console.log('findProjetoValorByProjId');
  }

}

