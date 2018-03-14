import {Injectable} from '@angular/core';
import {Usuario} from '../../usuarios/usuario/usuario.model';
import {Menu} from './menu.model';

@Injectable()
export class MenuService {
  listMenu: Menu[] = [{nome: 'Projetos', url: 'projetos'},
    {nome: 'Usuários', url: 'usuarios'},
    {nome: 'Orçamentos', url: 'orcamento'},
    {nome: 'Relatórios', url: 'relatorio'}
  ];

  constructor() {
  }

  listMenuByUsuario(usuario?: Usuario): Menu[] {
    return this.listMenu;
  }

  clear() {
    this.listMenu = [];
  }
}
