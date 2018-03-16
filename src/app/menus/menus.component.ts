import {Component, OnInit} from '@angular/core';
import {MenuService} from './menu/menu.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {

  public menus;

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.getListMenus();
  }


  getListMenus() {
    this.menuService.listMenuByNome().subscribe(
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


}
