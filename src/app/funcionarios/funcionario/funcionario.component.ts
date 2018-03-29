import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Funcionario} from '../../models/funcionario.model';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})
export class FuncionarioComponent implements OnInit {


  @Input() funcionario: Funcionario;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }


  goToUsuarioDetail() {
    this.router.navigate(['/funcionario-detail/', this.funcionario.funcFuncId]);
  }

}
