import {Component, OnInit, Input} from '@angular/core';
import {ProjetoDispendio} from '../../../models/projetodispendio.model';

@Component({
  selector: 'app-resumo-dispendios',
  templateUrl: './resumo-dispendios.component.html',
  styleUrls: ['./resumo-dispendios.component.scss']
})
export class ResumoDispendiosComponent implements OnInit {


  @Input() dispendios: ProjetoDispendio[];
  constructor() {
  }

  ngOnInit() {
  }
}
