import {Component, OnInit} from '@angular/core';
import {ProjetoService} from './projeto/projeto.service';
import {UsuarioService} from '../usuarios/usuario/usuario.service';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent implements OnInit {

  public projetos;
  public usuario;

  constructor(private projetoService: ProjetoService,
              private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.getPrimeiroUsuario();
    this.getListProjetosByUsuario();
  }

  getListProjetosByUsuario() {
    this.projetoService.listProjetosByUserId(this.usuario.usuaId).subscribe(
      data => {
        this.projetos = data;
      },
      err => console.error(err),
      () => console.log('done loading project')
    );
  }

  getPrimeiroUsuario() {
    this.usuarioService.getPrimeiroUsuario().subscribe(
      data => {
        this.usuario = data;
      },
      err => console.error(err),
      () => console.log('done loading getPrimeiroUsuario')
    );
  }

}
