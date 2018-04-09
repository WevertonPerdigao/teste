import {Component, OnInit} from '@angular/core';
import {FuncionarioService} from '../services/funcionario.service';
import {Funcionario} from '../models/funcionario.model';


@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {

  public funcionarios: Funcionario[];

  constructor(private funcionarioService: FuncionarioService) {
  }

  ngOnInit() {
    this.getListFuncionarios();
  }


  getListFuncionarios() {
    this.funcionarioService.listAllFuncionarios().subscribe(funcionarios => this.funcionarios = funcionarios);
  }
}
