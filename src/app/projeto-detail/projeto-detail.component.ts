import {Component, OnInit, Input} from '@angular/core';
import {ProjetoService} from '../projetos/projeto/projeto.service';
import {Projeto} from '../projetos/projeto/projeto.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-projeto-detail',
  templateUrl: './projeto-detail.component.html',
  styleUrls: ['./projeto-detail.component.scss']
})
export class ProjetoDetailComponent implements OnInit {

  projeto: Projeto;

  constructor(private projetoService: ProjetoService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.projetoService.findByProjId(this.activatedRoute.snapshot.params['id'])
      .subscribe(projeto => this.projeto = projeto);
  }

}
