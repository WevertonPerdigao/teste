import {Component, OnInit,} from '@angular/core';
import {FuncionarioService} from '../services/funcionario.service';
import {Funcionario} from '../models/funcionario.model';
import {Router} from '@angular/router';
import {ToolbarService} from '../services/toolbar.service';


@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {

  public funcionarios: Funcionario[];
  dataSearch = '';

  constructor(private funcionarioService: FuncionarioService,
              private router: Router,
              private toolbarService: ToolbarService) {
  }

  ngOnInit() {
    this.getListFuncionarios();
    this.toolbarService.dataSearch$.subscribe((data) => {
      this.dataSearch = data; // And he have data here too!
      this.getListFuncionarios();
    });

  }


  getListFuncionarios() {
    this.funcionarioService.listFuncionariosByName(this.dataSearch).subscribe(funcionarios => this.funcionarios = funcionarios);
  }

  /* Redireciona para tela de detalhe do usuário com id do funcionário
  * */
  redirectFuncionarioDetail(funcionario: Funcionario) {
    this.router.navigate(['/funcionario-detail'],
      {queryParams: {funcId: funcionario.funcId}, skipLocationChange: true});
  }

  redirectFuncionarioCreate() {
    this.router.navigate(['/funcionario-create']);
  }

}

