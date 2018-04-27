import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuService} from './menu/menu.service';
import {LoginService} from '../services/login.service';
import {Menu} from './menu/menu.model';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {

  public menus: Menu[];

  constructor(private menuService: MenuService, private loginService: LoginService) {
  }

  ngOnInit() {
    this.getAllMenus();
  }

  getAllMenus() {

    this.menuService.listMenuByUserId().subscribe(
      // the first argument is a function which runs on success
      data => {
        this.menus = data;
      },
      // the second argument is a function which runs on error
      err => console.error('menu log erro' + err),
      // the third argument is a function which runs on completion
    );
  }

  getMenusByFuncionario() {

  }


}
