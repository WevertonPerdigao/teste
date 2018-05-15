import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import {Projetoatividade} from '../../models/projetoatividade.model';
import {ProjetoatividadeService} from '../../services/projetoatividade.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-projeto-atividades',
  templateUrl: './projeto-atividades.component.html',
  styleUrls: ['./projeto-atividades.component.scss']
})
export class ProjetoAtividadesComponent {

  @Input() atividades: Projetoatividade[];
  @Input() projId: number;
  displayedColumns = ['atividade', 'membros', 'prazo'];


  constructor(private projetoatividadeService: ProjetoatividadeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  goToAtividadeCreate() {
    this.router.navigate(['/atividade-create'],
      {queryParams: {id: this.projId}, skipLocationChange: true});

  }

}
