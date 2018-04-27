import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Tipodispendio} from '../../../models/tipodispendio.model';
import {Observable} from 'rxjs/Observable';
import {ProjetoDispendio} from '../../../models/projetodispendio.model';
import {Constants} from '../../../utils/constants';
import {Funcionario} from '../../../models/funcionario.model';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-resumo-dispendios',
  templateUrl: './resumo-dispendios.component.html',
  styleUrls: ['./resumo-dispendios.component.scss']
})
export class ResumoDispendiosComponent implements OnInit, OnDestroy {


  @Input() tiposDispendiosValor: Observable<Tipodispendio[]>;
  @Input() projId;


  listaDispendio: Tipodispendio[] = [];
  listaTipoDispendioValor: any[] = [];
  listaTipoDispendioNome: any[] = [];
  color = ['#8BC34A', '#FFC107', '#00BCD4', '#9C27B0', '#607D8B', '#9E9E9E', '#FFB74D',
    '#8BC34A', '#FFC107', '#00BCD4', '#9C27B0', '#607D8B', '#9E9E9E', '#FFB74D'];

  chartColors: Array<any> = [];
  paramsSubscription: Subscription;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.paramsSubscription = this.tiposDispendiosValor.subscribe(
      disppendios => {
        this.listaDispendio = disppendios;
        this.setParamGrafico(disppendios);
      }
    );
  }


  setParamGrafico(dispendios: Tipodispendio[]) {
    for (const i in  dispendios) {
      this.listaTipoDispendioNome.push(dispendios[i].tidiNome);
      this.listaTipoDispendioValor.push(dispendios[i].total);
    }
    this.chartColors = [{
      backgroundColor: this.color.slice(0, this.listaTipoDispendioNome.length)
    }];
  }


  /*redireciona para tela de lista de dispêndios do projeto, incializando com os pendentes
*/
  goToListDispendiosByTipo(tipo: number) {
    this.router.navigate(['/list-dispendios'],
      {
        queryParams: {
          id: this.projId,
          tipo: tipo,
          status: Constants.APROVADO,
        }, skipLocationChange: false
      });
  }


  /*redireciona para tela de lista de dispêndios do projeto, incializando com os pendentes
*/
  verTodos() {
    this.router.navigate(['/list-dispendios'],
      {
        queryParams: {
          id: this.projId,
          status: Constants.APROVADO,
        }, skipLocationChange: false
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }


}
