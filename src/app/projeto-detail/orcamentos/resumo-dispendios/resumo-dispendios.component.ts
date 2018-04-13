import {Component, OnInit, Input} from '@angular/core';
import {Tipodispendio} from '../../../models/tipodispendio.model';
import {Observable} from 'rxjs/Observable';
import {ProjetoDispendio} from '../../../models/projetodispendio.model';

@Component({
  selector: 'app-resumo-dispendios',
  templateUrl: './resumo-dispendios.component.html',
  styleUrls: ['./resumo-dispendios.component.scss']
})
export class ResumoDispendiosComponent implements OnInit {


  @Input() tiposDispendiosValor: Observable<Tipodispendio[]>;

  listaDispendio: Tipodispendio[] = [];
  listaTipoDispendioValor: any[] = [];
  listaTipoDispendioNome: any[] = [];
  color = ['#F44336', '#8BC34A', '#FFC107', '#00BCD4', '#9C27B0', '#607D8B', '#9E9E9E', '#FFB74D',
    '#F44336', '#8BC34A', '#FFC107', '#00BCD4', '#9C27B0', '#607D8B', '#9E9E9E', '#FFB74D'];


  chartColors: Array<any> = [];


  constructor() {

  }

  ngOnInit() {
    this.tiposDispendiosValor.subscribe(
      disppendios => {
        this.listaDispendio = disppendios;
        this.setParamGrafico(disppendios);
      }
    );
  }


  setParamGrafico(dispendios: Tipodispendio[]) {
    for (const i in  dispendios) {
      console.log('valor retornado ' + dispendios);
      this.listaTipoDispendioNome.push(dispendios[i].tidiNome);
      this.listaTipoDispendioValor.push(dispendios[i].total);
    }
    this.chartColors = [{
      backgroundColor: this.color.slice(0, this.listaTipoDispendioNome.length - 1)
    }];
  }

}
