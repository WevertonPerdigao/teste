import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-projeto-orcamento',
  templateUrl: './projeto-orcamento.component.html',
  styleUrls: ['./projeto-orcamento.component.scss']
})
export class ProjetoOrcamentoComponent implements OnInit {

  @Input() valorTotal;
  @Input() custoTotal;

   ngOnInit() {
    }

}
