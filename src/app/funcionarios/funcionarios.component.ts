import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FuncionarioService} from '../services/funcionario.service';
import {Funcionario} from '../models/funcionario.model';
import {Router} from '@angular/router';


@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {

  public funcionarios: Funcionario[];

  constructor(private funcionarioService: FuncionarioService,
              private router: Router) {
  }

  ngOnInit() {
    this.getListFuncionarios();
  }


  getListFuncionarios() {
    this.funcionarioService.listAllFuncionarios().subscribe(funcionarios => this.funcionarios = funcionarios);
  }

  goToUsuarioDetail(funcionario: Funcionario) {
    this.router.navigate(['/funcionario-detail/', funcionario.funcId]);
  }
}
