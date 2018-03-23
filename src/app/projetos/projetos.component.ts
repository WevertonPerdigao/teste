import {Component, Injectable, OnInit} from '@angular/core';
import {ProjetoService} from './projeto/projeto.service';
import {UsuarioService} from '../usuarios/usuario/usuario.service';
import {Vwprojetovalor} from '../projeto-valor/vwprojetovalor.model';
import {VwprojetovalorService} from './../projeto-valor/vwprojetovalor.service';
import {inject} from '@angular/core/src/render3';
import {Projeto} from './projeto/projeto.model';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})

export class ProjetosComponent implements OnInit {

  public projetos: Projeto[];
  public usuario;

  constructor(private projetoService: ProjetoService,
              private usuarioService: UsuarioService,
              private vwProjetovalorService: VwprojetovalorService) {
  }

  ngOnInit() {
    this.getPrimeiroUsuario();
    this.getListProjetos();

  }

  getListProjetos() {
    this.projetoService.listProjetos().subscribe(projetos => this.projetos = projetos);

  }

  getListProjetosByUsuario() {
    this.projetoService.listProjetos().subscribe(projetos => this.projetos = projetos);

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

  getProjetoValor(projId: number): any {
    console.log('Chamosu sfdsfsdfd');
    this.vwProjetovalorService.getProjetoValorByProjId(projId).subscribe(
      data => {
        return data;
      },
      err => console.error(err),
      () => console.log('done loading getProjetoValorByProjId')
    );
  }


}
