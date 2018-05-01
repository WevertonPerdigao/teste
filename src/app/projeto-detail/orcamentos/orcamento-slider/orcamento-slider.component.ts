import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-orcamento-slider',
  templateUrl: './orcamento-slider.component.html',
  styleUrls: ['./orcamento-slider.component.scss']
})
export class OrcamentoSliderComponent implements OnInit {

  @Input() valorTotal;
  @Input() custoTotal;
  @Input() percOrcamento;

  constructor() {
    console.log('init constructor');
  
  }

  ngOnInit() {
    console.log('init OrcamentoSliderComponent');
  }

}
