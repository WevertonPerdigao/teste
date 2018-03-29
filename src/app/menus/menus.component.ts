import {Component, OnInit} from '@angular/core';
import {MenuService} from './menu/menu.service';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {

  public menus;

  constructor(private menuService: MenuService, private loginService: LoginService) {
  }

  ngOnInit() {
    if (this.loginService.isLoggedIn) {
      this.getListMenus();
    }
  }

  getListMenus() {
    if (this.loginService.isLoggedIn) {

      //   if (this.loginService.usuario.usuaPerfId.perfAcessoCompleto) {
      this.getAllMenus();
      //   }else{

      //     }
///
      //  console.log('Erro de autenticação no sistem');
    }
  }

  getAllMenus() {

    this.menuService.listMenuByUserId().subscribe(
      // the first argument is a function which runs on success
      data => {
        this.menus = data;
      },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading foods')
    );
  }

  getMenusByFuncionario() {

  }


}
