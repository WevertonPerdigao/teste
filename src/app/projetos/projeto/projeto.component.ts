import {Component, Input, OnInit} from '@angular/core';
import {Projeto} from './projeto.model';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit {


  @Input() projeto: Projeto;

  constructor() { }

  ngOnInit() {
  }

}
