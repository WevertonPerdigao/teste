import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-projeto-equipe',
  templateUrl: './projeto-equipe.component.html',
  styleUrls: ['./projeto-equipe.component.scss']
})
export class ProjetoEquipeComponent implements OnInit {

  @Input() equipe: any;

  constructor() {
  }

  ngOnInit() {

  }

}
